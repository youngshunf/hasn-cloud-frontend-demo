import type { VbenFormSchema } from '#/adapter/form';
import type {
  OnActionClickFn,
  VxeGridProps,
} from '#/adapter/vxe-table';
import type { LeadCollectionJob } from '#/api/lead_automation/lead_collection_job';

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
    component: 'InputNumber',
    fieldName: 'valid_count',
    label: 'valid_count',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'InputNumber',
    fieldName: 'invalid_count',
    label: 'invalid_count',
    componentProps: {"style": "width: 100%"},
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
  onActionClick?: OnActionClickFn<LeadCollectionJob>,
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
      field: 'job_no',
      title: 'job_no',
      width: 150,
    },
    {
      field: 'keyword',
      title: 'keyword',
      width: 150,
    },
    {
      field: 'lead_scope',
      title: 'lead_scope',
      width: 150,
    },
    {
      field: 'user_id',
      title: 'user_id',
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
      field: 'max_pages',
      title: 'max_pages',
      width: 150,
    },
    {
      field: 'max_results',
      title: 'max_results',
      width: 150,
    },
    {
      field: 'total_found',
      title: 'total_found',
      width: 150,
    },
    {
      field: 'raw_count',
      title: 'raw_count',
      width: 150,
    },
    {
      field: 'valid_count',
      title: 'valid_count',
      width: 150,
    },
    {
      field: 'invalid_count',
      title: 'invalid_count',
      width: 150,
    },
    {
      field: 'duplicate_count',
      title: 'duplicate_count',
      width: 150,
    },
    {
      field: 'firecrawl_success_count',
      title: 'firecrawl_success_count',
      width: 150,
    },
    {
      field: 'firecrawl_failed_count',
      title: 'firecrawl_failed_count',
      width: 150,
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
    fieldName: 'job_no',
    label: 'job_no',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'keyword',
    label: 'keyword',
    rules: 'required',
  },
  {
    component: 'Select',
    fieldName: 'source_types',
    label: 'source_types',
    rules: 'required',
    componentProps: {
      options: getDictOptions('lead_automation_source_types'),
    },
  },
  {
    component: 'Input',
    fieldName: 'lead_scope',
    label: 'lead_scope',
    rules: 'required',
  },
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
    rules: 'required',
    componentProps: {
      options: getDictOptions('lead_automation_status'),
    },
  },
  {
    component: 'InputNumber',
    fieldName: 'max_pages',
    label: 'max_pages',
    rules: 'required',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'InputNumber',
    fieldName: 'max_results',
    label: 'max_results',
    rules: 'required',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'Textarea',
    fieldName: 'request_config',
    label: 'request_config',
    rules: 'required',
    componentProps: {"placeholder": "Enter JSON", "rows": 6},
  },
  {
    component: 'InputNumber',
    fieldName: 'total_found',
    label: 'total_found',
    rules: 'required',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'InputNumber',
    fieldName: 'raw_count',
    label: 'raw_count',
    rules: 'required',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'InputNumber',
    fieldName: 'valid_count',
    label: 'valid_count',
    rules: 'required',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'InputNumber',
    fieldName: 'invalid_count',
    label: 'invalid_count',
    rules: 'required',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'InputNumber',
    fieldName: 'duplicate_count',
    label: 'duplicate_count',
    rules: 'required',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'InputNumber',
    fieldName: 'firecrawl_success_count',
    label: 'firecrawl_success_count',
    rules: 'required',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'InputNumber',
    fieldName: 'firecrawl_failed_count',
    label: 'firecrawl_failed_count',
    rules: 'required',
    componentProps: {"style": "width: 100%"},
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
  {
    component: 'Textarea',
    fieldName: 'error_message',
    label: 'error_message',
    componentProps: {"rows": 4},
  },
  {
    component: 'Textarea',
    fieldName: 'metadata',
    label: 'metadata',
    rules: 'required',
    componentProps: {"placeholder": "Enter JSON", "rows": 6},
  },
];
