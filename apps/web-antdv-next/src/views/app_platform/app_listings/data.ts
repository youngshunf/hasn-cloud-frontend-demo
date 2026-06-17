import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeGridProps } from '#/adapter/vxe-table';
import type { AppListings } from '#/api/app_platform/app_listings';

import { $t } from '@vben/locales';

import { getDictOptions } from '#/utils/dict';

/**
 * Query form schema
 */
export const querySchema: VbenFormSchema[] = [
  {
    component: '',
    fieldName: 'listing_id',
    label: 'Listing ID',
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
      options: getDictOptions('app_platform_status'),
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
  onActionClick?: OnActionClickFn<AppListings>,
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
      field: 'listing_id',
      title: 'Listing ID',
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
      field: 'visibility',
      title: '可见性',
      width: 150,
    },
    {
      field: 'title',
      title: 'title',
      width: 150,
    },
    {
      field: 'pricing_model',
      title: '定价模式',
      width: 150,
    },
    {
      field: 'price_amount',
      title: 'price_amount',
      width: 150,
    },
    {
      field: 'install_count',
      title: 'install_count',
      width: 150,
    },
    {
      field: 'rating_average',
      title: 'rating_average',
      width: 150,
    },
    {
      field: 'status',
      title: '状态',
      width: 150,
      cellRender: {
        name: 'CellTag',
        options: getDictOptions('app_platform_status'),
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
    fieldName: 'listing_id',
    label: 'Listing ID',
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
    component: 'Input',
    fieldName: 'visibility',
    label: '可见性',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'title',
    label: 'title',
    rules: 'required',
  },
  {
    component: 'Textarea',
    fieldName: 'description_long',
    label: 'description_long',
    rules: 'required',
    componentProps: { rows: 4 },
  },
  {
    component: 'Input',
    fieldName: 'pricing_model',
    label: '定价模式',
    rules: 'required',
  },
  {
    component: 'InputNumber',
    fieldName: 'price_amount',
    label: 'price_amount',
    componentProps: { style: 'width: 100%' },
  },
  {
    component: 'InputNumber',
    fieldName: 'install_count',
    label: 'install_count',
    rules: 'required',
    componentProps: { style: 'width: 100%' },
  },
  {
    component: 'InputNumber',
    fieldName: 'rating_average',
    label: 'rating_average',
    componentProps: { style: 'width: 100%' },
  },
  {
    component: 'Select',
    fieldName: 'status',
    label: '状态',
    rules: 'required',
    componentProps: {
      options: getDictOptions('app_platform_status'),
    },
  },
];
