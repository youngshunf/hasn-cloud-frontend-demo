import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeGridProps } from '#/adapter/vxe-table';
import type { AppDynamicPermissionRequests } from '#/api/app_platform/app_dynamic_permission_requests';

import { $t } from '@vben/locales';

import { getDictOptions } from '#/utils/dict';

/**
 * Query form schema
 */
export const querySchema: VbenFormSchema[] = [
  {
    component: '',
    fieldName: 'request_id',
    label: '请求 ID',
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
    fieldName: 'requested_at',
    label: '请求时间',
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
    fieldName: 'decided_at',
    label: '决策时间',
    componentProps: { format: 'YYYY-MM-DD' },
  },
  {
    component: 'Input',
    fieldName: 'decided_by',
    label: '决策者 Owner ID',
    componentProps: { placeholder: 'Search by \u51B3\u7B56\u8005 Owner ID' },
  },
  {
    component: 'RangePicker',
    fieldName: 'expires_at',
    label: '请求过期时间',
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
  onActionClick?: OnActionClickFn<AppDynamicPermissionRequests>,
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
      field: 'request_id',
      title: '请求 ID',
      width: 150,
    },
    {
      field: 'installation_id',
      title: '关联的 Installation ID',
      width: 150,
    },
    {
      field: 'scope',
      title: '请求的权限标识',
      width: 150,
    },
    {
      field: 'requested_at',
      title: '请求时间',
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
      field: 'decided_at',
      title: '决策时间',
      width: 150,
    },
    {
      field: 'decided_by',
      title: '决策者 Owner ID',
      width: 150,
    },
    {
      field: 'expires_at',
      title: '请求过期时间',
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
    fieldName: 'request_id',
    label: '请求 ID',
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
    label: '请求的权限标识',
    rules: 'required',
  },
  {
    component: 'DatePicker',
    fieldName: 'requested_at',
    label: '请求时间',
    rules: 'required',
    componentProps: {
      format: 'YYYY-MM-DD HH:mm:ss',
      showTime: true,
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
  {
    component: 'Textarea',
    fieldName: 'request_reason',
    label: 'App 说明为什么需要这个权限',
    rules: 'required',
    componentProps: { rows: 4 },
  },
  {
    component: 'Textarea',
    fieldName: 'request_context',
    label: '请求时的上下文信息',
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
    fieldName: 'decided_at',
    label: '决策时间',
    componentProps: {
      format: 'YYYY-MM-DD HH:mm:ss',
      showTime: true,
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
  {
    component: 'Input',
    fieldName: 'decided_by',
    label: '决策者 Owner ID',
  },
  {
    component: 'Textarea',
    fieldName: 'decision_reason',
    label: '决策理由',
    componentProps: { rows: 4 },
  },
  {
    component: 'DatePicker',
    fieldName: 'expires_at',
    label: '请求过期时间',
    rules: 'required',
    componentProps: {
      format: 'YYYY-MM-DD HH:mm:ss',
      showTime: true,
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
];
