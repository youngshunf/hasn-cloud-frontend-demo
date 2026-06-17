import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeGridProps } from '#/adapter/vxe-table';
import type { ViralPattern } from '#/api/hasn_creator/viral_pattern';

import { $t } from '@vben/locales';

import { getDictOptions } from '#/utils/dict';

/**
 * Query form schema
 */
export const querySchema: VbenFormSchema[] = [
  {
    component: 'InputNumber',
    fieldName: 'project_id',
    label: '归属项目',
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
    fieldName: 'name',
    label: 'name',
    componentProps: { placeholder: 'Search by name' },
  },
  {
    component: 'Select',
    fieldName: 'pattern_type',
    label: '类型',
    componentProps: {
      allowClear: true,
      options: getDictOptions('hasn_creator_pattern_type'),
    },
  },
];

/**
 * Table columns configuration
 */
export function useColumns(
  onActionClick?: OnActionClickFn<ViralPattern>,
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
      title: '归属项目',
      width: 150,
    },
    {
      field: 'user_id',
      title: 'user_id',
      width: 150,
    },
    {
      field: 'enterprise_id',
      title: 'enterprise_id',
      width: 150,
    },
    {
      field: 'owner_scope',
      title: 'owner_scope',
      width: 150,
    },
    {
      field: 'name',
      title: 'name',
      width: 150,
    },
    {
      field: 'pattern_type',
      title: '类型',
      width: 150,
      cellRender: {
        name: 'CellTag',
        options: getDictOptions('hasn_creator_pattern_type'),
      },
    },
    {
      field: 'usage_count',
      title: 'usage_count',
      width: 150,
    },
    {
      field: 'success_rate',
      title: 'success_rate',
      width: 150,
    },
    {
      field: 'source',
      title: '来源',
      width: 150,
    },
    {
      field: 'is_builtin',
      title: 'is_builtin',
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
    label: '归属项目',
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
    fieldName: 'owner_scope',
    label: 'owner_scope',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'name',
    label: 'name',
    rules: 'required',
  },
  {
    component: 'Select',
    fieldName: 'pattern_type',
    label: '类型',
    rules: 'required',
    componentProps: {
      options: getDictOptions('hasn_creator_pattern_type'),
    },
  },
  {
    component: 'Textarea',
    fieldName: 'template',
    label: '模板',
    componentProps: { rows: 4 },
  },
  {
    component: 'Textarea',
    fieldName: 'description',
    label: 'description',
    componentProps: { rows: 4 },
  },
  {
    component: 'Textarea',
    fieldName: 'example',
    label: 'example',
    componentProps: { rows: 4 },
  },
  {
    component: 'InputNumber',
    fieldName: 'usage_count',
    label: 'usage_count',
    rules: 'required',
    componentProps: { style: 'width: 100%' },
  },
  {
    component: 'InputNumber',
    fieldName: 'success_rate',
    label: 'success_rate',
    rules: 'required',
    componentProps: { style: 'width: 100%' },
  },
  {
    component: 'Input',
    fieldName: 'source',
    label: '来源',
    rules: 'required',
  },
  {
    component: 'Textarea',
    fieldName: 'tags',
    label: 'tags',
    rules: 'required',
    componentProps: { placeholder: 'Enter JSON', rows: 6 },
  },
  {
    component: 'Switch',
    fieldName: 'is_builtin',
    label: 'is_builtin',
  },
];
