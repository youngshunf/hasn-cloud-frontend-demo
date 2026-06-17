import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeGridProps } from '#/adapter/vxe-table';
import type { AppDataRecords } from '#/api/app_platform/app_data_records';

import { $t } from '@vben/locales';

import { getDictOptions } from '#/utils/dict';

/**
 * Query form schema
 */
export const querySchema: VbenFormSchema[] = [
  {
    component: 'Input',
    fieldName: 'owner_id',
    label: 'Owner ID',
    componentProps: { placeholder: 'Search by Owner ID' },
  },
  {
    component: 'Input',
    fieldName: 'app_id',
    label: 'App ID',
    componentProps: { placeholder: 'Search by App ID' },
  },
  {
    component: 'Input',
    fieldName: 'installation_id',
    label: 'Installation ID',
    componentProps: { placeholder: 'Search by Installation ID' },
  },
  {
    component: 'Select',
    fieldName: 'install_target_type',
    label: '安装目标类型',
    componentProps: {
      allowClear: true,
      options: getDictOptions('app_platform_install_target_type'),
    },
  },
  {
    component: 'Input',
    fieldName: 'install_target_id',
    label: '安装目标 ID',
    componentProps: { placeholder: 'Search by \u5B89\u88C5\u76EE\u6807 ID' },
  },
  {
    component: 'Input',
    fieldName: 'resource_id',
    label: 'Resource ID',
    componentProps: { placeholder: 'Search by Resource ID' },
  },
  {
    component: 'RangePicker',
    fieldName: 'created_at',
    label: '创建时间',
    componentProps: { format: 'YYYY-MM-DD' },
  },
  {
    component: 'RangePicker',
    fieldName: 'updated_at',
    label: '更新时间',
    componentProps: { format: 'YYYY-MM-DD' },
  },
];

/**
 * Table columns configuration
 */
export function useColumns(
  onActionClick?: OnActionClickFn<AppDataRecords>,
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
      field: 'owner_id',
      title: 'Owner ID',
      width: 150,
    },
    {
      field: 'app_id',
      title: 'App ID',
      width: 150,
    },
    {
      field: 'installation_id',
      title: 'Installation ID',
      width: 150,
    },
    {
      field: 'install_target_type',
      title: '安装目标类型',
      width: 150,
      cellRender: {
        name: 'CellTag',
        options: getDictOptions('app_platform_install_target_type'),
      },
    },
    {
      field: 'install_target_id',
      title: '安装目标 ID',
      width: 150,
    },
    {
      field: 'resource_id',
      title: 'Resource ID',
      width: 150,
    },
    {
      field: 'record_key',
      title: '记录键',
      width: 150,
    },
    {
      field: 'created_at',
      title: '创建时间',
      width: 150,
    },
    {
      field: 'updated_at',
      title: '更新时间',
      width: 150,
    },
    {
      field: 'created_by',
      title: '创建者 ID',
      width: 150,
    },
    {
      field: 'updated_by',
      title: '更新者 ID',
      width: 150,
    },
    {
      field: 'version',
      title: '版本号',
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
    fieldName: 'owner_id',
    label: 'Owner ID',
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
    fieldName: 'installation_id',
    label: 'Installation ID',
    rules: 'required',
  },
  {
    component: 'Select',
    fieldName: 'install_target_type',
    label: '安装目标类型',
    componentProps: {
      options: getDictOptions('app_platform_install_target_type'),
    },
  },
  {
    component: 'Input',
    fieldName: 'install_target_id',
    label: '安装目标 ID',
  },
  {
    component: 'Input',
    fieldName: 'resource_id',
    label: 'Resource ID',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'record_key',
    label: '记录键',
    rules: 'required',
  },
  {
    component: 'Textarea',
    fieldName: 'data_json',
    label: '数据 JSON',
    rules: 'required',
    componentProps: { placeholder: 'Enter JSON', rows: 6 },
  },
  {
    component: 'Input',
    fieldName: 'created_by',
    label: '创建者 ID',
  },
  {
    component: 'Input',
    fieldName: 'updated_by',
    label: '更新者 ID',
  },
  {
    component: 'InputNumber',
    fieldName: 'version',
    label: '版本号',
    rules: 'required',
    componentProps: { style: 'width: 100%' },
  },
];
