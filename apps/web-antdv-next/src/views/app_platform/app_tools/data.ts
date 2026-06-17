import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeGridProps } from '#/adapter/vxe-table';
import type { AppTools } from '#/api/app_platform/app_tools';

import { $t } from '@vben/locales';

import { getDictOptions } from '#/utils/dict';

/**
 * Query form schema
 */
export const querySchema: VbenFormSchema[] = [
  {
    component: '',
    fieldName: 'tool_id',
    label: 'Tool ID',
  },
  {
    component: 'Input',
    fieldName: 'app_id',
    label: 'app_id',
    componentProps: { placeholder: 'Search by app_id' },
  },
  {
    component: '',
    fieldName: 'version_id',
    label: 'version_id',
  },
  {
    component: 'Input',
    fieldName: 'tool_name',
    label: 'tool_name',
    componentProps: { placeholder: 'Search by tool_name' },
  },
  {
    component: 'Input',
    fieldName: 'display_name',
    label: 'display_name',
    componentProps: { placeholder: 'Search by display_name' },
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
  onActionClick?: OnActionClickFn<AppTools>,
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
      field: 'tool_id',
      title: 'Tool ID',
      width: 150,
    },
    {
      field: 'app_id',
      title: 'app_id',
      width: 150,
    },
    {
      field: 'version_id',
      title: 'version_id',
      width: 150,
    },
    {
      field: 'tool_name',
      title: 'tool_name',
      width: 150,
    },
    {
      field: 'display_name',
      title: 'display_name',
      width: 150,
    },
    {
      field: 'visibility',
      title: '可见性',
      width: 150,
    },
    {
      field: 'risk_level',
      title: '风险等级',
      width: 150,
      cellRender: {
        name: 'CellTag',
        options: getDictOptions('app_platform_risk_level'),
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
    fieldName: 'tool_id',
    label: 'Tool ID',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'app_id',
    label: 'app_id',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'version_id',
    label: 'version_id',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'tool_name',
    label: 'tool_name',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'display_name',
    label: 'display_name',
    rules: 'required',
  },
  {
    component: 'Textarea',
    fieldName: 'description',
    label: 'description',
    rules: 'required',
    componentProps: { rows: 4 },
  },
  {
    component: 'Textarea',
    fieldName: 'input_schema',
    label: 'input_schema',
    rules: 'required',
    componentProps: { placeholder: 'Enter JSON', rows: 6 },
  },
  {
    component: 'Textarea',
    fieldName: 'output_schema',
    label: 'output_schema',
    rules: 'required',
    componentProps: { placeholder: 'Enter JSON', rows: 6 },
  },
  {
    component: 'Input',
    fieldName: 'visibility',
    label: '可见性',
    rules: 'required',
  },
  {
    component: 'Select',
    fieldName: 'risk_level',
    label: '风险等级',
    rules: 'required',
    componentProps: {
      options: getDictOptions('app_platform_risk_level'),
    },
  },
  {
    component: 'Textarea',
    fieldName: 'required_scopes',
    label: 'required_scopes',
    rules: 'required',
    componentProps: { placeholder: 'Enter JSON', rows: 6 },
  },
];
