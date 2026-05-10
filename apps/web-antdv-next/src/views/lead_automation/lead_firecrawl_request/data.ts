import type { VbenFormSchema } from '#/adapter/form';
import type {
  OnActionClickFn,
  VxeGridProps,
} from '#/adapter/vxe-table';
import type { LeadFirecrawlRequest } from '#/api/lead_automation/lead_firecrawl_request';

import { $t } from '@vben/locales';

import { getDictOptions } from '#/utils/dict';

/**
 * Query form schema
 */
export const querySchema: VbenFormSchema[] = [
  {
    component: 'InputNumber',
    fieldName: 'job_id',
    label: 'job_id',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'InputNumber',
    fieldName: 'source_config_id',
    label: 'source_config_id',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'Select',
    fieldName: 'source_type',
    label: 'source_type',
    componentProps: {
      allowClear: true,
      options: getDictOptions('lead_automation_source_type'),
    },
  },
  {
    component: 'Select',
    fieldName: 'response_status',
    label: 'response_status',
    componentProps: {
      allowClear: true,
      options: getDictOptions('lead_automation_response_status'),
    },
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
];

/**
 * Table columns configuration
 */
export function useColumns(
  onActionClick?: OnActionClickFn<LeadFirecrawlRequest>,
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
      field: 'job_id',
      title: 'job_id',
      width: 150,
    },
    {
      field: 'source_config_id',
      title: 'source_config_id',
      width: 150,
    },
    {
      field: 'source_type',
      title: 'source_type',
      width: 150,
      cellRender: {
        name: 'CellTag',
        options: getDictOptions('lead_automation_source_type'),
      },
    },
    {
      field: 'endpoint',
      title: 'endpoint',
      width: 150,
    },
    {
      field: 'target_url',
      title: 'target_url',
      width: 150,
    },
    {
      field: 'query',
      title: 'query',
      width: 150,
    },
    {
      field: 'extract_mode',
      title: 'extract_mode',
      width: 150,
    },
    {
      field: 'llm_schema_version',
      title: 'llm_schema_version',
      width: 150,
    },
    {
      field: 'llm_prompt_version',
      title: 'llm_prompt_version',
      width: 150,
    },
    {
      field: 'response_status',
      title: 'response_status',
      width: 150,
      cellRender: {
        name: 'CellTag',
        options: getDictOptions('lead_automation_response_status'),
      },
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
      field: 'attempt_count',
      title: 'attempt_count',
      width: 150,
    },
    {
      field: 'duration_ms',
      title: 'duration_ms',
      width: 150,
    },
    {
      field: 'result_count',
      title: 'result_count',
      width: 150,
    },
    {
      field: 'response_excerpt',
      title: 'response_excerpt',
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
    component: 'InputNumber',
    fieldName: 'job_id',
    label: 'job_id',
    rules: 'required',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'InputNumber',
    fieldName: 'source_config_id',
    label: 'source_config_id',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'Select',
    fieldName: 'source_type',
    label: 'source_type',
    rules: 'required',
    componentProps: {
      options: getDictOptions('lead_automation_source_type'),
    },
  },
  {
    component: 'Input',
    fieldName: 'endpoint',
    label: 'endpoint',
    rules: 'required',
  },
  {
    component: 'Textarea',
    fieldName: 'target_url',
    label: 'target_url',
    componentProps: {"rows": 4},
  },
  {
    component: 'Textarea',
    fieldName: 'query',
    label: 'query',
    componentProps: {"rows": 4},
  },
  {
    component: 'Textarea',
    fieldName: 'request_payload',
    label: 'request_payload',
    rules: 'required',
    componentProps: {"placeholder": "Enter JSON", "rows": 6},
  },
  {
    component: 'Input',
    fieldName: 'extract_mode',
    label: 'extract_mode',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'llm_schema_version',
    label: 'llm_schema_version',
  },
  {
    component: 'Input',
    fieldName: 'llm_prompt_version',
    label: 'llm_prompt_version',
  },
  {
    component: 'Select',
    fieldName: 'response_status',
    label: 'response_status',
    componentProps: {
      options: getDictOptions('lead_automation_response_status'),
    },
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
    fieldName: 'attempt_count',
    label: 'attempt_count',
    rules: 'required',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'InputNumber',
    fieldName: 'duration_ms',
    label: 'duration_ms',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'InputNumber',
    fieldName: 'result_count',
    label: 'result_count',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'Textarea',
    fieldName: 'error_message',
    label: 'error_message',
    componentProps: {"rows": 4},
  },
  {
    component: 'Textarea',
    fieldName: 'response_excerpt',
    label: 'response_excerpt',
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
