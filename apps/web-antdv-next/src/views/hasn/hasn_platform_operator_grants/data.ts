import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeGridProps } from '#/adapter/vxe-table';
import type {
  HasnPlatformOperatorGrants,
  OperatorGrantAgentOption,
  OperatorGrantOwnerOption,
  OperatorGrantScopeOption,
} from '#/api/hasn/hasn_platform_operator_grants';

import { $t } from '@vben/locales';

import {
  getOperatorGrantAgentOptionsApi,
  getOperatorGrantOwnerOptionsApi,
  getOperatorGrantScopeOptionsApi,
} from '#/api/hasn/hasn_platform_operator_grants';

const RISK_LABEL: Record<string, string> = {
  low: '低危',
  medium: '中危',
  high: '高危',
};

/**
 * Query form schema
 */
export const querySchema: VbenFormSchema[] = [
  {
    component: 'Input',
    fieldName: 'agent_hasn_id',
    label: '被授予的分身 hasn_id',
    componentProps: {
      placeholder: 'Search by \u88AB\u6388\u4E88\u7684\u5206\u8EAB hasn_id',
    },
  },
];

/**
 * Table columns configuration
 */
export function useColumns(
  onActionClick?: OnActionClickFn<HasnPlatformOperatorGrants>,
): VxeGridProps['columns'] {
  return [
    {
      field: 'seq',
      title: $t('common.table.id'),
      type: 'seq',
      fixed: 'left',
      width: 50,
    },
    {
      field: 'agent_hasn_id',
      title: '被授予的分身 hasn_id',
      width: 150,
    },
    {
      field: 'scope',
      title: '特权 scope',
      width: 150,
    },
    {
      field: 'granted_by',
      title: '操作的 Admin',
      width: 150,
    },
    {
      field: 'note',
      title: '备注',
      width: 150,
    },
    {
      field: 'operation',
      title: $t('common.table.operation'),
      align: 'center',
      fixed: 'right',
      width: 150,
      cellRender: {
        attrs: {
          nameField: 'id',
          onClick: onActionClick,
        },
        name: 'CellOperation',
        options: ['edit', 'delete'],
      },
    },
  ];
}

/**
 * 共享的选人级联字段（owner → agent）+ 备注字段
 *
 * 交互要点（福仔诉求）：
 * - 分身用级联下拉：先选「用户（主人）」→ 再选「该用户名下分身」，不再手填 hasn_id。
 *   `owner_hasn_id` 只是选人辅助字段（不入库），提交前由 index.vue 剥除。
 * - `granted_by`（操作的 Admin）由后端从 JWT 覆盖，前端不再提供输入。
 */
const ownerField: VbenFormSchema = {
  component: 'ApiSelect',
  fieldName: 'owner_hasn_id',
  label: '用户（主人）',
  rules: 'required',
  help: '先选用户，再选其名下分身。此项仅用于筛选分身，不会入库。',
  componentProps: {
    api: (params?: { keyword?: string }) =>
      getOperatorGrantOwnerOptionsApi(params?.keyword),
    class: 'w-full',
    allowClear: true,
    showSearch: true,
    // 服务端按关键字过滤，禁用前端本地过滤，改为把搜索词作为 params 触发重取
    filterOption: false,
    placeholder: '搜索并选择用户（昵称 / hasn_id）',
    afterFetch: (data: OperatorGrantOwnerOption[]) =>
      (data ?? []).map((item) => ({
        label: `${item.nickname}（${item.hasn_id}）`,
        value: item.hasn_id,
      })),
  },
};

const agentField: VbenFormSchema = {
  component: 'ApiSelect',
  fieldName: 'agent_hasn_id',
  label: '被授予的分身',
  rules: 'required',
  componentProps: {
    api: (params?: { owner_hasn_id?: string }) => {
      const owner = params?.owner_hasn_id;
      if (!owner) {
        return Promise.resolve([] as OperatorGrantAgentOption[]);
      }
      return getOperatorGrantAgentOptionsApi(owner);
    },
    class: 'w-full',
    allowClear: true,
    showSearch: true,
    disabled: true,
    placeholder: '请先选择用户',
    afterFetch: (data: OperatorGrantAgentOption[]) =>
      (data ?? []).map((item) => ({
        label: item.profession
          ? `${item.display_name}（${item.profession}）`
          : item.display_name,
        value: item.hasn_id,
      })),
  },
  dependencies: {
    triggerFields: ['owner_hasn_id'],
    componentProps: (values) => ({
      params: { owner_hasn_id: values.owner_hasn_id || '' },
      disabled: !values.owner_hasn_id,
      placeholder: values.owner_hasn_id
        ? '选择该用户名下的分身'
        : '请先选择用户',
    }),
    // 切换用户时清空已选分身，避免残留其它用户的分身导致错授
    trigger: (_values, _actions, controller) => {
      controller.setFieldValue('agent_hasn_id', undefined);
    },
  },
};

const noteField: VbenFormSchema = {
  component: 'Textarea',
  fieldName: 'note',
  label: '备注',
  componentProps: { rows: 4 },
};

/** 单选特权 scope（编辑单行时用，一行一 scope） */
const scopeSingleField: VbenFormSchema = {
  component: 'ApiSelect',
  fieldName: 'scope',
  label: '特权 scope',
  rules: 'required',
  help: '选项来自声明驱动的只读特权目录（工具声明 + PRIVILEGED_SCOPES 权威确定），此处不新增/不维护。',
  componentProps: {
    api: getOperatorGrantScopeOptionsApi,
    class: 'w-full',
    allowClear: true,
    placeholder: '选择要授予的特权 scope',
    afterFetch: (data: OperatorGrantScopeOption[]) =>
      (data ?? []).map((item) => ({
        label: `${item.label_zh}（${item.scope}·${
          RISK_LABEL[item.risk] ?? item.risk
        }）`,
        value: item.scope,
      })),
  },
};

/**
 * 多选特权 scope（新增时用）：一次给同一分身勾选多个 scope。
 *
 * 数据层仍是「一行一 (agent, scope)」，后端把多选展开成多行幂等落库——多个平台工具的
 * 特权 scope 可一次授给同一分身，由 Admin 自行决定勾哪些（福仔：让管理员自己来决定）。
 */
const scopesMultiField: VbenFormSchema = {
  component: 'ApiSelect',
  fieldName: 'scopes',
  label: '特权 scope（可多选）',
  rules: 'required',
  help: '可一次勾选多个特权 scope 授给同一分身；选项来自声明驱动的只读特权目录（工具声明 + PRIVILEGED_SCOPES 权威确定）。已授予的会自动跳过。',
  componentProps: {
    api: getOperatorGrantScopeOptionsApi,
    class: 'w-full',
    mode: 'multiple',
    allowClear: true,
    placeholder: '选择要授予的一个或多个特权 scope',
    afterFetch: (data: OperatorGrantScopeOption[]) =>
      (data ?? []).map((item) => ({
        label: `${item.label_zh}（${item.scope}·${
          RISK_LABEL[item.risk] ?? item.risk
        }）`,
        value: item.scope,
      })),
  },
};

/** 编辑表单：单行一 scope（沿用原单选） */
export const formSchema: VbenFormSchema[] = [
  ownerField,
  agentField,
  scopeSingleField,
  noteField,
];

/** 新增表单：scope 多选（一次给同一分身授多个 scope，后端展开成多行） */
export const addFormSchema: VbenFormSchema[] = [
  ownerField,
  agentField,
  scopesMultiField,
  noteField,
];
