import type { VbenFormSchema } from '#/adapter/form';
import type {
  OnActionClickFn,
  VxeGridProps,
} from '#/adapter/vxe-table';
import type { HasnTradeSessions } from '#/api/hasn/hasn_trade_sessions';

import { $t } from '@vben/locales';

import { getDictOptions } from '#/utils/dict';

/**
 * Query form schema
 */
export const querySchema: VbenFormSchema[] = [
  {
    component: '',
    fieldName: 'id',
    label: '交易会话 ID',
  },
  {
    component: 'Input',
    fieldName: 'buyer_id',
    label: '买方 hasn_id',
    componentProps: {"placeholder": "Search by \u4e70\u65b9 hasn_id"},
  },
  {
    component: 'Input',
    fieldName: 'seller_id',
    label: '卖方 hasn_id',
    componentProps: {"placeholder": "Search by \u5356\u65b9 hasn_id"},
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
    fieldName: 'order_id',
    label: '关联订单 ID',
    componentProps: {"placeholder": "Search by \u5173\u8054\u8ba2\u5355 ID"},
  },
];

/**
 * Table columns configuration
 */
export function useColumns(
  onActionClick?: OnActionClickFn<HasnTradeSessions>,
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
      field: 'buyer_id',
      title: '买方 hasn_id',
      width: 150,
    },
    {
      field: 'seller_id',
      title: '卖方 hasn_id',
      width: 150,
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
      field: 'scope',
      title: '当前作用域',
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
      field: 'order_id',
      title: '关联订单 ID',
      width: 150,
    },
    {
      field: 'expires_at',
      title: '过期时间',
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
    fieldName: 'id',
    label: '交易会话 ID',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'buyer_id',
    label: '买方 hasn_id',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'seller_id',
    label: '卖方 hasn_id',
    rules: 'required',
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
    component: 'Input',
    fieldName: 'scope',
    label: '当前作用域',
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
    fieldName: 'order_id',
    label: '关联订单 ID',
  },
  {
    component: 'Input',
    fieldName: 'expires_at',
    label: '过期时间',
  },
  {
    component: 'Textarea',
    fieldName: 'metadata',
    label: '附加元数据',
    rules: 'required',
    componentProps: {"placeholder": "Enter JSON", "rows": 6},
  },
];
