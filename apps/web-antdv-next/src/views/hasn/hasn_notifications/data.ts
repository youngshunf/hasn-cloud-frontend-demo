import type { VbenFormSchema } from '#/adapter/form';
import type {
  OnActionClickFn,
  VxeGridProps,
} from '#/adapter/vxe-table';
import type { HasnNotifications } from '#/api/hasn/hasn_notifications';

import { $t } from '@vben/locales';

import { getDictOptions } from '#/utils/dict';

/**
 * Query form schema
 */
export const querySchema: VbenFormSchema[] = [
  {
    component: 'Input',
    fieldName: 'target_id',
    label: '通知目标 hasn_id',
    componentProps: {"placeholder": "Search by \u901a\u77e5\u76ee\u6807 hasn_id"},
  },
  {
    component: 'Select',
    fieldName: 'type',
    label: '通知类型',
    componentProps: {
      allowClear: true,
      options: getDictOptions('hasn_type'),
    },
  },
  {
    component: 'Input',
    fieldName: 'title',
    label: '通知标题',
    componentProps: {"placeholder": "Search by \u901a\u77e5\u6807\u9898"},
  },
];

/**
 * Table columns configuration
 */
export function useColumns(
  onActionClick?: OnActionClickFn<HasnNotifications>,
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
      field: 'target_id',
      title: '通知目标 hasn_id',
      width: 150,
    },
    {
      field: 'type',
      title: '通知类型',
      width: 150,
      cellRender: {
        name: 'CellTag',
        options: getDictOptions('hasn_type'),
      },
    },
    {
      field: 'title',
      title: '通知标题',
      width: 150,
    },
    {
      field: 'read',
      title: '是否已读',
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
    fieldName: 'target_id',
    label: '通知目标 hasn_id',
    rules: 'required',
  },
  {
    component: 'Select',
    fieldName: 'type',
    label: '通知类型',
    rules: 'required',
    componentProps: {
      options: getDictOptions('hasn_type'),
    },
  },
  {
    component: 'Input',
    fieldName: 'title',
    label: '通知标题',
    rules: 'required',
  },
  {
    component: 'Textarea',
    fieldName: 'body',
    label: '通知正文',
    componentProps: {"rows": 4},
  },
  {
    component: 'Textarea',
    fieldName: 'data',
    label: '附加数据',
    rules: 'required',
    componentProps: {"placeholder": "Enter JSON", "rows": 6},
  },
  {
    component: 'Switch',
    fieldName: 'read',
    label: '是否已读',
  },
];
