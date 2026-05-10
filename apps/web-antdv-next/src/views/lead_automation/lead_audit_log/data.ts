import type { VbenFormSchema } from '#/adapter/form';
import type {
  OnActionClickFn,
  VxeGridProps,
} from '#/adapter/vxe-table';
import type { LeadAuditLog } from '#/api/lead_automation/lead_audit_log';

import { $t } from '@vben/locales';

import { getDictOptions } from '#/utils/dict';

/**
 * Query form schema
 */
export const querySchema: VbenFormSchema[] = [
  {
    component: 'Select',
    fieldName: 'event_type',
    label: 'event_type',
    componentProps: {
      allowClear: true,
      options: getDictOptions('lead_automation_event_type'),
    },
  },
  {
    component: 'InputNumber',
    fieldName: 'actor_user_id',
    label: 'actor_user_id',
    componentProps: {"style": "width: 100%"},
  },
];

/**
 * Table columns configuration
 */
export function useColumns(
  onActionClick?: OnActionClickFn<LeadAuditLog>,
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
      field: 'event_type',
      title: 'event_type',
      width: 150,
      cellRender: {
        name: 'CellTag',
        options: getDictOptions('lead_automation_event_type'),
      },
    },
    {
      field: 'actor_user_id',
      title: 'actor_user_id',
      width: 150,
    },
    {
      field: 'actor_role',
      title: 'actor_role',
      width: 150,
    },
    {
      field: 'actor_ip',
      title: 'actor_ip',
      width: 150,
    },
    {
      field: 'actor_ua',
      title: 'actor_ua',
      width: 150,
    },
    {
      field: 'target_table',
      title: 'target_table',
      width: 150,
    },
    {
      field: 'target_count',
      title: 'target_count',
      width: 150,
    },
    {
      field: 'target_ref',
      title: 'target_ref',
      width: 150,
    },
    {
      field: 'result',
      title: 'result',
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
    fieldName: 'event_type',
    label: 'event_type',
    rules: 'required',
    componentProps: {
      options: getDictOptions('lead_automation_event_type'),
    },
  },
  {
    component: 'InputNumber',
    fieldName: 'actor_user_id',
    label: 'actor_user_id',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'Input',
    fieldName: 'actor_role',
    label: 'actor_role',
  },
  {
    component: 'Input',
    fieldName: 'actor_ip',
    label: 'actor_ip',
  },
  {
    component: 'Textarea',
    fieldName: 'actor_ua',
    label: 'actor_ua',
    componentProps: {"rows": 4},
  },
  {
    component: 'Input',
    fieldName: 'target_table',
    label: 'target_table',
  },
  {
    component: 'InputNumber',
    fieldName: 'target_count',
    label: 'target_count',
    rules: 'required',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'Input',
    fieldName: 'target_ref',
    label: 'target_ref',
  },
  {
    component: 'Textarea',
    fieldName: 'payload',
    label: 'payload',
    rules: 'required',
    componentProps: {"placeholder": "Enter JSON", "rows": 6},
  },
  {
    component: 'Input',
    fieldName: 'result',
    label: 'result',
    rules: 'required',
  },
  {
    component: 'Textarea',
    fieldName: 'error_message',
    label: 'error_message',
    componentProps: {"rows": 4},
  },
];
