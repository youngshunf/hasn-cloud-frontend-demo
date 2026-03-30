import type { VbenFormSchema } from '#/adapter/form';
import type {
  OnActionClickFn,
  VxeGridProps,
} from '#/adapter/vxe-table';
import type { HasnAuditLog } from '#/api/hasn/hasn_audit_log';

import { $t } from '@vben/locales';

import { getDictOptions } from '#/utils/dict';

/**
 * Query form schema
 */
export const querySchema: VbenFormSchema[] = [
  {
    component: 'Input',
    fieldName: 'actor_id',
    label: '操作者 hasn_id',
    componentProps: {"placeholder": "Search by \u64cd\u4f5c\u8005 hasn_id"},
  },
  {
    component: 'Select',
    fieldName: 'actor_type',
    label: '操作者类型',
    componentProps: {
      allowClear: true,
      options: getDictOptions('hasn_actor_type'),
    },
  },
  {
    component: 'Select',
    fieldName: 'target_type',
    label: '目标类型',
    componentProps: {
      allowClear: true,
      options: getDictOptions('hasn_target_type'),
    },
  },
  {
    component: 'Input',
    fieldName: 'target_id',
    label: '目标 ID',
    componentProps: {"placeholder": "Search by \u76ee\u6807 ID"},
  },
];

/**
 * Table columns configuration
 */
export function useColumns(
  onActionClick?: OnActionClickFn<HasnAuditLog>,
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
      field: 'actor_id',
      title: '操作者 hasn_id',
      width: 150,
    },
    {
      field: 'actor_type',
      title: '操作者类型',
      width: 150,
      cellRender: {
        name: 'CellTag',
        options: getDictOptions('hasn_actor_type'),
      },
    },
    {
      field: 'action',
      title: '操作类型',
      width: 150,
    },
    {
      field: 'target_type',
      title: '目标类型',
      width: 150,
      cellRender: {
        name: 'CellTag',
        options: getDictOptions('hasn_target_type'),
      },
    },
    {
      field: 'target_id',
      title: '目标 ID',
      width: 150,
    },
    {
      field: 'ip_address',
      title: 'IP 地址',
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
    fieldName: 'actor_id',
    label: '操作者 hasn_id',
    rules: 'required',
  },
  {
    component: 'Select',
    fieldName: 'actor_type',
    label: '操作者类型',
    rules: 'required',
    componentProps: {
      options: getDictOptions('hasn_actor_type'),
    },
  },
  {
    component: 'Input',
    fieldName: 'action',
    label: '操作类型',
    rules: 'required',
  },
  {
    component: 'Select',
    fieldName: 'target_type',
    label: '目标类型',
    componentProps: {
      options: getDictOptions('hasn_target_type'),
    },
  },
  {
    component: 'Input',
    fieldName: 'target_id',
    label: '目标 ID',
  },
  {
    component: 'Textarea',
    fieldName: 'details',
    label: '操作详情',
    rules: 'required',
    componentProps: {"placeholder": "Enter JSON", "rows": 6},
  },
  {
    component: 'Input',
    fieldName: 'ip_address',
    label: 'IP 地址',
  },
];
