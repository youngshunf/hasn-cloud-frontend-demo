import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeGridProps } from '#/adapter/vxe-table';
import type { AppInstallations } from '#/api/app_platform/app_installations';

import { $t } from '@vben/locales';

import { getDictOptions } from '#/utils/dict';

/**
 * Query form schema
 */
export const querySchema: VbenFormSchema[] = [
  {
    component: '',
    fieldName: 'installation_id',
    label: 'Installation ID',
  },
  {
    component: 'Input',
    fieldName: 'owner_id',
    label: 'Owner ID',
    componentProps: { placeholder: 'Search by Owner ID' },
  },
  {
    component: 'Input',
    fieldName: 'app_id',
    label: 'app_id',
    componentProps: { placeholder: 'Search by app_id' },
  },
  {
    component: '',
    fieldName: 'listing_id',
    label: 'listing_id',
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
    fieldName: 'installed_at',
    label: 'installed_at',
    componentProps: { format: 'YYYY-MM-DD' },
  },
  {
    component: 'RangePicker',
    fieldName: 'last_used_at',
    label: 'last_used_at',
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
  onActionClick?: OnActionClickFn<AppInstallations>,
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
      field: 'installation_id',
      title: 'Installation ID',
      width: 150,
    },
    {
      field: 'owner_id',
      title: 'Owner ID',
      width: 150,
    },
    {
      field: 'app_id',
      title: 'app_id',
      width: 150,
    },
    {
      field: 'listing_id',
      title: 'listing_id',
      width: 150,
    },
    {
      field: 'installed_version',
      title: 'installed_version',
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
      field: 'installed_at',
      title: 'installed_at',
      width: 150,
    },
    {
      field: 'last_used_at',
      title: 'last_used_at',
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
    fieldName: 'installation_id',
    label: 'Installation ID',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'owner_id',
    label: 'Owner ID',
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
    fieldName: 'listing_id',
    label: 'listing_id',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'installed_version',
    label: 'installed_version',
    rules: 'required',
  },
  {
    component: 'Textarea',
    fieldName: 'granted_scopes',
    label: '授予的权限列表',
    rules: 'required',
    componentProps: { placeholder: 'Enter JSON', rows: 6 },
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
    fieldName: 'installed_at',
    label: 'installed_at',
    rules: 'required',
    componentProps: {
      format: 'YYYY-MM-DD HH:mm:ss',
      showTime: true,
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
  {
    component: 'DatePicker',
    fieldName: 'last_used_at',
    label: 'last_used_at',
    componentProps: {
      format: 'YYYY-MM-DD HH:mm:ss',
      showTime: true,
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
];
