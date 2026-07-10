import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeGridProps } from '#/adapter/vxe-table';
import type { BillingOffering } from '#/api/user_tier/billing_offering';

import { $t } from '@vben/locales';

/**
 * 商品目录（billing_offering）管理面 —— 统一商业化内核·一切可售卖物
 * 枚举用静态常量（小而固定），不依赖运行时字典，页面自足。
 */

// 商品种类（llm_tier/credit_pack/app/seat/feature_plan）
export const OFFERING_KIND_OPTIONS = [
  { label: 'LLM订阅档', value: 'llm_tier', color: 'blue' },
  { label: '积分包', value: 'credit_pack', color: 'cyan' },
  { label: '应用', value: 'app', color: 'green' },
  { label: '企业席位', value: 'seat', color: 'purple' },
  { label: '功能档位', value: 'feature_plan', color: 'orange' },
];

// 上/下架状态
export const BILLING_STATUS_OPTIONS = [
  { label: '上架', value: 'active', color: 'green' },
  { label: '下架', value: 'inactive', color: 'default' },
];

// 商品来源（预留分成维度）
export const OFFERING_SOURCE_OPTIONS = [{ label: '平台自营', value: 'platform', color: 'blue' }];

/**
 * 检索表单（后端支持 kind 精确 + key 子串过滤）
 */
export const querySchema: VbenFormSchema[] = [
  {
    component: 'Select',
    fieldName: 'kind',
    label: '商品种类',
    componentProps: {
      allowClear: true,
      options: OFFERING_KIND_OPTIONS,
    },
  },
  {
    component: 'Input',
    fieldName: 'key',
    label: '业务键',
    componentProps: {
      placeholder: '按业务键模糊检索（如 app:quant / llm:tier）',
    },
  },
];

/**
 * 列表列
 */
export function useColumns(onActionClick?: OnActionClickFn<BillingOffering>): VxeGridProps['columns'] {
  return [
    {
      field: 'seq',
      title: $t('common.table.id'),
      type: 'seq',
      fixed: 'left',
      width: 50,
    },
    {
      field: 'key',
      title: '业务键',
      minWidth: 200,
    },
    {
      field: 'kind',
      title: '商品种类',
      width: 120,
      cellRender: {
        name: 'CellTag',
        options: OFFERING_KIND_OPTIONS,
      },
    },
    {
      field: 'display_name',
      title: '显示名称',
      minWidth: 160,
    },
    {
      field: 'feature_key',
      title: '付费墙特征键',
      minWidth: 180,
    },
    {
      field: 'status',
      title: '状态',
      width: 100,
      cellRender: {
        name: 'CellTag',
        options: BILLING_STATUS_OPTIONS,
      },
    },
    {
      field: 'source',
      title: '来源',
      width: 110,
      cellRender: {
        name: 'CellTag',
        options: OFFERING_SOURCE_OPTIONS,
      },
    },
    {
      field: 'sort_order',
      title: '排序权重',
      width: 100,
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
 * 新增/编辑表单
 */
export const formSchema: VbenFormSchema[] = [
  {
    component: 'Input',
    fieldName: 'key',
    label: '业务键',
    rules: 'required',
    componentProps: {
      placeholder: '全端稳定业务键，如 app:quant / llm:tier / webapp:hosting',
    },
    help: '一经创建不建议修改：全端稳定标识，付费墙/订单快照都引用它',
  },
  {
    component: 'Select',
    fieldName: 'kind',
    label: '商品种类',
    rules: 'required',
    defaultValue: 'app',
    componentProps: {
      options: OFFERING_KIND_OPTIONS,
    },
  },
  {
    component: 'Input',
    fieldName: 'feature_key',
    label: '付费墙特征键',
    rules: 'required',
    componentProps: {
      placeholder: '付费墙通用语言，如 app:<id> / llm:tier / webapp:hosting',
    },
  },
  {
    component: 'Input',
    fieldName: 'display_name',
    label: '显示名称',
    rules: 'required',
  },
  {
    component: 'Select',
    fieldName: 'status',
    label: '状态',
    rules: 'required',
    defaultValue: 'active',
    componentProps: {
      options: BILLING_STATUS_OPTIONS,
    },
  },
  {
    component: 'Select',
    fieldName: 'source',
    label: '来源',
    rules: 'required',
    defaultValue: 'platform',
    componentProps: {
      options: OFFERING_SOURCE_OPTIONS,
    },
  },
  {
    component: 'InputNumber',
    fieldName: 'sort_order',
    label: '排序权重',
    rules: 'required',
    defaultValue: 0,
    componentProps: { style: 'width: 100%' },
  },
];
