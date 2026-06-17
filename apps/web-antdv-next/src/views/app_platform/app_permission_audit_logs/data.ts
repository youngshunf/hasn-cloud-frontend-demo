import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeGridProps } from '#/adapter/vxe-table';
import type { AppPermissionAuditLogs } from '#/api/app_platform/app_permission_audit_logs';

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
    fieldName: 'installation_id',
    label: 'Installation ID',
    componentProps: { placeholder: 'Search by Installation ID' },
  },
  {
    component: 'Input',
    fieldName: 'app_id',
    label: 'App ID',
    componentProps: { placeholder: 'Search by App ID' },
  },
  {
    component: 'Input',
    fieldName: 'agent_id',
    label: 'Agent ID',
    componentProps: { placeholder: 'Search by Agent ID' },
  },
  {
    component: 'Select',
    fieldName: 'resource_type',
    label: '资源类型',
    componentProps: {
      allowClear: true,
      options: getDictOptions('app_platform_resource_type'),
    },
  },
  {
    component: 'Input',
    fieldName: 'resource_id',
    label: '资源 ID',
    componentProps: { placeholder: 'Search by \u8D44\u6E90 ID' },
  },
  {
    component: 'Input',
    fieldName: 'request_id',
    label: '请求 ID',
    componentProps: { placeholder: 'Search by \u8BF7\u6C42 ID' },
  },
  {
    component: 'RangePicker',
    fieldName: 'created_at',
    label: '创建时间',
    componentProps: { format: 'YYYY-MM-DD' },
  },
];

/**
 * Table columns configuration
 */
export function useColumns(
  onActionClick?: OnActionClickFn<AppPermissionAuditLogs>,
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
      field: 'installation_id',
      title: 'Installation ID',
      width: 150,
    },
    {
      field: 'app_id',
      title: 'App ID',
      width: 150,
    },
    {
      field: 'agent_id',
      title: 'Agent ID',
      width: 150,
    },
    {
      field: 'action',
      title: '操作类型',
      width: 150,
    },
    {
      field: 'scope',
      title: '权限 Scope',
      width: 150,
    },
    {
      field: 'resource_type',
      title: '资源类型',
      width: 150,
      cellRender: {
        name: 'CellTag',
        options: getDictOptions('app_platform_resource_type'),
      },
    },
    {
      field: 'resource_id',
      title: '资源 ID',
      width: 150,
    },
    {
      field: 'result',
      title: '结果',
      width: 150,
    },
    {
      field: 'request_id',
      title: '请求 ID',
      width: 150,
    },
    {
      field: 'ip_address',
      title: 'IP 地址',
      width: 150,
    },
    {
      field: 'created_at',
      title: '创建时间',
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
    fieldName: 'installation_id',
    label: 'Installation ID',
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
    fieldName: 'agent_id',
    label: 'Agent ID',
  },
  {
    component: 'Input',
    fieldName: 'action',
    label: '操作类型',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'scope',
    label: '权限 Scope',
    rules: 'required',
  },
  {
    component: 'Select',
    fieldName: 'resource_type',
    label: '资源类型',
    componentProps: {
      options: getDictOptions('app_platform_resource_type'),
    },
  },
  {
    component: 'Input',
    fieldName: 'resource_id',
    label: '资源 ID',
  },
  {
    component: 'Input',
    fieldName: 'result',
    label: '结果',
    rules: 'required',
  },
  {
    component: 'Textarea',
    fieldName: 'error_message',
    label: '错误信息',
    componentProps: { rows: 4 },
  },
  {
    component: 'Textarea',
    fieldName: 'details',
    label: '详细信息',
    componentProps: { placeholder: 'Enter JSON', rows: 6 },
  },
  {
    component: 'Input',
    fieldName: 'request_id',
    label: '请求 ID',
  },
  {
    component: 'Textarea',
    fieldName: 'user_agent',
    label: 'User Agent',
    componentProps: { rows: 4 },
  },
  {
    component: 'Input',
    fieldName: 'ip_address',
    label: 'IP 地址',
  },
];
