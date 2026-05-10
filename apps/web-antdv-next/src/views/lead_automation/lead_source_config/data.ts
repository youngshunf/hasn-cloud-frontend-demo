import type { VbenFormSchema } from '#/adapter/form';
import type {
  OnActionClickFn,
  VxeGridProps,
} from '#/adapter/vxe-table';
import type { LeadSourceConfig } from '#/api/lead_automation/lead_source_config';

import { $t } from '@vben/locales';

import { getDictOptions } from '#/utils/dict';

/**
 * Query form schema
 */
export const querySchema: VbenFormSchema[] = [
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
    fieldName: 'name',
    label: 'name',
    componentProps: {"placeholder": "Search by name"},
  },
];

/**
 * Table columns configuration
 */
export function useColumns(
  onActionClick?: OnActionClickFn<LeadSourceConfig>,
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
      field: 'source_type',
      title: 'source_type',
      width: 150,
      cellRender: {
        name: 'CellTag',
        options: getDictOptions('lead_automation_source_type'),
      },
    },
    {
      field: 'name',
      title: 'name',
      width: 150,
    },
    {
      field: 'enabled',
      title: 'enabled',
      width: 150,
    },
    {
      field: 'persist_raw_html',
      title: 'persist_raw_html',
      width: 150,
    },
    {
      field: 'max_html_bytes',
      title: 'max_html_bytes',
      width: 150,
    },
    {
      field: 'rate_limit_per_minute',
      title: 'rate_limit_per_minute',
      width: 150,
    },
    {
      field: 'concurrency',
      title: 'concurrency',
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
    fieldName: 'source_type',
    label: 'source_type',
    rules: 'required',
    componentProps: {
      options: getDictOptions('lead_automation_source_type'),
    },
  },
  {
    component: 'Input',
    fieldName: 'name',
    label: 'name',
    rules: 'required',
  },
  {
    component: 'Switch',
    fieldName: 'enabled',
    label: 'enabled',
  },
  {
    component: 'Textarea',
    fieldName: 'firecrawl_options',
    label: 'firecrawl_options',
    rules: 'required',
    componentProps: {"placeholder": "Enter JSON", "rows": 6},
  },
  {
    component: 'Textarea',
    fieldName: 'min_contact_fields',
    label: 'min_contact_fields',
    rules: 'required',
    componentProps: {"placeholder": "Enter JSON", "rows": 6},
  },
  {
    component: 'Switch',
    fieldName: 'persist_raw_html',
    label: 'persist_raw_html',
  },
  {
    component: 'InputNumber',
    fieldName: 'max_html_bytes',
    label: 'max_html_bytes',
    rules: 'required',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'Textarea',
    fieldName: 'domain_blacklist',
    label: 'domain_blacklist',
    rules: 'required',
    componentProps: {"placeholder": "Enter JSON", "rows": 6},
  },
  {
    component: 'Textarea',
    fieldName: 'country_blacklist',
    label: 'country_blacklist',
    rules: 'required',
    componentProps: {"placeholder": "Enter JSON", "rows": 6},
  },
  {
    component: 'InputNumber',
    fieldName: 'rate_limit_per_minute',
    label: 'rate_limit_per_minute',
    rules: 'required',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'InputNumber',
    fieldName: 'concurrency',
    label: 'concurrency',
    rules: 'required',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'Textarea',
    fieldName: 'metadata',
    label: 'metadata',
    rules: 'required',
    componentProps: {"placeholder": "Enter JSON", "rows": 6},
  },
];
