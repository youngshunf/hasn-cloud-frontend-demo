import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeGridProps } from '#/adapter/vxe-table';
import type { Publish } from '#/api/hasn_creator/publish';

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
    fieldName: 'account_id',
    label: 'account_id',
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
    component: 'InputNumber',
    fieldName: 'approval_user_id',
    label: 'approval_user_id',
    componentProps: { style: 'width: 100%' },
  },
  {
    component: 'RangePicker',
    fieldName: 'approved_at',
    label: 'approved_at',
    componentProps: { format: 'YYYY-MM-DD' },
  },
  {
    component: 'RangePicker',
    fieldName: 'published_at',
    label: 'published_at',
    componentProps: { format: 'YYYY-MM-DD' },
  },
  {
    component: 'RangePicker',
    fieldName: 'metrics_updated_at',
    label: 'metrics_updated_at',
    componentProps: { format: 'YYYY-MM-DD' },
  },
];

/**
 * Table columns configuration
 */
export function useColumns(
  onActionClick?: OnActionClickFn<Publish>,
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
      field: 'account_id',
      title: 'account_id',
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
      field: 'platform',
      title: 'platform',
      width: 150,
    },
    {
      field: 'method',
      title: '方式',
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
      field: 'approval_user_id',
      title: 'approval_user_id',
      width: 150,
    },
    {
      field: 'approved_at',
      title: 'approved_at',
      width: 150,
    },
    {
      field: 'published_at',
      title: 'published_at',
      width: 150,
    },
    {
      field: 'views',
      title: 'views',
      width: 150,
    },
    {
      field: 'likes',
      title: 'likes',
      width: 150,
    },
    {
      field: 'comments',
      title: 'comments',
      width: 150,
    },
    {
      field: 'shares',
      title: 'shares',
      width: 150,
    },
    {
      field: 'favorites',
      title: 'favorites',
      width: 150,
    },
    {
      field: 'new_followers',
      title: 'new_followers',
      width: 150,
    },
    {
      field: 'metrics_updated_at',
      title: 'metrics_updated_at',
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
    fieldName: 'content_id',
    label: 'content_id',
    rules: 'required',
    componentProps: { style: 'width: 100%' },
  },
  {
    component: 'InputNumber',
    fieldName: 'account_id',
    label: 'account_id',
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
    fieldName: 'platform',
    label: 'platform',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'method',
    label: '方式',
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
    component: 'Textarea',
    fieldName: 'publish_url',
    label: '发布链接',
    componentProps: { rows: 4 },
  },
  {
    component: 'Textarea',
    fieldName: 'publish_note',
    label: '给主人看',
    componentProps: { rows: 4 },
  },
  {
    component: 'InputNumber',
    fieldName: 'approval_user_id',
    label: 'approval_user_id',
    componentProps: { style: 'width: 100%' },
  },
  {
    component: 'DatePicker',
    fieldName: 'approved_at',
    label: 'approved_at',
    componentProps: {
      format: 'YYYY-MM-DD HH:mm:ss',
      showTime: true,
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
  {
    component: 'Textarea',
    fieldName: 'error_message',
    label: '失败如实回报',
    componentProps: { rows: 4 },
  },
  {
    component: 'DatePicker',
    fieldName: 'published_at',
    label: 'published_at',
    componentProps: {
      format: 'YYYY-MM-DD HH:mm:ss',
      showTime: true,
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
  {
    component: 'InputNumber',
    fieldName: 'views',
    label: 'views',
    rules: 'required',
    componentProps: { style: 'width: 100%' },
  },
  {
    component: 'InputNumber',
    fieldName: 'likes',
    label: 'likes',
    rules: 'required',
    componentProps: { style: 'width: 100%' },
  },
  {
    component: 'InputNumber',
    fieldName: 'comments',
    label: 'comments',
    rules: 'required',
    componentProps: { style: 'width: 100%' },
  },
  {
    component: 'InputNumber',
    fieldName: 'shares',
    label: 'shares',
    rules: 'required',
    componentProps: { style: 'width: 100%' },
  },
  {
    component: 'InputNumber',
    fieldName: 'favorites',
    label: 'favorites',
    rules: 'required',
    componentProps: { style: 'width: 100%' },
  },
  {
    component: 'InputNumber',
    fieldName: 'new_followers',
    label: 'new_followers',
    rules: 'required',
    componentProps: { style: 'width: 100%' },
  },
  {
    component: 'Textarea',
    fieldName: 'metrics_json',
    label: 'metrics_json',
    rules: 'required',
    componentProps: { placeholder: 'Enter JSON', rows: 6 },
  },
  {
    component: 'DatePicker',
    fieldName: 'metrics_updated_at',
    label: 'metrics_updated_at',
    componentProps: {
      format: 'YYYY-MM-DD HH:mm:ss',
      showTime: true,
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
];
