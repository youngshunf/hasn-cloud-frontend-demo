import type { VbenFormSchema } from '#/adapter/form';
import type {
  OnActionClickFn,
  VxeGridProps,
} from '#/adapter/vxe-table';
import type { LeadContact } from '#/api/lead_automation/lead_contact';

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
    component: 'Input',
    fieldName: 'company_name',
    label: 'company_name',
    componentProps: {"placeholder": "Search by company_name"},
  },
  {
    component: 'Input',
    fieldName: 'contact_name',
    label: 'contact_name',
    componentProps: {"placeholder": "Search by contact_name"},
  },
  {
    component: 'Input',
    fieldName: 'email',
    label: 'email',
    componentProps: {"placeholder": "Search by email"},
  },
  {
    component: 'Input',
    fieldName: 'email_normalized',
    label: 'email_normalized',
    componentProps: {"placeholder": "Search by email_normalized"},
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
    fieldName: 'status',
    label: 'status',
    componentProps: {
      allowClear: true,
      options: getDictOptions('lead_automation_status'),
    },
  },
  {
    component: '',
    fieldName: 'confidence_score',
    label: 'confidence_score',
  },
  {
    component: 'Input',
    fieldName: 'dedupe_key_email',
    label: 'dedupe_key_email',
    componentProps: {"placeholder": "Search by dedupe_key_email"},
  },
  {
    component: 'RangePicker',
    fieldName: 'first_seen_at',
    label: 'first_seen_at',
    componentProps: {"format": "YYYY-MM-DD"},
  },
  {
    component: 'RangePicker',
    fieldName: 'last_seen_at',
    label: 'last_seen_at',
    componentProps: {"format": "YYYY-MM-DD"},
  },
  {
    component: 'RangePicker',
    fieldName: 'last_exported_at',
    label: 'last_exported_at',
    componentProps: {"format": "YYYY-MM-DD"},
  },
  {
    component: 'RangePicker',
    fieldName: 'archived_at',
    label: 'archived_at',
    componentProps: {"format": "YYYY-MM-DD"},
  },
];

/**
 * Table columns configuration
 */
export function useColumns(
  onActionClick?: OnActionClickFn<LeadContact>,
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
      field: 'lead_no',
      title: 'lead_no',
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
      field: 'company_name',
      title: 'company_name',
      width: 150,
    },
    {
      field: 'contact_name',
      title: 'contact_name',
      width: 150,
    },
    {
      field: 'email',
      title: 'email',
      width: 150,
    },
    {
      field: 'email_normalized',
      title: 'email_normalized',
      width: 150,
    },
    {
      field: 'phone',
      title: 'phone',
      width: 150,
    },
    {
      field: 'phone_normalized',
      title: 'phone_normalized',
      width: 150,
    },
    {
      field: 'website',
      title: 'website',
      width: 150,
    },
    {
      field: 'domain',
      title: 'domain',
      width: 150,
    },
    {
      field: 'country',
      title: 'country',
      width: 150,
    },
    {
      field: 'region',
      title: 'region',
      width: 150,
    },
    {
      field: 'city',
      title: 'city',
      width: 150,
    },
    {
      field: 'address',
      title: 'address',
      width: 150,
    },
    {
      field: 'industry',
      title: 'industry',
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
      field: 'keyword',
      title: 'keyword',
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
      field: 'confidence_score',
      title: 'confidence_score',
      width: 150,
    },
    {
      field: 'dedupe_key_email',
      title: 'dedupe_key_email',
      width: 150,
    },
    {
      field: 'dedupe_key_phone',
      title: 'dedupe_key_phone',
      width: 150,
    },
    {
      field: 'dedupe_key_domain',
      title: 'dedupe_key_domain',
      width: 150,
    },
    {
      field: 'normalization_version',
      title: 'normalization_version',
      width: 150,
    },
    {
      field: 'first_seen_at',
      title: 'first_seen_at',
      width: 150,
    },
    {
      field: 'last_seen_at',
      title: 'last_seen_at',
      width: 150,
    },
    {
      field: 'last_exported_at',
      title: 'last_exported_at',
      width: 150,
    },
    {
      field: 'archived_at',
      title: 'archived_at',
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
    fieldName: 'lead_no',
    label: 'lead_no',
    rules: 'required',
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
    component: 'Input',
    fieldName: 'company_name',
    label: 'company_name',
  },
  {
    component: 'Input',
    fieldName: 'contact_name',
    label: 'contact_name',
  },
  {
    component: 'Input',
    fieldName: 'email',
    label: 'email',
  },
  {
    component: 'Input',
    fieldName: 'email_normalized',
    label: 'email_normalized',
  },
  {
    component: 'Input',
    fieldName: 'phone',
    label: 'phone',
  },
  {
    component: 'Input',
    fieldName: 'phone_normalized',
    label: 'phone_normalized',
  },
  {
    component: 'Textarea',
    fieldName: 'website',
    label: 'website',
    componentProps: {"rows": 4},
  },
  {
    component: 'Input',
    fieldName: 'domain',
    label: 'domain',
  },
  {
    component: 'Input',
    fieldName: 'country',
    label: 'country',
  },
  {
    component: 'Input',
    fieldName: 'region',
    label: 'region',
  },
  {
    component: 'Input',
    fieldName: 'city',
    label: 'city',
  },
  {
    component: 'Textarea',
    fieldName: 'address',
    label: 'address',
    componentProps: {"rows": 4},
  },
  {
    component: 'Input',
    fieldName: 'industry',
    label: 'industry',
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
    fieldName: 'keyword',
    label: 'keyword',
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
    fieldName: 'confidence_score',
    label: 'confidence_score',
    rules: 'required',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'Input',
    fieldName: 'dedupe_key_email',
    label: 'dedupe_key_email',
  },
  {
    component: 'Input',
    fieldName: 'dedupe_key_phone',
    label: 'dedupe_key_phone',
  },
  {
    component: 'Input',
    fieldName: 'dedupe_key_domain',
    label: 'dedupe_key_domain',
  },
  {
    component: 'Input',
    fieldName: 'normalization_version',
    label: 'normalization_version',
    rules: 'required',
  },
  {
    component: 'DatePicker',
    fieldName: 'first_seen_at',
    label: 'first_seen_at',
    rules: 'required',
    componentProps: {"format": "YYYY-MM-DD HH:mm:ss", "showTime": true, "valueFormat": "YYYY-MM-DD HH:mm:ss"},
  },
  {
    component: 'DatePicker',
    fieldName: 'last_seen_at',
    label: 'last_seen_at',
    rules: 'required',
    componentProps: {"format": "YYYY-MM-DD HH:mm:ss", "showTime": true, "valueFormat": "YYYY-MM-DD HH:mm:ss"},
  },
  {
    component: 'DatePicker',
    fieldName: 'last_exported_at',
    label: 'last_exported_at',
    componentProps: {"format": "YYYY-MM-DD HH:mm:ss", "showTime": true, "valueFormat": "YYYY-MM-DD HH:mm:ss"},
  },
  {
    component: 'DatePicker',
    fieldName: 'archived_at',
    label: 'archived_at',
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
