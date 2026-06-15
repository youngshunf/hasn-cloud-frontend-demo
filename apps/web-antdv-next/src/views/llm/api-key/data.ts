/**
 * API Key管理页面数据配置
 * @author Ysf
 */
import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeGridProps } from '#/adapter/vxe-table';
import type { LlmApiKeyResult } from '#/api';

import { $t } from '@vben/locales';

export const API_KEY_STATUS = [
  { label: '活跃', value: 'active', color: 'green' },
  { label: '已禁用', value: 'disabled', color: 'red' },
  { label: '已过期', value: 'expired', color: 'orange' },
];

export const querySchema: VbenFormSchema[] = [
  {
    component: 'Input',
    fieldName: 'user_keyword',
    label: '用户搜索',
    componentProps: { placeholder: '昵称/手机号' },
  },
  {
    component: 'Input',
    fieldName: 'name',
    label: 'Key 名称',
  },
  {
    component: 'Select',
    fieldName: 'status',
    label: '状态',
    componentProps: {
      allowClear: true,
      options: [
        { label: '活跃', value: 'ACTIVE' },
        { label: '已禁用', value: 'DISABLED' },
        { label: '已过期', value: 'EXPIRED' },
        { label: '已吊销', value: 'REVOKED' },
      ],
    },
  },
];

export function useColumns(
  onActionClick?: OnActionClickFn<LlmApiKeyResult>,
): VxeGridProps['columns'] {
  return [
    { field: 'seq', title: '#', type: 'seq', width: 50 },
    { field: 'name', title: '名称', width: 150 },
    { field: 'user_nickname', title: '用户昵称', width: 120 },
    { field: 'user_phone', title: '手机号', width: 130 },
    { field: 'key_prefix', title: 'Key 前缀', width: 120 },
    {
      field: 'status',
      title: '状态',
      width: 80,
      cellRender: {
        name: 'CellTag',
        options: API_KEY_STATUS,
      },
    },
    {
      field: 'expires_at',
      title: '过期时间',
      width: 160,
      formatter({ cellValue }) {
        return cellValue || '永不过期';
      },
    },
    {
      field: 'custom_daily_tokens',
      title: '日 Token 限制',
      width: 110,
      formatter({ cellValue }) {
        return cellValue?.toLocaleString() || '默认';
      },
    },
    {
      field: 'custom_monthly_tokens',
      title: '月 Token 限制',
      width: 110,
      formatter({ cellValue }) {
        return cellValue?.toLocaleString() || '默认';
      },
    },
    {
      field: 'last_used_at',
      title: '最后使用',
      width: 160,
      formatter({ cellValue }) {
        return cellValue || '从未使用';
      },
    },
    { field: 'created_time', title: '创建时间', width: 160 },
    {
      field: 'operation',
      title: $t('common.table.operation'),
      align: 'center',
      fixed: 'right',
      width: 200,
      cellRender: {
        attrs: {
          nameField: 'name',
          onClick: onActionClick,
        },
        name: 'CellOperation',
        options: [
          { code: 'copy', text: '复制Key' },
          'edit',
          'delete',
        ],
      },
    },
  ];
}

export function useFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'UserSelect',
      fieldName: 'user_id',
      label: '用户',
      rules: 'required',
      componentProps: {
        placeholder: '搜索用户（昵称/手机号）',
      },
    },
    {
      component: 'Input',
      fieldName: 'name',
      label: '名称',
      rules: 'required',
      componentProps: {
        placeholder: '用于标识此 API Key 的名称',
      },
    },
    {
      component: 'DatePicker',
      fieldName: 'expires_at',
      label: '过期时间',
      componentProps: {
        showTime: true,
        format: 'YYYY-MM-DD HH:mm:ss',
        class: 'w-full',
        placeholder: '留空表示永不过期',
      },
    },
    {
      component: 'InputNumber',
      fieldName: 'custom_daily_tokens',
      label: '自定义日 Token',
      componentProps: { min: 0, class: 'w-full', placeholder: '留空使用默认' },
    },
    {
      component: 'InputNumber',
      fieldName: 'custom_monthly_tokens',
      label: '自定义月 Token',
      componentProps: { min: 0, class: 'w-full', placeholder: '留空使用默认' },
    },
    {
      component: 'InputNumber',
      fieldName: 'custom_rpm_limit',
      label: '自定义 RPM',
      componentProps: { min: 1, class: 'w-full', placeholder: '留空使用默认' },
    },
  ];
}

export function useEditFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'name',
      label: '名称',
      rules: 'required',
    },
    {
      component: 'Select',
      fieldName: 'status',
      label: '状态',
      componentProps: {
        options: API_KEY_STATUS.map((s) => ({ label: s.label, value: s.value })),
        class: 'w-full',
      },
    },
    {
      component: 'DatePicker',
      fieldName: 'expires_at',
      label: '过期时间',
      componentProps: {
        showTime: true,
        format: 'YYYY-MM-DD HH:mm:ss',
        class: 'w-full',
        placeholder: '留空表示永不过期',
      },
    },
    {
      component: 'InputNumber',
      fieldName: 'custom_daily_tokens',
      label: '自定义日 Token',
      componentProps: { min: 0, class: 'w-full' },
    },
    {
      component: 'InputNumber',
      fieldName: 'custom_monthly_tokens',
      label: '自定义月 Token',
      componentProps: { min: 0, class: 'w-full' },
    },
    {
      component: 'InputNumber',
      fieldName: 'custom_rpm_limit',
      label: '自定义 RPM',
      componentProps: { min: 1, class: 'w-full' },
    },
  ];
}
