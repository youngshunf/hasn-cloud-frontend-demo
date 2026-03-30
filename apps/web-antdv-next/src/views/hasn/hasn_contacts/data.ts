import type { VbenFormSchema } from '#/adapter/form';
import type {
  OnActionClickFn,
  VxeGridProps,
} from '#/adapter/vxe-table';
import type { HasnContacts } from '#/api/hasn/hasn_contacts';

import { $t } from '@vben/locales';

import { getDictOptions } from '#/utils/dict';

/**
 * Query form schema
 */
export const querySchema: VbenFormSchema[] = [
  {
    component: 'Input',
    fieldName: 'owner_id',
    label: '关系拥有者 hasn_id',
    componentProps: {"placeholder": "Search by \u5173\u7cfb\u62e5\u6709\u8005 hasn_id"},
  },
  {
    component: 'Input',
    fieldName: 'peer_id',
    label: '对方 hasn_id',
    componentProps: {"placeholder": "Search by \u5bf9\u65b9 hasn_id"},
  },
  {
    component: 'Select',
    fieldName: 'peer_type',
    label: '对方类型',
    componentProps: {
      allowClear: true,
      options: getDictOptions('hasn_peer_type'),
    },
  },
  {
    component: 'Select',
    fieldName: 'relation_type',
    label: '关系类型',
    componentProps: {
      allowClear: true,
      options: getDictOptions('hasn_relation_type'),
    },
  },
  {
    component: 'Input',
    fieldName: 'nickname',
    label: '备注名',
    componentProps: {"placeholder": "Search by \u5907\u6ce8\u540d"},
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
  onActionClick?: OnActionClickFn<HasnContacts>,
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
      field: 'owner_id',
      title: '关系拥有者 hasn_id',
      width: 150,
    },
    {
      field: 'peer_id',
      title: '对方 hasn_id',
      width: 150,
    },
    {
      field: 'peer_type',
      title: '对方类型',
      width: 150,
      cellRender: {
        name: 'CellTag',
        options: getDictOptions('hasn_peer_type'),
      },
    },
    {
      field: 'relation_type',
      title: '关系类型',
      width: 150,
      cellRender: {
        name: 'CellTag',
        options: getDictOptions('hasn_relation_type'),
      },
    },
    {
      field: 'trust_level',
      title: '信任等级',
      width: 150,
      cellRender: {
        name: 'CellTag',
        options: getDictOptions('hasn_trust_level'),
      },
    },
    {
      field: 'nickname',
      title: '备注名',
      width: 150,
    },
    {
      field: 'subscription',
      title: '是否订阅推送',
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
      field: 'auto_expire',
      title: '自动过期时间',
      width: 150,
    },
    {
      field: 'connected_at',
      title: '建立连接时间',
      width: 150,
    },
    {
      field: 'last_interaction_at',
      title: '最后互动时间',
      width: 150,
    },
    {
      field: 'interaction_count',
      title: '互动次数',
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
    fieldName: 'owner_id',
    label: '关系拥有者 hasn_id',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'peer_id',
    label: '对方 hasn_id',
    rules: 'required',
  },
  {
    component: 'Select',
    fieldName: 'peer_type',
    label: '对方类型',
    rules: 'required',
    componentProps: {
      options: getDictOptions('hasn_peer_type'),
    },
  },
  {
    component: 'Select',
    fieldName: 'relation_type',
    label: '关系类型',
    rules: 'required',
    componentProps: {
      options: getDictOptions('hasn_relation_type'),
    },
  },
  {
    component: 'Select',
    fieldName: 'trust_level',
    label: '信任等级',
    rules: 'required',
    componentProps: {
      options: getDictOptions('hasn_trust_level'),
    },
  },
  {
    component: 'Textarea',
    fieldName: 'scope',
    label: '关系作用域',
    componentProps: {"placeholder": "Enter JSON", "rows": 6},
  },
  {
    component: 'Textarea',
    fieldName: 'custom_permissions',
    label: '自定义权限覆盖',
    rules: 'required',
    componentProps: {"placeholder": "Enter JSON", "rows": 6},
  },
  {
    component: 'Input',
    fieldName: 'nickname',
    label: '备注名',
  },
  {
    component: 'Textarea',
    fieldName: 'tags',
    label: '分组标签',
    componentProps: {"rows": 4},
  },
  {
    component: 'Switch',
    fieldName: 'subscription',
    label: '是否订阅推送',
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
    fieldName: 'request_message',
    label: '好友请求附言',
    componentProps: {"rows": 4},
  },
  {
    component: 'Input',
    fieldName: 'auto_expire',
    label: '自动过期时间',
  },
  {
    component: 'Input',
    fieldName: 'connected_at',
    label: '建立连接时间',
  },
  {
    component: 'Input',
    fieldName: 'last_interaction_at',
    label: '最后互动时间',
  },
  {
    component: 'Input',
    fieldName: 'interaction_count',
    label: '互动次数',
    rules: 'required',
  },
];
