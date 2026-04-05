import type { VbenFormSchema } from '#/adapter/form';
import type {
  OnActionClickFn,
  VxeGridProps,
} from '#/adapter/vxe-table';
import type { HasnOwnerApiKeys } from '#/api/hasn/hasn_owner_api_keys';

import { $t } from '@vben/locales';

import { getDictOptions } from '#/utils/dict';

/**
 * Query form schema
 */
export const querySchema: VbenFormSchema[] = [
  {
    component: 'Input',
    fieldName: 'key_id',
    label: 'Owner API Key 唯一标识',
    componentProps: {"placeholder": "Search by Owner API Key \u552f\u4e00\u6807\u8bc6"},
  },
  {
    component: 'Input',
    fieldName: 'owner_id',
    label: 'Owner 的 hasn_id',
    componentProps: {"placeholder": "Search by Owner \u7684 hasn_id (\u683c\u5f0f: h_xxx)"},
  },
  {
    component: 'Input',
    fieldName: 'key_name',
    label: 'Key 名称',
    componentProps: {"placeholder": "Search by Key \u540d\u79f0"},
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
    component: 'Input',
    fieldName: 'bound_node_id',
    label: '绑定 Node ID',
    componentProps: {"placeholder": "Search by \u7ed1\u5b9a Node ID\uff08\u53ef\u4e3a\u7a7a\uff09"},
  },
  {
    component: 'RangePicker',
    fieldName: 'expires_at',
    label: '过期时间',
    componentProps: {"format": "YYYY-MM-DD"},
  },
  {
    component: 'RangePicker',
    fieldName: 'last_used_at',
    label: '最后使用时间',
    componentProps: {"format": "YYYY-MM-DD"},
  },
  {
    component: 'RangePicker',
    fieldName: 'revoked_at',
    label: '吊销时间',
    componentProps: {"format": "YYYY-MM-DD"},
  },
];

/**
 * Table columns configuration
 */
export function useColumns(
  onActionClick?: OnActionClickFn<HasnOwnerApiKeys>,
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
      field: 'key_id',
      title: 'Owner API Key 唯一标识',
      width: 150,
    },
    {
      field: 'owner_id',
      title: 'Owner 的 hasn_id',
      width: 150,
    },
    {
      field: 'key_name',
      title: 'Key 名称',
      width: 150,
    },
    {
      field: 'key_hash',
      title: 'Owner API Key 的 SHA256 哈希',
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
      field: 'bound_node_id',
      title: '绑定 Node ID',
      width: 150,
    },
    {
      field: 'expires_at',
      title: '过期时间',
      width: 150,
    },
    {
      field: 'last_used_at',
      title: '最后使用时间',
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
    fieldName: 'key_id',
    label: 'Owner API Key 唯一标识',
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
    fieldName: 'key_name',
    label: 'Key 名称',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'key_hash',
    label: 'Owner API Key 的 SHA256 哈希',
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
    component: 'Textarea',
    fieldName: 'scopes',
    label: '授权 scopes JSON',
    rules: 'required',
    componentProps: {"placeholder": "Enter JSON", "rows": 6},
  },
  {
    component: 'Input',
    fieldName: 'bound_node_id',
    label: '绑定 Node ID',
  },
  {
    component: 'DatePicker',
    fieldName: 'expires_at',
    label: '过期时间',
    componentProps: {"format": "YYYY-MM-DD HH:mm:ss", "showTime": true, "valueFormat": "YYYY-MM-DD HH:mm:ss"},
  },
  {
    component: 'DatePicker',
    fieldName: 'last_used_at',
    label: '最后使用时间',
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
];
