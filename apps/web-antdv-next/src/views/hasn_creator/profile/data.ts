import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeGridProps } from '#/adapter/vxe-table';
import type { Profile } from '#/api/hasn_creator/profile';

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
    component: 'RangePicker',
    fieldName: 'pillar_weights_updated_at',
    label: 'pillar_weights_updated_at',
    componentProps: { format: 'YYYY-MM-DD' },
  },
];

/**
 * Table columns configuration
 */
export function useColumns(
  onActionClick?: OnActionClickFn<Profile>,
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
      field: 'niche',
      title: 'niche',
      width: 150,
    },
    {
      field: 'sub_niche',
      title: 'sub_niche',
      width: 150,
    },
    {
      field: 'tone',
      title: '调性',
      width: 150,
    },
    {
      field: 'posting_frequency',
      title: 'posting_frequency',
      width: 150,
    },
    {
      field: 'best_posting_time',
      title: 'best_posting_time',
      width: 150,
    },
    {
      field: 'pillar_weights_updated_at',
      title: 'pillar_weights_updated_at',
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
    fieldName: 'niche',
    label: 'niche',
  },
  {
    component: 'Input',
    fieldName: 'sub_niche',
    label: 'sub_niche',
  },
  {
    component: 'Textarea',
    fieldName: 'persona',
    label: 'persona',
    componentProps: { rows: 4 },
  },
  {
    component: 'Textarea',
    fieldName: 'target_audience',
    label: 'target_audience',
    componentProps: { rows: 4 },
  },
  {
    component: 'Input',
    fieldName: 'tone',
    label: '调性',
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
    fieldName: 'content_pillars',
    label: '内容支柱 ["食谱教程","厨房好物","探店"]',
    rules: 'required',
    componentProps: { placeholder: 'Enter JSON', rows: 6 },
  },
  {
    component: 'Input',
    fieldName: 'posting_frequency',
    label: 'posting_frequency',
  },
  {
    component: 'Input',
    fieldName: 'best_posting_time',
    label: 'best_posting_time',
  },
  {
    component: 'Textarea',
    fieldName: 'style_references',
    label: 'style_references',
    rules: 'required',
    componentProps: { placeholder: 'Enter JSON', rows: 6 },
  },
  {
    component: 'Textarea',
    fieldName: 'taboo_topics',
    label: '禁区话题',
    rules: 'required',
    componentProps: { placeholder: 'Enter JSON', rows: 6 },
  },
  {
    component: 'Textarea',
    fieldName: 'bio',
    label: 'bio',
    componentProps: { rows: 4 },
  },
  {
    component: 'Textarea',
    fieldName: 'pillar_weights',
    label: '支柱权重',
    rules: 'required',
    componentProps: { placeholder: 'Enter JSON', rows: 6 },
  },
  {
    component: 'DatePicker',
    fieldName: 'pillar_weights_updated_at',
    label: 'pillar_weights_updated_at',
    componentProps: {
      format: 'YYYY-MM-DD HH:mm:ss',
      showTime: true,
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
];
