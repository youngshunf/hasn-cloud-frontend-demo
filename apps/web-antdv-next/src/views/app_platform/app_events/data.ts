import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeGridProps } from '#/adapter/vxe-table';
import type { AppEvents } from '#/api/app_platform/app_events';

import { $t } from '@vben/locales';

import { getDictOptions } from '#/utils/dict';

/**
 * Query form schema
 */
export const querySchema: VbenFormSchema[] = [
  {
    component: '',
    fieldName: 'event_id',
    label: 'Event ID',
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
    component: 'Select',
    fieldName: 'event_type',
    label: 'event_type',
    componentProps: {
      allowClear: true,
      options: getDictOptions('app_platform_event_type'),
    },
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
  onActionClick?: OnActionClickFn<AppEvents>,
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
      field: 'event_id',
      title: 'Event ID',
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
      field: 'event_type',
      title: 'event_type',
      width: 150,
      cellRender: {
        name: 'CellTag',
        options: getDictOptions('app_platform_event_type'),
      },
    },
    {
      field: 'display_name',
      title: 'display_name',
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
    fieldName: 'event_id',
    label: 'Event ID',
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
    component: 'Select',
    fieldName: 'event_type',
    label: 'event_type',
    rules: 'required',
    componentProps: {
      options: getDictOptions('app_platform_event_type'),
    },
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
    fieldName: 'payload_schema',
    label: 'payload_schema',
    rules: 'required',
    componentProps: { placeholder: 'Enter JSON', rows: 6 },
  },
];
