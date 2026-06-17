import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeGridProps } from '#/adapter/vxe-table';
import type { Playbook } from '#/api/hasn_creator/playbook';

import { $t } from '@vben/locales';

/**
 * Query form schema
 */
export const querySchema: VbenFormSchema[] = [
  {
    component: 'InputNumber',
    fieldName: 'user_id',
    label: '归属主人',
    componentProps: { style: 'width: 100%' },
  },
  {
    component: 'Input',
    fieldName: 'name',
    label: 'name',
    componentProps: { placeholder: 'Search by name' },
  },
];

/**
 * Table columns configuration
 */
export function useColumns(
  onActionClick?: OnActionClickFn<Playbook>,
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
      field: 'user_id',
      title: '归属主人',
      width: 150,
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
      field: 'is_builtin',
      title: 'is_builtin',
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
    fieldName: 'user_id',
    label: '归属主人',
    componentProps: { style: 'width: 100%' },
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
    fieldName: 'goal',
    label: 'goal',
    componentProps: { rows: 4 },
  },
  {
    component: 'Textarea',
    fieldName: 'target_profile',
    label: 'target_profile',
    rules: 'required',
    componentProps: { placeholder: 'Enter JSON', rows: 6 },
  },
  {
    component: 'Textarea',
    fieldName: 'cadence',
    label: '触达节奏 [{day,channel,goal}]',
    rules: 'required',
    componentProps: { placeholder: 'Enter JSON', rows: 6 },
  },
  {
    component: 'Textarea',
    fieldName: 'tone_guide',
    label: 'tone_guide',
    componentProps: { rows: 4 },
  },
  {
    component: 'Textarea',
    fieldName: 'exit_rule',
    label: '止损规则 {max_silent_rounds,action}',
    rules: 'required',
    componentProps: { placeholder: 'Enter JSON', rows: 6 },
  },
  {
    component: 'Switch',
    fieldName: 'is_builtin',
    label: 'is_builtin',
  },
];
