import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeGridProps } from '#/adapter/vxe-table';
import type { Topic } from '#/api/hasn_creator/topic';

import { $t } from '@vben/locales';

import { getDictOptions } from '#/utils/dict';

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
  {
    component: 'Select',
    fieldName: 'status',
    label: '状态',
    componentProps: {
      allowClear: true,
      options: getDictOptions('hasn_creator_status'),
    },
  },
  {
    component: 'InputNumber',
    fieldName: 'content_id',
    label: '采纳后关联内容',
    componentProps: { style: 'width: 100%' },
  },
  {
    component: 'Input',
    fieldName: 'source_uid',
    label: 'source_uid',
    componentProps: { placeholder: 'Search by source_uid' },
  },
];

/**
 * Table columns configuration
 */
export function useColumns(
  onActionClick?: OnActionClickFn<Topic>,
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
      field: 'potential_score',
      title: 'potential_score',
      width: 150,
    },
    {
      field: 'heat_index',
      title: 'heat_index',
      width: 150,
    },
    {
      field: 'status',
      title: '状态',
      width: 150,
      cellRender: {
        name: 'CellTag',
        options: getDictOptions('hasn_creator_status'),
      },
    },
    {
      field: 'content_id',
      title: '采纳后关联内容',
      width: 150,
    },
    {
      field: 'batch_date',
      title: 'batch_date',
      width: 150,
    },
    {
      field: 'source_uid',
      title: 'source_uid',
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
    rules: 'required',
  },
  {
    component: 'InputNumber',
    fieldName: 'potential_score',
    label: 'potential_score',
    rules: 'required',
    componentProps: { style: 'width: 100%' },
  },
  {
    component: 'InputNumber',
    fieldName: 'heat_index',
    label: 'heat_index',
    rules: 'required',
    componentProps: { style: 'width: 100%' },
  },
  {
    component: 'Textarea',
    fieldName: 'reason',
    label: 'reason',
    componentProps: { rows: 4 },
  },
  {
    component: 'Textarea',
    fieldName: 'keywords',
    label: 'keywords',
    rules: 'required',
    componentProps: { placeholder: 'Enter JSON', rows: 6 },
  },
  {
    component: 'Textarea',
    fieldName: 'creative_angles',
    label: 'creative_angles',
    rules: 'required',
    componentProps: { placeholder: 'Enter JSON', rows: 6 },
  },
  {
    component: 'Select',
    fieldName: 'status',
    label: '状态',
    rules: 'required',
    componentProps: {
      options: getDictOptions('hasn_creator_status'),
    },
  },
  {
    component: 'InputNumber',
    fieldName: 'content_id',
    label: '采纳后关联内容',
    componentProps: { style: 'width: 100%' },
  },
  {
    component: 'Input',
    fieldName: 'batch_date',
    label: 'batch_date',
  },
  {
    component: 'Input',
    fieldName: 'source_uid',
    label: 'source_uid',
  },
];
