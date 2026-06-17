import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeGridProps } from '#/adapter/vxe-table';
import type { MarketplaceSyncLog } from '#/api/marketplace/marketplace_sync_log';

import { $t } from '@vben/locales';

import { getDictOptions } from '#/utils/dict';

/**
 * Query form schema
 */
export const querySchema: VbenFormSchema[] = [
  {
    component: 'Select',
    fieldName: 'sync_type',
    label: '同步类型',
    componentProps: {
      allowClear: true,
      options: getDictOptions('marketplace_sync_type'),
    },
  },
  {
    component: 'Select',
    fieldName: 'status',
    label: '同步状态',
    componentProps: {
      allowClear: true,
      options: getDictOptions('marketplace_status'),
    },
  },
  {
    component: 'RangePicker',
    fieldName: 'started_at',
    label: '开始时间',
    componentProps: { format: 'YYYY-MM-DD' },
  },
  {
    component: 'RangePicker',
    fieldName: 'completed_at',
    label: '完成时间',
    componentProps: { format: 'YYYY-MM-DD' },
  },
];

/**
 * Table columns configuration
 */
export function useColumns(
  onActionClick?: OnActionClickFn<MarketplaceSyncLog>,
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
      field: 'sync_type',
      title: '同步类型',
      width: 150,
      cellRender: {
        name: 'CellTag',
        options: getDictOptions('marketplace_sync_type'),
      },
    },
    {
      field: 'status',
      title: '同步状态',
      width: 150,
      cellRender: {
        name: 'CellTag',
        options: getDictOptions('marketplace_status'),
      },
    },
    {
      field: 'items_synced',
      title: '成功同步数量',
      width: 150,
    },
    {
      field: 'items_failed',
      title: '失败数量',
      width: 150,
    },
    {
      field: 'git_commit_before',
      title: '同步前的 commit hash',
      width: 150,
    },
    {
      field: 'git_commit_after',
      title: '同步后的 commit hash',
      width: 150,
    },
    {
      field: 'started_at',
      title: '开始时间',
      width: 150,
    },
    {
      field: 'completed_at',
      title: '完成时间',
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
    component: 'Select',
    fieldName: 'sync_type',
    label: '同步类型',
    rules: 'required',
    componentProps: {
      options: getDictOptions('marketplace_sync_type'),
    },
  },
  {
    component: 'Select',
    fieldName: 'status',
    label: '同步状态',
    rules: 'required',
    componentProps: {
      options: getDictOptions('marketplace_status'),
    },
  },
  {
    component: 'InputNumber',
    fieldName: 'items_synced',
    label: '成功同步数量',
    componentProps: { style: 'width: 100%' },
  },
  {
    component: 'InputNumber',
    fieldName: 'items_failed',
    label: '失败数量',
    componentProps: { style: 'width: 100%' },
  },
  {
    component: 'Textarea',
    fieldName: 'error_message',
    label: '错误信息',
    componentProps: { rows: 4 },
  },
  {
    component: 'Input',
    fieldName: 'git_commit_before',
    label: '同步前的 commit hash',
  },
  {
    component: 'Input',
    fieldName: 'git_commit_after',
    label: '同步后的 commit hash',
  },
  {
    component: 'DatePicker',
    fieldName: 'started_at',
    label: '开始时间',
    rules: 'required',
    componentProps: {
      format: 'YYYY-MM-DD HH:mm:ss',
      showTime: true,
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
  {
    component: 'DatePicker',
    fieldName: 'completed_at',
    label: '完成时间',
    componentProps: {
      format: 'YYYY-MM-DD HH:mm:ss',
      showTime: true,
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
];
