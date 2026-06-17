import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeGridProps } from '#/adapter/vxe-table';
import type { AppAgentBindings } from '#/api/app_platform/app_agent_bindings';

import { $t } from '@vben/locales';

import { getDictOptions } from '#/utils/dict';

/**
 * Query form schema
 */
export const querySchema: VbenFormSchema[] = [
  {
    component: '',
    fieldName: 'binding_id',
    label: '绑定 ID',
  },
  {
    component: 'Input',
    fieldName: 'installation_id',
    label: 'installation_id',
    componentProps: { placeholder: 'Search by installation_id' },
  },
  {
    component: 'Input',
    fieldName: 'agent_id',
    label: 'agent_id',
    componentProps: { placeholder: 'Search by agent_id' },
  },
  {
    component: 'RangePicker',
    fieldName: 'bound_at',
    label: 'bound_at',
    componentProps: { format: 'YYYY-MM-DD' },
  },
  {
    component: 'Select',
    fieldName: 'status',
    label: '状态',
    componentProps: {
      allowClear: true,
      options: getDictOptions('app_platform_status'),
    },
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
  onActionClick?: OnActionClickFn<AppAgentBindings>,
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
      field: 'binding_id',
      title: '绑定 ID',
      width: 150,
    },
    {
      field: 'installation_id',
      title: 'installation_id',
      width: 150,
    },
    {
      field: 'agent_id',
      title: 'agent_id',
      width: 150,
    },
    {
      field: 'bound_at',
      title: 'bound_at',
      width: 150,
    },
    {
      field: 'bound_by',
      title: 'bound_by',
      width: 150,
    },
    {
      field: 'status',
      title: '状态',
      width: 150,
      cellRender: {
        name: 'CellTag',
        options: getDictOptions('app_platform_status'),
      },
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
    fieldName: 'binding_id',
    label: '绑定 ID',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'installation_id',
    label: 'installation_id',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'agent_id',
    label: 'agent_id',
    rules: 'required',
  },
  {
    component: 'DatePicker',
    fieldName: 'bound_at',
    label: 'bound_at',
    rules: 'required',
    componentProps: {
      format: 'YYYY-MM-DD HH:mm:ss',
      showTime: true,
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
  {
    component: 'Input',
    fieldName: 'bound_by',
    label: 'bound_by',
    rules: 'required',
  },
  {
    component: 'Select',
    fieldName: 'status',
    label: '状态',
    rules: 'required',
    componentProps: {
      options: getDictOptions('app_platform_status'),
    },
  },
];
