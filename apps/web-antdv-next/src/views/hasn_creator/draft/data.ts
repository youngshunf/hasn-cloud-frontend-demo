import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeGridProps } from '#/adapter/vxe-table';
import type { Draft } from '#/api/hasn_creator/draft';

import { $t } from '@vben/locales';

/**
 * Query form schema
 */
export const querySchema: VbenFormSchema[] = [
  {
    component: 'InputNumber',
    fieldName: 'project_id',
    label: 'project_id',
    componentProps: { style: 'width: 100%' },
  },
  {
    component: 'InputNumber',
    fieldName: 'user_id',
    label: 'user_id',
    componentProps: { style: 'width: 100%' },
  },
  {
    component: 'InputNumber',
    fieldName: 'enterprise_id',
    label: 'enterprise_id',
    componentProps: { style: 'width: 100%' },
  },
  {
    component: 'Input',
    fieldName: 'title',
    label: 'title',
    componentProps: { placeholder: 'Search by title' },
  },
];

/**
 * Table columns configuration
 */
export function useColumns(
  onActionClick?: OnActionClickFn<Draft>,
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
      field: 'project_id',
      title: 'project_id',
      width: 150,
    },
    {
      field: 'user_id',
      title: 'user_id',
      width: 150,
    },
    {
      field: 'owner_scope',
      title: 'owner_scope',
      width: 150,
    },
    {
      field: 'enterprise_id',
      title: 'enterprise_id',
      width: 150,
    },
    {
      field: 'assignee',
      title: 'assignee',
      width: 150,
    },
    {
      field: 'title',
      title: 'title',
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
    component: 'InputNumber',
    fieldName: 'project_id',
    label: 'project_id',
    rules: 'required',
    componentProps: { style: 'width: 100%' },
  },
  {
    component: 'InputNumber',
    fieldName: 'user_id',
    label: 'user_id',
    rules: 'required',
    componentProps: { style: 'width: 100%' },
  },
  {
    component: 'Input',
    fieldName: 'owner_scope',
    label: 'owner_scope',
    rules: 'required',
  },
  {
    component: 'InputNumber',
    fieldName: 'enterprise_id',
    label: 'enterprise_id',
    componentProps: { style: 'width: 100%' },
  },
  {
    component: 'Input',
    fieldName: 'assignee',
    label: 'assignee',
  },
  {
    component: 'Input',
    fieldName: 'title',
    label: 'title',
  },
  {
    component: 'Textarea',
    fieldName: 'content',
    label: 'content',
    componentProps: { rows: 4 },
  },
  {
    component: 'Textarea',
    fieldName: 'media',
    label: '媒体引用',
    rules: 'required',
    componentProps: { placeholder: 'Enter JSON', rows: 6 },
  },
  {
    component: 'Textarea',
    fieldName: 'tags',
    label: 'tags',
    rules: 'required',
    componentProps: { placeholder: 'Enter JSON', rows: 6 },
  },
  {
    component: 'Textarea',
    fieldName: 'target_platforms',
    label: 'target_platforms',
    rules: 'required',
    componentProps: { placeholder: 'Enter JSON', rows: 6 },
  },
];
