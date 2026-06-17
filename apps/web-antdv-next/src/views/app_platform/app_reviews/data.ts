import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeGridProps } from '#/adapter/vxe-table';
import type { AppReviews } from '#/api/app_platform/app_reviews';

import { $t } from '@vben/locales';

import { getDictOptions } from '#/utils/dict';

/**
 * Query form schema
 */
export const querySchema: VbenFormSchema[] = [
  {
    component: '',
    fieldName: 'review_id',
    label: '审核 ID',
  },
  {
    component: 'Input',
    fieldName: 'app_id',
    label: 'app_id',
    componentProps: { placeholder: 'Search by app_id' },
  },
  {
    component: '',
    fieldName: 'version_id',
    label: 'version_id',
  },
  {
    component: 'Select',
    fieldName: 'review_type',
    label: '审核类型',
    componentProps: {
      allowClear: true,
      options: getDictOptions('app_platform_review_type'),
    },
  },
  {
    component: 'Input',
    fieldName: 'reviewer_id',
    label: 'reviewer_id',
    componentProps: { placeholder: 'Search by reviewer_id' },
  },
  {
    component: 'Select',
    fieldName: 'review_status',
    label: '审核状态',
    componentProps: {
      allowClear: true,
      options: getDictOptions('app_platform_review_status'),
    },
  },
  {
    component: 'RangePicker',
    fieldName: 'created_at',
    label: 'created_at',
    componentProps: { format: 'YYYY-MM-DD' },
  },
  {
    component: 'RangePicker',
    fieldName: 'updated_at',
    label: 'updated_at',
    componentProps: { format: 'YYYY-MM-DD' },
  },
];

/**
 * Table columns configuration
 */
export function useColumns(
  onActionClick?: OnActionClickFn<AppReviews>,
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
      field: 'review_id',
      title: '审核 ID',
      width: 150,
    },
    {
      field: 'app_id',
      title: 'app_id',
      width: 150,
    },
    {
      field: 'version_id',
      title: 'version_id',
      width: 150,
    },
    {
      field: 'review_type',
      title: '审核类型',
      width: 150,
      cellRender: {
        name: 'CellTag',
        options: getDictOptions('app_platform_review_type'),
      },
    },
    {
      field: 'reviewer_id',
      title: 'reviewer_id',
      width: 150,
    },
    {
      field: 'review_status',
      title: '审核状态',
      width: 150,
      cellRender: {
        name: 'CellTag',
        options: getDictOptions('app_platform_review_status'),
      },
    },
    {
      field: 'created_at',
      title: 'created_at',
      width: 150,
    },
    {
      field: 'updated_at',
      title: 'updated_at',
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
    fieldName: 'review_id',
    label: '审核 ID',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'app_id',
    label: 'app_id',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'version_id',
    label: 'version_id',
    rules: 'required',
  },
  {
    component: 'Select',
    fieldName: 'review_type',
    label: '审核类型',
    rules: 'required',
    componentProps: {
      options: getDictOptions('app_platform_review_type'),
    },
  },
  {
    component: 'Input',
    fieldName: 'reviewer_id',
    label: 'reviewer_id',
    rules: 'required',
  },
  {
    component: 'Select',
    fieldName: 'review_status',
    label: '审核状态',
    rules: 'required',
    componentProps: {
      options: getDictOptions('app_platform_review_status'),
    },
  },
  {
    component: 'Textarea',
    fieldName: 'review_notes',
    label: 'review_notes',
    componentProps: { rows: 4 },
  },
];
