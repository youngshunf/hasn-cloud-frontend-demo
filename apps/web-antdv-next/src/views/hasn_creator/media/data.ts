import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeGridProps } from '#/adapter/vxe-table';
import type { Media } from '#/api/hasn_creator/media';

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
    component: 'Select',
    fieldName: 'type',
    label: '类型',
    componentProps: {
      allowClear: true,
      options: getDictOptions('hasn_creator_type'),
    },
  },
  {
    component: 'Input',
    fieldName: 'filename',
    label: 'filename',
    componentProps: { placeholder: 'Search by filename' },
  },
  {
    component: 'InputNumber',
    fieldName: 'width',
    label: 'width',
    componentProps: { style: 'width: 100%' },
  },
];

/**
 * Table columns configuration
 */
export function useColumns(
  onActionClick?: OnActionClickFn<Media>,
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
      field: 'type',
      title: '类型',
      width: 150,
      cellRender: {
        name: 'CellTag',
        options: getDictOptions('hasn_creator_type'),
      },
    },
    {
      field: 'filename',
      title: 'filename',
      width: 150,
    },
    {
      field: 'file_size',
      title: 'file_size',
      width: 150,
    },
    {
      field: 'width',
      title: 'width',
      width: 150,
    },
    {
      field: 'height',
      title: 'height',
      width: 150,
    },
    {
      field: 'duration',
      title: 'duration',
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
    component: 'Select',
    fieldName: 'type',
    label: '类型',
    rules: 'required',
    componentProps: {
      options: getDictOptions('hasn_creator_type'),
    },
  },
  {
    component: 'Textarea',
    fieldName: 'asset_uri',
    label: '私有桶引用',
    rules: 'required',
    componentProps: { rows: 4 },
  },
  {
    component: 'Input',
    fieldName: 'filename',
    label: 'filename',
  },
  {
    component: 'InputNumber',
    fieldName: 'file_size',
    label: 'file_size',
    componentProps: { style: 'width: 100%' },
  },
  {
    component: 'InputNumber',
    fieldName: 'width',
    label: 'width',
    componentProps: { style: 'width: 100%' },
  },
  {
    component: 'InputNumber',
    fieldName: 'height',
    label: 'height',
    componentProps: { style: 'width: 100%' },
  },
  {
    component: 'InputNumber',
    fieldName: 'duration',
    label: 'duration',
    componentProps: { style: 'width: 100%' },
  },
  {
    component: 'Textarea',
    fieldName: 'thumbnail_uri',
    label: 'thumbnail_uri',
    componentProps: { rows: 4 },
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
    fieldName: 'description',
    label: 'description',
    componentProps: { rows: 4 },
  },
];
