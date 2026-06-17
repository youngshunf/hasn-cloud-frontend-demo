import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeGridProps } from '#/adapter/vxe-table';
import type { HotTopic } from '#/api/hasn_creator/hot_topic';

import { $t } from '@vben/locales';

/**
 * Query form schema
 */
export const querySchema: VbenFormSchema[] = [
  {
    component: 'Input',
    fieldName: 'platform_id',
    label: 'platform_id',
    componentProps: { placeholder: 'Search by platform_id' },
  },
  {
    component: 'Input',
    fieldName: 'platform_name',
    label: 'platform_name',
    componentProps: { placeholder: 'Search by platform_name' },
  },
  {
    component: 'Input',
    fieldName: 'title',
    label: 'title',
    componentProps: { placeholder: 'Search by title' },
  },
  {
    component: 'RangePicker',
    fieldName: 'fetched_at',
    label: 'fetched_at',
    componentProps: { format: 'YYYY-MM-DD' },
  },
];

/**
 * Table columns configuration
 */
export function useColumns(
  onActionClick?: OnActionClickFn<HotTopic>,
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
      field: 'platform_id',
      title: 'platform_id',
      width: 150,
    },
    {
      field: 'platform_name',
      title: 'platform_name',
      width: 150,
    },
    {
      field: 'title',
      title: 'title',
      width: 150,
    },
    {
      field: 'rank',
      title: 'rank',
      width: 150,
    },
    {
      field: 'heat_score',
      title: 'heat_score',
      width: 150,
    },
    {
      field: 'fetch_source',
      title: 'fetch_source',
      width: 150,
    },
    {
      field: 'fetched_at',
      title: 'fetched_at',
      width: 150,
    },
    {
      field: 'batch_date',
      title: '批次',
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
    fieldName: 'platform_id',
    label: 'platform_id',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'platform_name',
    label: 'platform_name',
  },
  {
    component: 'Textarea',
    fieldName: 'title',
    label: 'title',
    rules: 'required',
    componentProps: { rows: 4 },
  },
  {
    component: 'Textarea',
    fieldName: 'url',
    label: 'url',
    componentProps: { rows: 4 },
  },
  {
    component: 'InputNumber',
    fieldName: 'rank',
    label: 'rank',
    rules: 'required',
    componentProps: { style: 'width: 100%' },
  },
  {
    component: 'InputNumber',
    fieldName: 'heat_score',
    label: 'heat_score',
    rules: 'required',
    componentProps: { style: 'width: 100%' },
  },
  {
    component: 'Input',
    fieldName: 'fetch_source',
    label: 'fetch_source',
  },
  {
    component: 'DatePicker',
    fieldName: 'fetched_at',
    label: 'fetched_at',
    componentProps: {
      format: 'YYYY-MM-DD HH:mm:ss',
      showTime: true,
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
  {
    component: 'Input',
    fieldName: 'batch_date',
    label: '批次',
    rules: 'required',
  },
];
