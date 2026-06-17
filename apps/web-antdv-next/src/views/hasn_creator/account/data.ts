import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeGridProps } from '#/adapter/vxe-table';
import type { Account } from '#/api/hasn_creator/account';

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
    fieldName: 'platform_uid',
    label: 'platform_uid',
    componentProps: { placeholder: 'Search by platform_uid' },
  },
  {
    component: 'Input',
    fieldName: 'nickname',
    label: 'nickname',
    componentProps: { placeholder: 'Search by nickname' },
  },
  {
    component: 'RangePicker',
    fieldName: 'metrics_updated_at',
    label: 'metrics_updated_at',
    componentProps: { format: 'YYYY-MM-DD' },
  },
  {
    component: 'Select',
    fieldName: 'auth_status',
    label: '发布授权',
    componentProps: {
      allowClear: true,
      options: getDictOptions('hasn_creator_auth_status'),
    },
  },
];

/**
 * Table columns configuration
 */
export function useColumns(
  onActionClick?: OnActionClickFn<Account>,
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
      field: 'platform',
      title: '平台',
      width: 150,
    },
    {
      field: 'platform_uid',
      title: 'platform_uid',
      width: 150,
    },
    {
      field: 'nickname',
      title: 'nickname',
      width: 150,
    },
    {
      field: 'followers',
      title: 'followers',
      width: 150,
    },
    {
      field: 'following',
      title: 'following',
      width: 150,
    },
    {
      field: 'total_likes',
      title: 'total_likes',
      width: 150,
    },
    {
      field: 'total_favorites',
      title: 'total_favorites',
      width: 150,
    },
    {
      field: 'total_comments',
      title: 'total_comments',
      width: 150,
    },
    {
      field: 'total_posts',
      title: 'total_posts',
      width: 150,
    },
    {
      field: 'metrics_updated_at',
      title: 'metrics_updated_at',
      width: 150,
    },
    {
      field: 'auth_status',
      title: '发布授权',
      width: 150,
      cellRender: {
        name: 'CellTag',
        options: getDictOptions('hasn_creator_auth_status'),
      },
    },
    {
      field: 'is_primary',
      title: 'is_primary',
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
    fieldName: 'platform',
    label: '平台',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'platform_uid',
    label: 'platform_uid',
  },
  {
    component: 'Input',
    fieldName: 'nickname',
    label: 'nickname',
  },
  {
    component: 'Textarea',
    fieldName: 'avatar_url',
    label: 'avatar_url',
    componentProps: { rows: 4 },
  },
  {
    component: 'Textarea',
    fieldName: 'bio',
    label: 'bio',
    componentProps: { rows: 4 },
  },
  {
    component: 'Textarea',
    fieldName: 'home_url',
    label: 'home_url',
    componentProps: { rows: 4 },
  },
  {
    component: 'InputNumber',
    fieldName: 'followers',
    label: 'followers',
    rules: 'required',
    componentProps: { style: 'width: 100%' },
  },
  {
    component: 'InputNumber',
    fieldName: 'following',
    label: 'following',
    rules: 'required',
    componentProps: { style: 'width: 100%' },
  },
  {
    component: 'InputNumber',
    fieldName: 'total_likes',
    label: 'total_likes',
    rules: 'required',
    componentProps: { style: 'width: 100%' },
  },
  {
    component: 'InputNumber',
    fieldName: 'total_favorites',
    label: 'total_favorites',
    rules: 'required',
    componentProps: { style: 'width: 100%' },
  },
  {
    component: 'InputNumber',
    fieldName: 'total_comments',
    label: 'total_comments',
    rules: 'required',
    componentProps: { style: 'width: 100%' },
  },
  {
    component: 'InputNumber',
    fieldName: 'total_posts',
    label: 'total_posts',
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
  {
    component: 'Select',
    fieldName: 'auth_status',
    label: '发布授权',
    rules: 'required',
    componentProps: {
      options: getDictOptions('hasn_creator_auth_status'),
    },
  },
  {
    component: 'Switch',
    fieldName: 'is_primary',
    label: 'is_primary',
  },
  {
    component: 'Textarea',
    fieldName: 'notes',
    label: 'notes',
    componentProps: { rows: 4 },
  },
];
