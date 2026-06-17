import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeGridProps } from '#/adapter/vxe-table';
import type { AppVersions } from '#/api/app_platform/app_versions';

import { $t } from '@vben/locales';

import { getDictOptions } from '#/utils/dict';

/**
 * Query form schema
 */
export const querySchema: VbenFormSchema[] = [
  {
    component: '',
    fieldName: 'version_id',
    label: '版本 ID',
  },
  {
    component: 'Input',
    fieldName: 'app_id',
    label: 'App ID',
    componentProps: { placeholder: 'Search by App ID' },
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
    fieldName: 'published_at',
    label: 'published_at',
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
  onActionClick?: OnActionClickFn<AppVersions>,
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
      field: 'version_id',
      title: '版本 ID',
      width: 150,
    },
    {
      field: 'app_id',
      title: 'App ID',
      width: 150,
    },
    {
      field: 'version',
      title: '版本号',
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
      field: 'published_at',
      title: 'published_at',
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
    fieldName: 'version_id',
    label: '版本 ID',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'app_id',
    label: 'App ID',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'version',
    label: '版本号',
    rules: 'required',
  },
  {
    component: 'Textarea',
    fieldName: 'changelog',
    label: 'changelog',
    componentProps: { rows: 4 },
  },
  {
    component: 'Textarea',
    fieldName: 'manifest_snapshot',
    label: 'Manifest 快照',
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
    fieldName: 'published_at',
    label: 'published_at',
    componentProps: {
      format: 'YYYY-MM-DD HH:mm:ss',
      showTime: true,
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
];
