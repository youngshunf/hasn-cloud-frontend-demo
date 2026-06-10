import type { VbenFormSchema } from '#/adapter/form';
import type {
  OnActionClickFn,
  VxeGridProps,
} from '#/adapter/vxe-table';
import type { HasnAppEntitlement } from '#/api/hasn/hasn_app_entitlement';

import { $t } from '@vben/locales';

import { getDictOptions } from '#/utils/dict';

/**
 * Query form schema
 */
export const querySchema: VbenFormSchema[] = [
  {
    component: 'Input',
    fieldName: 'app_id',
    label: '应用唯一标识',
    componentProps: {"placeholder": "Search by \u5e94\u7528\u552f\u4e00\u6807\u8bc6"},
  },
  {
    component: 'Select',
    fieldName: 'subject_type',
    label: '权益主体',
    componentProps: {
      allowClear: true,
      options: getDictOptions('hasn_subject_type'),
    },
  },
  {
    component: 'Input',
    fieldName: 'subject_id',
    label: '主体 ID',
    componentProps: {"placeholder": "Search by \u4e3b\u4f53 ID\uff08owner=hasn_id / enterprise=enterprise_id\uff09"},
  },
  {
    component: 'Select',
    fieldName: 'status',
    label: '权益状态',
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
  onActionClick?: OnActionClickFn<HasnAppEntitlement>,
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
      field: 'app_id',
      title: '应用唯一标识',
      width: 150,
    },
    {
      field: 'subject_type',
      title: '权益主体',
      width: 150,
      cellRender: {
        name: 'CellTag',
        options: getDictOptions('hasn_subject_type'),
      },
    },
    {
      field: 'subject_id',
      title: '主体 ID',
      width: 150,
    },
    {
      field: 'source',
      title: '权益来源',
      width: 150,
    },
    {
      field: 'status',
      title: '权益状态',
      width: 150,
      cellRender: {
        name: 'CellTag',
        options: getDictOptions('hasn_status'),
      },
    },
    {
      field: 'order_ref',
      title: '关联支付订单号',
      width: 150,
    },
    {
      field: 'granted_at',
      title: '授予时间',
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
    fieldName: 'app_id',
    label: '应用唯一标识',
    rules: 'required',
  },
  {
    component: 'Select',
    fieldName: 'subject_type',
    label: '权益主体',
    rules: 'required',
    componentProps: {
      options: getDictOptions('hasn_subject_type'),
    },
  },
  {
    component: 'Input',
    fieldName: 'subject_id',
    label: '主体 ID',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'source',
    label: '权益来源',
    rules: 'required',
  },
  {
    component: 'Select',
    fieldName: 'status',
    label: '权益状态',
    rules: 'required',
    componentProps: {
      options: getDictOptions('hasn_status'),
    },
  },
  {
    component: 'Input',
    fieldName: 'order_ref',
    label: '关联支付订单号',
  },
  {
    component: 'Input',
    fieldName: 'granted_at',
    label: '授予时间',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'expires_at',
    label: '过期时间',
  },
];
