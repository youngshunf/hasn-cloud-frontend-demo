import type { VbenFormSchema } from '#/adapter/form';
import type {
  OnActionClickFn,
  VxeGridProps,
} from '#/adapter/vxe-table';
import type { HasnNodeBindings } from '#/api/hasn/hasn_node_bindings';

import { $t } from '@vben/locales';

import { getDictOptions } from '#/utils/dict';

/**
 * Query form schema
 */
export const querySchema: VbenFormSchema[] = [
  {
    component: 'Input',
    fieldName: 'binding_id',
    label: '绑定唯一标识',
    componentProps: {"placeholder": "Search by \u7ed1\u5b9a\u552f\u4e00\u6807\u8bc6 (\u683c\u5f0f: ob_{uuid})"},
  },
  {
    component: 'Input',
    fieldName: 'node_id',
    label: '节点 ID',
    componentProps: {"placeholder": "Search by \u8282\u70b9 ID (\u683c\u5f0f: n_{uuid_short})"},
  },
  {
    component: 'Input',
    fieldName: 'owner_id',
    label: 'Owner 的 hasn_id',
    componentProps: {"placeholder": "Search by Owner \u7684 hasn_id (\u683c\u5f0f: h_xxx)"},
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
    fieldName: 'bound_at',
    label: '绑定时间',
    componentProps: {"format": "YYYY-MM-DD"},
  },
  {
    component: 'RangePicker',
    fieldName: 'expires_at',
    label: '过期时间',
    componentProps: {"format": "YYYY-MM-DD"},
  },
  {
    component: 'RangePicker',
    fieldName: 'renewed_at',
    label: '最近续期时间',
    componentProps: {"format": "YYYY-MM-DD"},
  },
  {
    component: 'RangePicker',
    fieldName: 'revoked_at',
    label: '吊销时间',
    componentProps: {"format": "YYYY-MM-DD"},
  },
  {
    component: 'RangePicker',
    fieldName: 'last_used_at',
    label: '最后使用时间',
    componentProps: {"format": "YYYY-MM-DD"},
  },
];

/**
 * Table columns configuration
 */
export function useColumns(
  onActionClick?: OnActionClickFn<HasnNodeBindings>,
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
      field: 'binding_id',
      title: '绑定唯一标识',
      width: 150,
    },
    {
      field: 'node_id',
      title: '节点 ID',
      width: 150,
    },
    {
      field: 'owner_id',
      title: 'Owner 的 hasn_id',
      width: 150,
    },
    {
      field: 'auth_profile',
      title: '认证模式',
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
      field: 'bound_at',
      title: '绑定时间',
      width: 150,
    },
    {
      field: 'expires_at',
      title: '过期时间',
      width: 150,
    },
    {
      field: 'renewed_at',
      title: '最近续期时间',
      width: 150,
    },
    {
      field: 'revoked_at',
      title: '吊销时间',
      width: 150,
    },
    {
      field: 'revoke_reason',
      title: '吊销原因',
      width: 150,
    },
    {
      field: 'last_used_at',
      title: '最后使用时间',
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
    fieldName: 'binding_id',
    label: '绑定唯一标识',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'node_id',
    label: '节点 ID',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'owner_id',
    label: 'Owner 的 hasn_id',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'auth_profile',
    label: '认证模式',
    rules: 'required',
  },
  {
    component: 'Textarea',
    fieldName: 'scopes',
    label: '授权 scopes JSON',
    rules: 'required',
    componentProps: {"placeholder": "Enter JSON", "rows": 6},
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
    fieldName: 'bound_at',
    label: '绑定时间',
    rules: 'required',
    componentProps: {"format": "YYYY-MM-DD HH:mm:ss", "showTime": true, "valueFormat": "YYYY-MM-DD HH:mm:ss"},
  },
  {
    component: 'DatePicker',
    fieldName: 'expires_at',
    label: '过期时间',
    rules: 'required',
    componentProps: {"format": "YYYY-MM-DD HH:mm:ss", "showTime": true, "valueFormat": "YYYY-MM-DD HH:mm:ss"},
  },
  {
    component: 'DatePicker',
    fieldName: 'renewed_at',
    label: '最近续期时间',
    componentProps: {"format": "YYYY-MM-DD HH:mm:ss", "showTime": true, "valueFormat": "YYYY-MM-DD HH:mm:ss"},
  },
  {
    component: 'DatePicker',
    fieldName: 'revoked_at',
    label: '吊销时间',
    componentProps: {"format": "YYYY-MM-DD HH:mm:ss", "showTime": true, "valueFormat": "YYYY-MM-DD HH:mm:ss"},
  },
  {
    component: 'Input',
    fieldName: 'revoke_reason',
    label: '吊销原因',
  },
  {
    component: 'DatePicker',
    fieldName: 'last_used_at',
    label: '最后使用时间',
    componentProps: {"format": "YYYY-MM-DD HH:mm:ss", "showTime": true, "valueFormat": "YYYY-MM-DD HH:mm:ss"},
  },
];
