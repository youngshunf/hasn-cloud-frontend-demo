import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeGridProps } from '#/adapter/vxe-table';
import type { PlatformScopes } from '#/api/app_platform/platform_scopes';

import { $t } from '@vben/locales';

import { getDictOptions } from '#/utils/dict';

/**
 * Query form schema
 */
export const querySchema: VbenFormSchema[] = [
  {
    component: 'Input',
    fieldName: 'display_name',
    label: '权限显示名称',
    componentProps: {
      placeholder: 'Search by \u6743\u9650\u663E\u793A\u540D\u79F0',
    },
  },
  {
    component: 'Select',
    fieldName: 'category',
    label: '权限分类',
    componentProps: {
      allowClear: true,
      options: getDictOptions('app_platform_category'),
    },
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
  onActionClick?: OnActionClickFn<PlatformScopes>,
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
      field: 'scope',
      title: '权限标识，格式',
      width: 150,
    },
    {
      field: 'display_name',
      title: '权限显示名称',
      width: 150,
    },
    {
      field: 'category',
      title: '权限分类',
      width: 150,
      cellRender: {
        name: 'CellTag',
        options: getDictOptions('app_platform_category'),
      },
    },
    {
      field: 'risk_level',
      title: '风险等级',
      width: 150,
      cellRender: {
        name: 'CellTag',
        options: getDictOptions('app_platform_risk_level'),
      },
    },
    {
      field: 'requires_owner_confirmation',
      title: '是否需要 Owner 二次确认',
      width: 150,
    },
    {
      field: 'rate_limit_per_minute',
      title: '每分钟限流次数',
      width: 150,
    },
    {
      field: 'rate_limit_per_hour',
      title: '每小时限流次数',
      width: 150,
    },
    {
      field: 'rate_limit_per_day',
      title: '每天限流次数',
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
    fieldName: 'scope',
    label: '权限标识，格式',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'display_name',
    label: '权限显示名称',
    rules: 'required',
  },
  {
    component: 'Textarea',
    fieldName: 'description',
    label: '权限描述',
    rules: 'required',
    componentProps: { rows: 4 },
  },
  {
    component: 'Textarea',
    fieldName: 'reason',
    label: '为什么需要这个权限',
    componentProps: { rows: 4 },
  },
  {
    component: 'Select',
    fieldName: 'category',
    label: '权限分类',
    rules: 'required',
    componentProps: {
      options: getDictOptions('app_platform_category'),
    },
  },
  {
    component: 'Select',
    fieldName: 'risk_level',
    label: '风险等级',
    rules: 'required',
    componentProps: {
      options: getDictOptions('app_platform_risk_level'),
    },
  },
  {
    component: 'Switch',
    fieldName: 'requires_owner_confirmation',
    label: '是否需要 Owner 二次确认',
  },
  {
    component: 'InputNumber',
    fieldName: 'rate_limit_per_minute',
    label: '每分钟限流次数',
    componentProps: { style: 'width: 100%' },
  },
  {
    component: 'InputNumber',
    fieldName: 'rate_limit_per_hour',
    label: '每小时限流次数',
    componentProps: { style: 'width: 100%' },
  },
  {
    component: 'InputNumber',
    fieldName: 'rate_limit_per_day',
    label: '每天限流次数',
    componentProps: { style: 'width: 100%' },
  },
];
