import type { VbenFormSchema } from '#/adapter/form';
import type {
  OnActionClickFn,
  VxeGridProps,
} from '#/adapter/vxe-table';
import type { LeadExportBatch } from '#/api/lead_automation/lead_export_batch';

import { $t } from '@vben/locales';

import { getDictOptions } from '#/utils/dict';

/**
 * Query form schema
 */
export const querySchema: VbenFormSchema[] = [
  {
    component: 'InputNumber',
    fieldName: 'user_id',
    label: 'user_id',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'Select',
    fieldName: 'status',
    label: 'status',
    componentProps: {
      allowClear: true,
      options: getDictOptions('lead_automation_status'),
    },
  },
  {
    component: 'RangePicker',
    fieldName: 'started_at',
    label: 'started_at',
    componentProps: {"format": "YYYY-MM-DD"},
  },
  {
    component: 'RangePicker',
    fieldName: 'finished_at',
    label: 'finished_at',
    componentProps: {"format": "YYYY-MM-DD"},
  },
];

/**
 * Table columns configuration
 */
export function useColumns(
  onActionClick?: OnActionClickFn<LeadExportBatch>,
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
      field: 'batch_no',
      title: 'batch_no',
      width: 150,
    },
    {
      field: 'user_id',
      title: 'user_id',
      width: 150,
    },
    {
      field: 'lead_scope',
      title: 'lead_scope',
      width: 150,
    },
    {
      field: 'format',
      title: 'format',
      width: 150,
    },
    {
      field: 'total_count',
      title: 'total_count',
      width: 150,
    },
    {
      field: 'file_path',
      title: 'file_path',
      width: 150,
    },
    {
      field: 'file_sha256',
      title: 'file_sha256',
      width: 150,
    },
    {
      field: 'status',
      title: 'status',
      width: 150,
      cellRender: {
        name: 'CellTag',
        options: getDictOptions('lead_automation_status'),
      },
    },
    {
      field: 'started_at',
      title: 'started_at',
      width: 150,
    },
    {
      field: 'finished_at',
      title: 'finished_at',
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
    fieldName: 'batch_no',
    label: 'batch_no',
    rules: 'required',
  },
  {
    component: 'InputNumber',
    fieldName: 'user_id',
    label: 'user_id',
    rules: 'required',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'Input',
    fieldName: 'lead_scope',
    label: 'lead_scope',
    rules: 'required',
  },
  {
    component: 'Textarea',
    fieldName: 'filter_payload',
    label: 'filter_payload',
    rules: 'required',
    componentProps: {"placeholder": "Enter JSON", "rows": 6},
  },
  {
    component: 'Input',
    fieldName: 'format',
    label: 'format',
    rules: 'required',
  },
  {
    component: 'InputNumber',
    fieldName: 'total_count',
    label: 'total_count',
    rules: 'required',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'Textarea',
    fieldName: 'file_path',
    label: 'file_path',
    componentProps: {"rows": 4},
  },
  {
    component: 'Input',
    fieldName: 'file_sha256',
    label: 'file_sha256',
  },
  {
    component: 'Select',
    fieldName: 'status',
    label: 'status',
    rules: 'required',
    componentProps: {
      options: getDictOptions('lead_automation_status'),
    },
  },
  {
    component: 'Textarea',
    fieldName: 'error_message',
    label: 'error_message',
    componentProps: {"rows": 4},
  },
  {
    component: 'DatePicker',
    fieldName: 'started_at',
    label: 'started_at',
    componentProps: {"format": "YYYY-MM-DD HH:mm:ss", "showTime": true, "valueFormat": "YYYY-MM-DD HH:mm:ss"},
  },
  {
    component: 'DatePicker',
    fieldName: 'finished_at',
    label: 'finished_at',
    componentProps: {"format": "YYYY-MM-DD HH:mm:ss", "showTime": true, "valueFormat": "YYYY-MM-DD HH:mm:ss"},
  },
];
