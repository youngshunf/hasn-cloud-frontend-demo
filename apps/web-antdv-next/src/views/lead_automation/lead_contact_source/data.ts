import type { VbenFormSchema } from '#/adapter/form';
import type {
  OnActionClickFn,
  VxeGridProps,
} from '#/adapter/vxe-table';
import type { LeadContactSource } from '#/api/lead_automation/lead_contact_source';

import { $t } from '@vben/locales';

import { getDictOptions } from '#/utils/dict';

/**
 * Query form schema
 */
export const querySchema: VbenFormSchema[] = [
  {
    component: 'InputNumber',
    fieldName: 'lead_contact_id',
    label: 'lead_contact_id',
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
    component: 'RangePicker',
    fieldName: 'seen_at',
    label: 'seen_at',
    componentProps: {"format": "YYYY-MM-DD"},
  },
];

/**
 * Table columns configuration
 */
export function useColumns(
  onActionClick?: OnActionClickFn<LeadContactSource>,
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
      field: 'lead_contact_id',
      title: 'lead_contact_id',
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
      field: 'match_dimension',
      title: 'match_dimension',
      width: 150,
    },
    {
      field: 'seen_at',
      title: 'seen_at',
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
    fieldName: 'lead_contact_id',
    label: 'lead_contact_id',
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
    fieldName: 'match_dimension',
    label: 'match_dimension',
    rules: 'required',
  },
  {
    component: 'DatePicker',
    fieldName: 'seen_at',
    label: 'seen_at',
    rules: 'required',
    componentProps: {"format": "YYYY-MM-DD HH:mm:ss", "showTime": true, "valueFormat": "YYYY-MM-DD HH:mm:ss"},
  },
  {
    component: 'Textarea',
    fieldName: 'metadata',
    label: 'metadata',
    rules: 'required',
    componentProps: {"placeholder": "Enter JSON", "rows": 6},
  },
];
