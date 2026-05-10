import type { VbenFormSchema } from '#/adapter/form';
import type {
  OnActionClickFn,
  VxeGridProps,
} from '#/adapter/vxe-table';
import type { HasnAgents } from '#/api/hasn/hasn_agents';

import { $t } from '@vben/locales';

import { getDictOptions } from '#/utils/dict';

/**
 * Query form schema
 */
export const querySchema: VbenFormSchema[] = [
  {
    component: 'Input',
    fieldName: 'hasn_id',
    label: 'HASN Agent 唯一标识',
    componentProps: {"placeholder": "Search by HASN Agent \u552f\u4e00\u6807\u8bc6\uff08\u683c\u5f0f: a_{uuid}\uff09"},
  },
  {
    component: 'Input',
    fieldName: 'star_id',
    label: 'Agent 唤星号',
    componentProps: {"placeholder": "Search by Agent \u5524\u661f\u53f7\uff08\u5982: 100001#star\uff09"},
  },
  {
    component: 'Input',
    fieldName: 'owner_id',
    label: '所属 Human 的 hasn_id',
    componentProps: {"placeholder": "Search by \u6240\u5c5e Human \u7684 hasn_id"},
  },
  {
    component: 'Input',
    fieldName: 'display_name',
    label: 'Agent 显示名',
    componentProps: {"placeholder": "Search by Agent \u663e\u793a\u540d"},
  },
  {
    component: 'Input',
    fieldName: 'agent_name',
    label: 'Agent 标识名',
    componentProps: {"placeholder": "Search by Agent \u6807\u8bc6\u540d"},
  },
  {
    component: 'Select',
    fieldName: 'type',
    label: 'Agent 类型',
    componentProps: {
      allowClear: true,
      options: getDictOptions('hasn_type'),
    },
  },
  {
    component: 'Input',
    fieldName: 'server_id',
    label: '云端 Agent 所在服务器 ID',
    componentProps: {"placeholder": "Search by \u4e91\u7aef Agent \u6240\u5728\u670d\u52a1\u5668 ID"},
  },
  {
    component: '',
    fieldName: 'home_client_id',
    label: '本地 Agent 归属客户端 ID',
  },
  {
    component: 'Select',
    fieldName: 'status',
    label: '状态',
    componentProps: {
      allowClear: true,
      options: getDictOptions('hasn_status'),
    },
  },
];

/**
 * Table columns configuration
 */
export function useColumns(
  onActionClick?: OnActionClickFn<HasnAgents>,
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
      field: 'hasn_id',
      title: 'HASN Agent 唯一标识',
      width: 150,
    },
    {
      field: 'star_id',
      title: 'Agent 唤星号',
      width: 150,
    },
    {
      field: 'owner_id',
      title: '所属 Human 的 hasn_id',
      width: 150,
    },
    {
      field: 'display_name',
      title: 'Agent 显示名',
      width: 150,
    },
    {
      field: 'agent_name',
      title: 'Agent 标识名',
      width: 150,
    },
    {
      field: 'avatar',
      title: '头像',
      width: 150,
    },
    {
      field: 'type',
      title: 'Agent 类型',
      width: 150,
      cellRender: {
        name: 'CellTag',
        options: getDictOptions('hasn_type'),
      },
    },
    {
      field: 'role',
      title: 'Agent 角色',
      width: 150,
    },
    {
      field: 'server_id',
      title: '云端 Agent 所在服务器 ID',
      width: 150,
    },
    {
      field: 'home_client_id',
      title: '本地 Agent 归属客户端 ID',
      width: 150,
    },
    {
      field: 'api_key_hash',
      title: 'API Key 的 SHA256 哈希',
      width: 150,
    },
    {
      field: 'status',
      title: '状态',
      width: 150,
      cellRender: {
        name: 'CellTag',
        options: getDictOptions('hasn_status'),
      },
    },
    {
      field: 'created_via',
      title: '创建来源',
      width: 150,
    },
    {
      field: 'created_time',
      title: '创建时间',
      width: 150,
    },
    {
      field: 'updated_time',
      title: '更新时间',
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
 * Form schema for add/edit
 */
export const formSchema: VbenFormSchema[] = [
  {
    component: 'Input',
    fieldName: 'hasn_id',
    label: 'HASN Agent 唯一标识',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'star_id',
    label: 'Agent 唤星号',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'owner_id',
    label: '所属 Human 的 hasn_id',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'display_name',
    label: 'Agent 显示名',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'agent_name',
    label: 'Agent 标识名',
    rules: 'required',
  },
  {
    component: 'Textarea',
    fieldName: 'description',
    label: 'Agent 描述',
    componentProps: {"rows": 4},
  },
  {
    component: 'Textarea',
    fieldName: 'avatar',
    label: '头像',
    componentProps: {"rows": 4},
  },
  {
    component: 'Select',
    fieldName: 'type',
    label: 'Agent 类型',
    rules: 'required',
    componentProps: {
      options: getDictOptions('hasn_type'),
    },
  },
  {
    component: 'Input',
    fieldName: 'role',
    label: 'Agent 角色',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'server_id',
    label: '云端 Agent 所在服务器 ID',
  },
  {
    component: 'Input',
    fieldName: 'home_client_id',
    label: '本地 Agent 归属客户端 ID',
  },
  {
    component: 'Input',
    fieldName: 'api_key_hash',
    label: 'API Key 的 SHA256 哈希',
    rules: 'required',
  },
  {
    component: 'Select',
    fieldName: 'status',
    label: '状态',
    rules: 'required',
    componentProps: {
      options: getDictOptions('hasn_status'),
    },
  },
  {
    component: 'Input',
    fieldName: 'created_via',
    label: '创建来源',
    rules: 'required',
  },
  // PR6: Runtime selection (§5.5 / §6 of 01-Hermes RuntimeAdapter接入设计.md).
  // Optional; backend defaults to hermes/local. endpoint_ref/auth_ref must
  // start with `secret://` — backend pydantic validator rejects plaintext.
  {
    component: 'Select',
    fieldName: 'runtime_type',
    label: 'Runtime 类型',
    componentProps: {
      placeholder: 'hermes (默认)',
      options: [{ label: 'Hermes', value: 'hermes' }],
      allowClear: true,
    },
  },
  {
    component: 'Select',
    fieldName: 'runtime_location',
    label: 'Runtime 位置',
    componentProps: {
      placeholder: 'local (默认)',
      options: [
        { label: '本地', value: 'local' },
        { label: '云端', value: 'cloud' },
      ],
      allowClear: true,
    },
  },
  {
    component: 'Input',
    fieldName: 'endpoint_ref',
    label: 'Endpoint Ref',
    componentProps: {
      placeholder: 'secret://runtime/hermes/local-endpoint',
    },
  },
  {
    component: 'Input',
    fieldName: 'auth_ref',
    label: 'Auth Ref',
    componentProps: {
      placeholder: 'secret://runtime/hermes/local-hmac',
    },
  },
];
