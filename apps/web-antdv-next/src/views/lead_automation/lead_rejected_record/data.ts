import type { VbenFormSchema } from '#/adapter/form';
import type {
  OnActionClickFn,
  VxeGridProps,
} from '#/adapter/vxe-table';
import type { LeadRejectedRecord } from '#/api/lead_automation/lead_rejected_record';

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
    fieldName: 'raw_record_id',
    label: 'raw_record_id',
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
    fieldName: 'email',
    label: 'email',
    componentProps: {"placeholder": "Search by email"},
  },
  {
    component: 'InputNumber',
    fieldName: 'duplicate_contact_id',
    label: 'duplicate_contact_id',
    componentProps: {"style": "width: 100%"},
  },
];

/**
 * Table columns configuration
 */
export function useColumns(
  onActionClick?: OnActionClickFn<LeadRejectedRecord>,
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
      field: 'raw_record_id',
      title: 'raw_record_id',
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
      field: 'reason',
      title: 'reason',
      width: 150,
    },
    {
      field: 'email',
      title: 'email',
      width: 150,
    },
    {
      field: 'phone',
      title: 'phone',
      width: 150,
    },
    {
      field: 'raw_excerpt',
      title: 'raw_excerpt',
      width: 150,
    },
    {
      field: 'duplicate_contact_id',
      title: 'duplicate_contact_id',
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
    fieldName: 'raw_record_id',
    label: 'raw_record_id',
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
    fieldName: 'reason',
    label: 'reason',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'email',
    label: 'email',
  },
  {
    component: 'Input',
    fieldName: 'phone',
    label: 'phone',
  },
  {
    component: 'Textarea',
    fieldName: 'raw_excerpt',
    label: 'raw_excerpt',
    componentProps: {"rows": 4},
  },
  {
    component: 'InputNumber',
    fieldName: 'duplicate_contact_id',
    label: 'duplicate_contact_id',
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
    fieldName: 'metadata',
    label: 'metadata',
    rules: 'required',
    componentProps: {"placeholder": "Enter JSON", "rows": 6},
  },
];
