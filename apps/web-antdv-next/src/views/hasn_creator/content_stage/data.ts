import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeGridProps } from '#/adapter/vxe-table';
import type { ContentStage } from '#/api/hasn_creator/content_stage';

import { $t } from '@vben/locales';

import { getDictOptions } from '#/utils/dict';

/**
 * Query form schema
 */
export const querySchema: VbenFormSchema[] = [
  {
    component: 'InputNumber',
    fieldName: 'content_id',
    label: 'content_id',
    componentProps: { style: 'width: 100%' },
  },
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
    fieldName: 'status',
    label: '状态',
    componentProps: {
      allowClear: true,
      options: getDictOptions('hasn_creator_status'),
    },
  },
  {
    component: 'Select',
    fieldName: 'source_type',
    label: '来源',
    componentProps: {
      allowClear: true,
      options: getDictOptions('hasn_creator_source_type'),
    },
  },
];

/**
 * Table columns configuration
 */
export function useColumns(
  onActionClick?: OnActionClickFn<ContentStage>,
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
      field: 'content_id',
      title: 'content_id',
      width: 150,
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
      field: 'stage',
      title: '阶段',
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
      field: 'version',
      title: 'version',
      width: 150,
    },
    {
      field: 'source_type',
      title: '来源',
      width: 150,
      cellRender: {
        name: 'CellTag',
        options: getDictOptions('hasn_creator_source_type'),
      },
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
    fieldName: 'content_id',
    label: 'content_id',
    rules: 'required',
    componentProps: { style: 'width: 100%' },
  },
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
    fieldName: 'stage',
    label: '阶段',
    rules: 'required',
  },
  {
    component: 'Textarea',
    fieldName: 'content_text',
    label: 'content_text',
    componentProps: { rows: 4 },
  },
  {
    component: 'Textarea',
    fieldName: 'asset_refs',
    label: '文件产出',
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
    fieldName: 'version',
    label: 'version',
    rules: 'required',
    componentProps: { style: 'width: 100%' },
  },
  {
    component: 'Select',
    fieldName: 'source_type',
    label: '来源',
    rules: 'required',
    componentProps: {
      options: getDictOptions('hasn_creator_source_type'),
    },
  },
];
