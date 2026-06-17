import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeGridProps } from '#/adapter/vxe-table';
import type { AppResources } from '#/api/app_platform/app_resources';

import { $t } from '@vben/locales';

/**
 * Query form schema
 */
export const querySchema: VbenFormSchema[] = [
  {
    component: '',
    fieldName: 'resource_id',
    label: 'Resource ID',
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
    fieldName: 'resource_name',
    label: 'resource_name',
    componentProps: { placeholder: 'Search by resource_name' },
  },
  {
    component: 'Input',
    fieldName: 'display_name',
    label: 'display_name',
    componentProps: { placeholder: 'Search by display_name' },
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
  onActionClick?: OnActionClickFn<AppResources>,
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
      field: 'resource_id',
      title: 'Resource ID',
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
      field: 'resource_name',
      title: 'resource_name',
      width: 150,
    },
    {
      field: 'display_name',
      title: 'display_name',
      width: 150,
    },
    {
      field: 'storage_strategy',
      title: '存储策略',
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
    fieldName: 'resource_id',
    label: 'Resource ID',
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
    fieldName: 'resource_name',
    label: 'resource_name',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'display_name',
    label: 'display_name',
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
    fieldName: 'schema_json',
    label: 'schema_json',
    rules: 'required',
    componentProps: { placeholder: 'Enter JSON', rows: 6 },
  },
  {
    component: 'Input',
    fieldName: 'storage_strategy',
    label: '存储策略',
    rules: 'required',
  },
];
