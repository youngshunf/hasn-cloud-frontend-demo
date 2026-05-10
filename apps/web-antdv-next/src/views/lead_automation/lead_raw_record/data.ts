import type { VbenFormSchema } from '#/adapter/form';
import type {
  OnActionClickFn,
  VxeGridProps,
} from '#/adapter/vxe-table';
import type { LeadRawRecord } from '#/api/lead_automation/lead_raw_record';

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
    component: 'InputNumber',
    fieldName: 'firecrawl_request_id',
    label: 'firecrawl_request_id',
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
    component: 'Input',
    fieldName: 'title',
    label: 'title',
    componentProps: {"placeholder": "Search by title"},
  },
  {
    component: '',
    fieldName: 'llm_confidence',
    label: 'llm_confidence',
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
  onActionClick?: OnActionClickFn<LeadRawRecord>,
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
      field: 'firecrawl_request_id',
      title: 'firecrawl_request_id',
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
      field: 'source_url',
      title: 'source_url',
      width: 150,
    },
    {
      field: 'domain',
      title: 'domain',
      width: 150,
    },
    {
      field: 'title',
      title: 'title',
      width: 150,
    },
    {
      field: 'llm_confidence',
      title: 'llm_confidence',
      width: 150,
    },
    {
      field: 'system_score',
      title: 'system_score',
      width: 150,
    },
    {
      field: 'content_hash',
      title: 'content_hash',
      width: 150,
    },
    {
      field: 'normalization_version',
      title: 'normalization_version',
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
    component: 'InputNumber',
    fieldName: 'firecrawl_request_id',
    label: 'firecrawl_request_id',
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
    component: 'Textarea',
    fieldName: 'source_url',
    label: 'source_url',
    componentProps: {"rows": 4},
  },
  {
    component: 'Input',
    fieldName: 'domain',
    label: 'domain',
  },
  {
    component: 'Textarea',
    fieldName: 'title',
    label: 'title',
    componentProps: {"rows": 4},
  },
  {
    component: 'Textarea',
    fieldName: 'markdown',
    label: 'markdown',
    componentProps: {"rows": 4},
  },
  {
    component: 'Textarea',
    fieldName: 'raw_text',
    label: 'raw_text',
    componentProps: {"rows": 4},
  },
  {
    component: 'Textarea',
    fieldName: 'raw_html',
    label: 'raw_html',
    componentProps: {"rows": 4},
  },
  {
    component: 'Textarea',
    fieldName: 'raw_payload',
    label: 'raw_payload',
    componentProps: {"placeholder": "Enter JSON", "rows": 6},
  },
  {
    component: 'Textarea',
    fieldName: 'structured_payload',
    label: 'structured_payload',
    componentProps: {"placeholder": "Enter JSON", "rows": 6},
  },
  {
    component: 'InputNumber',
    fieldName: 'llm_confidence',
    label: 'llm_confidence',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'InputNumber',
    fieldName: 'system_score',
    label: 'system_score',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'Input',
    fieldName: 'content_hash',
    label: 'content_hash',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'normalization_version',
    label: 'normalization_version',
    rules: 'required',
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
    component: 'Textarea',
    fieldName: 'metadata',
    label: 'metadata',
    rules: 'required',
    componentProps: {"placeholder": "Enter JSON", "rows": 6},
  },
];
