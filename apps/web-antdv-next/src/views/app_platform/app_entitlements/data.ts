import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeGridProps } from '#/adapter/vxe-table';
import type { AppEntitlements } from '#/api/app_platform/app_entitlements';

import { $t } from '@vben/locales';

import { getDictOptions } from '#/utils/dict';

/**
 * Query form schema
 */
export const querySchema: VbenFormSchema[] = [
  {
    component: '',
    fieldName: 'entitlement_id',
    label: '凭证 ID',
  },
  {
    component: 'Input',
    fieldName: 'owner_id',
    label: 'owner_id',
    componentProps: { placeholder: 'Search by owner_id' },
  },
  {
    component: '',
    fieldName: 'listing_id',
    label: 'listing_id',
  },
  {
    component: 'Input',
    fieldName: 'installation_id',
    label: 'installation_id',
    componentProps: { placeholder: 'Search by installation_id' },
  },
  {
    component: '',
    fieldName: 'amount_paid',
    label: 'amount_paid',
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
    fieldName: 'purchased_at',
    label: 'purchased_at',
    componentProps: { format: 'YYYY-MM-DD' },
  },
  {
    component: 'RangePicker',
    fieldName: 'expires_at',
    label: 'expires_at',
    componentProps: { format: 'YYYY-MM-DD' },
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
  onActionClick?: OnActionClickFn<AppEntitlements>,
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
      field: 'entitlement_id',
      title: '凭证 ID',
      width: 150,
    },
    {
      field: 'owner_id',
      title: 'owner_id',
      width: 150,
    },
    {
      field: 'listing_id',
      title: 'listing_id',
      width: 150,
    },
    {
      field: 'installation_id',
      title: 'installation_id',
      width: 150,
    },
    {
      field: 'pricing_model',
      title: '定价模式',
      width: 150,
    },
    {
      field: 'amount_paid',
      title: 'amount_paid',
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
      field: 'purchased_at',
      title: 'purchased_at',
      width: 150,
    },
    {
      field: 'expires_at',
      title: 'expires_at',
      width: 150,
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
    fieldName: 'entitlement_id',
    label: '凭证 ID',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'owner_id',
    label: 'owner_id',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'listing_id',
    label: 'listing_id',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'installation_id',
    label: 'installation_id',
  },
  {
    component: 'Input',
    fieldName: 'pricing_model',
    label: '定价模式',
    rules: 'required',
  },
  {
    component: 'InputNumber',
    fieldName: 'amount_paid',
    label: 'amount_paid',
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
  {
    component: 'DatePicker',
    fieldName: 'purchased_at',
    label: 'purchased_at',
    rules: 'required',
    componentProps: {
      format: 'YYYY-MM-DD HH:mm:ss',
      showTime: true,
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
  {
    component: 'DatePicker',
    fieldName: 'expires_at',
    label: 'expires_at',
    componentProps: {
      format: 'YYYY-MM-DD HH:mm:ss',
      showTime: true,
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
];
