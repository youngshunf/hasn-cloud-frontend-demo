import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeGridProps } from '#/adapter/vxe-table';
import type { Content } from '#/api/hasn_creator/content';

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
    fieldName: 'created_by_agent_id',
    label: '创作分身 hasn_id',
    componentProps: {
      placeholder:
        'Search by \u521B\u4F5C\u5206\u8EAB hasn_id\uFF08\u5BA1\u8BA1\uFF09',
    },
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
    fieldName: 'topic_id',
    label: '来源选题',
    componentProps: { style: 'width: 100%' },
  },
  {
    component: 'InputNumber',
    fieldName: 'viral_pattern_id',
    label: '套用爆款模式',
    componentProps: { style: 'width: 100%' },
  },
  {
    component: 'InputNumber',
    fieldName: 'playbook_id',
    label: 'playbook_id',
    componentProps: { style: 'width: 100%' },
  },
  {
    component: 'Select',
    fieldName: 'review_status',
    label: '审核状态',
    componentProps: {
      allowClear: true,
      options: getDictOptions('hasn_creator_review_status'),
    },
  },
  {
    component: 'InputNumber',
    fieldName: 'reviewer_user_id',
    label: 'reviewer_user_id',
    componentProps: { style: 'width: 100%' },
  },
  {
    component: 'RangePicker',
    fieldName: 'reviewed_at',
    label: 'reviewed_at',
    componentProps: { format: 'YYYY-MM-DD' },
  },
];

/**
 * Table columns configuration
 */
export function useColumns(
  onActionClick?: OnActionClickFn<Content>,
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
      field: 'content_no',
      title: 'content_no',
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
      field: 'created_by_agent_id',
      title: '创作分身 hasn_id',
      width: 150,
    },
    {
      field: 'title',
      title: 'title',
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
      field: 'content_tracks',
      title: '形态轨道',
      width: 150,
    },
    {
      field: 'pipeline_mode',
      title: '本篇自主度',
      width: 150,
    },
    {
      field: 'topic_id',
      title: '来源选题',
      width: 150,
    },
    {
      field: 'viral_pattern_id',
      title: '套用爆款模式',
      width: 150,
    },
    {
      field: 'playbook_id',
      title: 'playbook_id',
      width: 150,
    },
    {
      field: 'review_status',
      title: '审核状态',
      width: 150,
      cellRender: {
        name: 'CellTag',
        options: getDictOptions('hasn_creator_review_status'),
      },
    },
    {
      field: 'reviewer_user_id',
      title: 'reviewer_user_id',
      width: 150,
    },
    {
      field: 'reviewed_at',
      title: 'reviewed_at',
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
    fieldName: 'content_no',
    label: 'content_no',
    rules: 'required',
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
    fieldName: 'created_by_agent_id',
    label: '创作分身 hasn_id',
  },
  {
    component: 'Input',
    fieldName: 'title',
    label: 'title',
    rules: 'required',
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
    component: 'Input',
    fieldName: 'content_tracks',
    label: '形态轨道',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'pipeline_mode',
    label: '本篇自主度',
  },
  {
    component: 'Textarea',
    fieldName: 'target_platforms',
    label: 'target_platforms',
    rules: 'required',
    componentProps: { placeholder: 'Enter JSON', rows: 6 },
  },
  {
    component: 'InputNumber',
    fieldName: 'topic_id',
    label: '来源选题',
    componentProps: { style: 'width: 100%' },
  },
  {
    component: 'InputNumber',
    fieldName: 'viral_pattern_id',
    label: '套用爆款模式',
    componentProps: { style: 'width: 100%' },
  },
  {
    component: 'InputNumber',
    fieldName: 'playbook_id',
    label: 'playbook_id',
    componentProps: { style: 'width: 100%' },
  },
  {
    component: 'Select',
    fieldName: 'review_status',
    label: '审核状态',
    componentProps: {
      options: getDictOptions('hasn_creator_review_status'),
    },
  },
  {
    component: 'Textarea',
    fieldName: 'review_note',
    label: '主人审核意见',
    componentProps: { rows: 4 },
  },
  {
    component: 'InputNumber',
    fieldName: 'reviewer_user_id',
    label: 'reviewer_user_id',
    componentProps: { style: 'width: 100%' },
  },
  {
    component: 'DatePicker',
    fieldName: 'reviewed_at',
    label: 'reviewed_at',
    componentProps: {
      format: 'YYYY-MM-DD HH:mm:ss',
      showTime: true,
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
  {
    component: 'Textarea',
    fieldName: 'metadata_json',
    label: 'metadata_json',
    rules: 'required',
    componentProps: { placeholder: 'Enter JSON', rows: 6 },
  },
];
