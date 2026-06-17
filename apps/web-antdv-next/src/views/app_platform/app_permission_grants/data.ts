import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeGridProps } from '#/adapter/vxe-table';
import type { AppPermissionGrants } from '#/api/app_platform/app_permission_grants';

import { $t } from '@vben/locales';

import { getDictOptions } from '#/utils/dict';

/**
 * Query form schema
 */
export const querySchema: VbenFormSchema[] = [
  {
    component: '',
    fieldName: 'grant_id',
    label: '授权记录 ID',
  },
  {
    component: 'Input',
    fieldName: 'installation_id',
    label: '关联的 Installation ID',
    componentProps: {
      placeholder: 'Search by \u5173\u8054\u7684 Installation ID',
    },
  },
  {
    component: 'RangePicker',
    fieldName: 'granted_at',
    label: '授予时间',
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
    fieldName: 'revoked_at',
    label: '撤销时间',
    componentProps: { format: 'YYYY-MM-DD' },
  },
  {
    component: 'RangePicker',
    fieldName: 'last_used_at',
    label: '最后使用时间',
    componentProps: { format: 'YYYY-MM-DD' },
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
  onActionClick?: OnActionClickFn<AppPermissionGrants>,
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
      field: 'grant_id',
      title: '授权记录 ID',
      width: 150,
    },
    {
      field: 'installation_id',
      title: '关联的 Installation ID',
      width: 150,
    },
    {
      field: 'scope',
      title: '授予的权限标识',
      width: 150,
    },
    {
      field: 'granted_by',
      title: '授予者 Owner ID',
      width: 150,
    },
    {
      field: 'granted_at',
      title: '授予时间',
      width: 150,
    },
    {
      field: 'grant_source',
      title: '授予来源',
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
      field: 'revoked_at',
      title: '撤销时间',
      width: 150,
    },
    {
      field: 'revoked_by',
      title: '撤销者',
      width: 150,
    },
    {
      field: 'last_used_at',
      title: '最后使用时间',
      width: 150,
    },
    {
      field: 'usage_count',
      title: '使用次数',
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
    fieldName: 'grant_id',
    label: '授权记录 ID',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'installation_id',
    label: '关联的 Installation ID',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'scope',
    label: '授予的权限标识',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'granted_by',
    label: '授予者 Owner ID',
    rules: 'required',
  },
  {
    component: 'DatePicker',
    fieldName: 'granted_at',
    label: '授予时间',
    rules: 'required',
    componentProps: {
      format: 'YYYY-MM-DD HH:mm:ss',
      showTime: true,
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
  {
    component: 'Input',
    fieldName: 'grant_source',
    label: '授予来源',
    rules: 'required',
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
    fieldName: 'revoked_at',
    label: '撤销时间',
    componentProps: {
      format: 'YYYY-MM-DD HH:mm:ss',
      showTime: true,
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
  {
    component: 'Input',
    fieldName: 'revoked_by',
    label: '撤销者',
  },
  {
    component: 'Textarea',
    fieldName: 'revocation_reason',
    label: '撤销原因',
    componentProps: { rows: 4 },
  },
  {
    component: 'DatePicker',
    fieldName: 'last_used_at',
    label: '最后使用时间',
    componentProps: {
      format: 'YYYY-MM-DD HH:mm:ss',
      showTime: true,
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
  {
    component: 'InputNumber',
    fieldName: 'usage_count',
    label: '使用次数',
    rules: 'required',
    componentProps: { style: 'width: 100%' },
  },
];
