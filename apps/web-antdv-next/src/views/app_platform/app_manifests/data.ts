import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeGridProps } from '#/adapter/vxe-table';
import type { AppManifests } from '#/api/app_platform/app_manifests';

import { $t } from '@vben/locales';

import { getDictOptions } from '#/utils/dict';

/**
 * Query form schema
 */
export const querySchema: VbenFormSchema[] = [
  {
    component: '',
    fieldName: 'app_id',
    label: 'App ID',
  },
  {
    component: '',
    fieldName: 'developer_id',
    label: '开发者 ID',
  },
  {
    component: 'Input',
    fieldName: 'namespace',
    label: 'namespace',
    componentProps: { placeholder: 'Search by namespace' },
  },
  {
    component: 'Input',
    fieldName: 'name',
    label: 'name',
    componentProps: { placeholder: 'Search by name' },
  },
  {
    component: 'Input',
    fieldName: 'display_name',
    label: '显示名称',
    componentProps: { placeholder: 'Search by \u663E\u793A\u540D\u79F0' },
  },
  {
    component: 'Select',
    fieldName: 'category',
    label: 'category',
    componentProps: {
      allowClear: true,
      options: getDictOptions('app_platform_category'),
    },
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
  onActionClick?: OnActionClickFn<AppManifests>,
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
      field: 'app_id',
      title: 'App ID',
      width: 150,
    },
    {
      field: 'developer_id',
      title: '开发者 ID',
      width: 150,
    },
    {
      field: 'namespace',
      title: 'namespace',
      width: 150,
    },
    {
      field: 'name',
      title: 'name',
      width: 150,
    },
    {
      field: 'display_name',
      title: '显示名称',
      width: 150,
    },
    {
      field: 'icon_url',
      title: 'icon_url',
      width: 150,
    },
    {
      field: 'current_version',
      title: 'current_version',
      width: 150,
    },
    {
      field: 'backend_runtime_mode',
      title: '后端运行模式',
      width: 150,
    },
    {
      field: 'frontend_hosting_mode',
      title: '前端托管模式',
      width: 150,
    },
    {
      field: 'category',
      title: 'category',
      width: 150,
      cellRender: {
        name: 'CellTag',
        options: getDictOptions('app_platform_category'),
      },
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
    fieldName: 'app_id',
    label: 'App ID',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'developer_id',
    label: '开发者 ID',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'namespace',
    label: 'namespace',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'name',
    label: 'name',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'display_name',
    label: '显示名称',
    rules: 'required',
  },
  {
    component: 'Textarea',
    fieldName: 'description',
    label: 'description',
    rules: 'required',
    componentProps: { rows: 4 },
  },
  {
    component: 'Textarea',
    fieldName: 'icon_url',
    label: 'icon_url',
    componentProps: { rows: 4 },
  },
  {
    component: 'Input',
    fieldName: 'current_version',
    label: 'current_version',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'backend_runtime_mode',
    label: '后端运行模式',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'frontend_hosting_mode',
    label: '前端托管模式',
    rules: 'required',
  },
  {
    component: 'Textarea',
    fieldName: 'requested_scopes',
    label: 'requested_scopes',
    rules: 'required',
    componentProps: { placeholder: 'Enter JSON', rows: 6 },
  },
  {
    component: 'Select',
    fieldName: 'category',
    label: 'category',
    componentProps: {
      options: getDictOptions('app_platform_category'),
    },
  },
  {
    component: 'Textarea',
    fieldName: 'tags',
    label: 'tags',
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
];
