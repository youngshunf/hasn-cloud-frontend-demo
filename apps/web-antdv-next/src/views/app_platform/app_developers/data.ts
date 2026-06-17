import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeGridProps } from '#/adapter/vxe-table';
import type { AppDevelopers } from '#/api/app_platform/app_developers';

import { $t } from '@vben/locales';

import { getDictOptions } from '#/utils/dict';

/**
 * Query form schema
 */
export const querySchema: VbenFormSchema[] = [
  {
    component: '',
    fieldName: 'developer_id',
    label: '开发者 ID',
  },
  {
    component: 'Input',
    fieldName: 'owner_id',
    label: '关联的 Owner ID',
    componentProps: { placeholder: 'Search by \u5173\u8054\u7684 Owner ID' },
  },
  {
    component: 'Input',
    fieldName: 'display_name',
    label: '显示名称',
    componentProps: { placeholder: 'Search by \u663E\u793A\u540D\u79F0' },
  },
  {
    component: 'Input',
    fieldName: 'email',
    label: '邮箱',
    componentProps: { placeholder: 'Search by \u90AE\u7BB1' },
  },
  {
    component: 'Input',
    fieldName: 'company_name',
    label: 'company_name',
    componentProps: { placeholder: 'Search by company_name' },
  },
  {
    component: 'Select',
    fieldName: 'verification_status',
    label: '认证状态',
    componentProps: {
      allowClear: true,
      options: getDictOptions('app_platform_verification_status'),
    },
  },
  {
    component: 'RangePicker',
    fieldName: 'verified_at',
    label: 'verified_at',
    componentProps: { format: 'YYYY-MM-DD' },
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
  onActionClick?: OnActionClickFn<AppDevelopers>,
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
      field: 'developer_id',
      title: '开发者 ID',
      width: 150,
    },
    {
      field: 'owner_id',
      title: '关联的 Owner ID',
      width: 150,
    },
    {
      field: 'display_name',
      title: '显示名称',
      width: 150,
    },
    {
      field: 'email',
      title: '邮箱',
      width: 150,
    },
    {
      field: 'company_name',
      title: 'company_name',
      width: 150,
    },
    {
      field: 'website_url',
      title: 'website_url',
      width: 150,
    },
    {
      field: 'verification_status',
      title: '认证状态',
      width: 150,
      cellRender: {
        name: 'CellTag',
        options: getDictOptions('app_platform_verification_status'),
      },
    },
    {
      field: 'verified_at',
      title: 'verified_at',
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
    fieldName: 'developer_id',
    label: '开发者 ID',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'owner_id',
    label: '关联的 Owner ID',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'display_name',
    label: '显示名称',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'email',
    label: '邮箱',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'company_name',
    label: 'company_name',
  },
  {
    component: 'Textarea',
    fieldName: 'website_url',
    label: 'website_url',
    componentProps: { rows: 4 },
  },
  {
    component: 'Select',
    fieldName: 'verification_status',
    label: '认证状态',
    rules: 'required',
    componentProps: {
      options: getDictOptions('app_platform_verification_status'),
    },
  },
  {
    component: 'DatePicker',
    fieldName: 'verified_at',
    label: 'verified_at',
    componentProps: {
      format: 'YYYY-MM-DD HH:mm:ss',
      showTime: true,
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
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
