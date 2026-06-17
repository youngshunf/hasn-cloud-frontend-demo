import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeGridProps } from '#/adapter/vxe-table';
import type { HasnAgentMcpKeys } from '#/api/hasn/hasn_agent_mcp_keys';

import { $t } from '@vben/locales';

import { getDictOptions } from '#/utils/dict';

/**
 * Query form schema
 */
export const querySchema: VbenFormSchema[] = [
  {
    component: 'Input',
    fieldName: 'agent_hasn_id',
    label: '归属 Agent 的 HASN ID',
    componentProps: {
      placeholder: 'Search by \u5F52\u5C5E Agent \u7684 HASN ID',
    },
  },
  {
    component: 'Input',
    fieldName: 'owner_hasn_id',
    label: '主人 HASN ID',
    componentProps: { placeholder: 'Search by \u4E3B\u4EBA HASN ID' },
  },
  {
    component: 'InputNumber',
    fieldName: 'owner_user_id',
    label: '主人 sys_user.id',
    componentProps: { style: 'width: 100%' },
  },
  {
    component: 'Input',
    fieldName: 'node_id',
    label: '设备绑定 node_id',
    componentProps: {
      placeholder:
        'Search by \u8BBE\u5907\u7ED1\u5B9A node_id\uFF08\u7A7A=\u4E0D\u9650\u8BBE\u5907\uFF1B\u9ED8\u8BA4\u7B7E\u53D1\u5373\u7ED1\u5F53\u524D node\uFF09',
    },
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
  {
    component: 'RangePicker',
    fieldName: 'expire_time',
    label: '过期时间',
    componentProps: { format: 'YYYY-MM-DD' },
  },
  {
    component: 'RangePicker',
    fieldName: 'last_used_time',
    label: '最近使用时间',
    componentProps: { format: 'YYYY-MM-DD' },
  },
];

/**
 * Table columns configuration
 */
export function useColumns(
  onActionClick?: OnActionClickFn<HasnAgentMcpKeys>,
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
      title: '归属 Agent 的 HASN ID',
      width: 150,
    },
    {
      field: 'owner_hasn_id',
      title: '主人 HASN ID',
      width: 150,
    },
    {
      field: 'owner_user_id',
      title: '主人 sys_user.id',
      width: 150,
    },
    {
      field: 'key_prefix',
      title: '明文前缀',
      width: 150,
    },
    {
      field: 'key_hash',
      title: 'SHA-256',
      width: 150,
    },
    {
      field: 'node_id',
      title: '设备绑定 node_id',
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
      field: 'expire_time',
      title: '过期时间',
      width: 150,
    },
    {
      field: 'last_used_time',
      title: '最近使用时间',
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
    fieldName: 'agent_hasn_id',
    label: '归属 Agent 的 HASN ID',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'owner_hasn_id',
    label: '主人 HASN ID',
    rules: 'required',
  },
  {
    component: 'InputNumber',
    fieldName: 'owner_user_id',
    label: '主人 sys_user.id',
    componentProps: { style: 'width: 100%' },
  },
  {
    component: 'Input',
    fieldName: 'key_prefix',
    label: '明文前缀',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'key_hash',
    label: 'SHA-256',
    rules: 'required',
  },
  {
    component: 'Textarea',
    fieldName: 'scopes',
    label: 'scope 集',
    rules: 'required',
    componentProps: { placeholder: 'Enter JSON', rows: 6 },
  },
  {
    component: 'Input',
    fieldName: 'node_id',
    label: '设备绑定 node_id',
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
    component: 'DatePicker',
    fieldName: 'expire_time',
    label: '过期时间',
    componentProps: {
      format: 'YYYY-MM-DD HH:mm:ss',
      showTime: true,
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
  {
    component: 'DatePicker',
    fieldName: 'last_used_time',
    label: '最近使用时间',
    componentProps: {
      format: 'YYYY-MM-DD HH:mm:ss',
      showTime: true,
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
];
