import type { VbenFormSchema } from '#/adapter/form';
import type {
  OnActionClickFn,
  VxeGridProps,
} from '#/adapter/vxe-table';
import type { HasnAgentCapabilities } from '#/api/hasn/hasn_agent_capabilities';

import { $t } from '@vben/locales';

import { getDictOptions } from '#/utils/dict';

/**
 * Query form schema
 */
export const querySchema: VbenFormSchema[] = [
  {
    component: 'Input',
    fieldName: 'agent_hasn_id',
    label: 'Agent 的 hasn_id',
    componentProps: {"placeholder": "Search by Agent \u7684 hasn_id"},
  },
  {
    component: 'Input',
    fieldName: 'capability_id',
    label: '能力唯一标识',
    componentProps: {"placeholder": "Search by \u80fd\u529b\u552f\u4e00\u6807\u8bc6"},
  },
  {
    component: 'Input',
    fieldName: 'name',
    label: '能力名称',
    componentProps: {"placeholder": "Search by \u80fd\u529b\u540d\u79f0"},
  },
  {
    component: 'Select',
    fieldName: 'idempotent',
    label: '是否幂等',
    componentProps: {"options": [{"label": "Yes", "value": true}, {"label": "No", "value": false}]},
  },
  {
    component: 'Select',
    fieldName: 'status',
    label: '状态',
    componentProps: {
      allowClear: true,
      options: getDictOptions('hasn_status'),
    },
  },
];

/**
 * Table columns configuration
 */
export function useColumns(
  onActionClick?: OnActionClickFn<HasnAgentCapabilities>,
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
      field: 'agent_hasn_id',
      title: 'Agent 的 hasn_id',
      width: 150,
    },
    {
      field: 'capability_id',
      title: '能力唯一标识',
      width: 150,
    },
    {
      field: 'name',
      title: '能力名称',
      width: 150,
    },
    {
      field: 'estimated_time_ms',
      title: '预计耗时',
      width: 150,
    },
    {
      field: 'idempotent',
      title: '是否幂等',
      width: 150,
    },
    {
      field: 'status',
      title: '状态',
      width: 150,
      cellRender: {
        name: 'CellTag',
        options: getDictOptions('hasn_status'),
      },
    },
    {
      field: 'created_time',
      title: '创建时间',
      width: 150,
    },
    {
      field: 'updated_time',
      title: '更新时间',
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
    fieldName: 'agent_hasn_id',
    label: 'Agent 的 hasn_id',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'capability_id',
    label: '能力唯一标识',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'name',
    label: '能力名称',
    rules: 'required',
  },
  {
    component: 'Textarea',
    fieldName: 'description',
    label: '能力描述',
    componentProps: {"rows": 4},
  },
  {
    component: 'Textarea',
    fieldName: 'input_schema',
    label: '输入 JSON Schema',
    rules: 'required',
    componentProps: {"placeholder": "Enter JSON", "rows": 6},
  },
  {
    component: 'Textarea',
    fieldName: 'output_schema',
    label: '输出 JSON Schema',
    rules: 'required',
    componentProps: {"placeholder": "Enter JSON", "rows": 6},
  },
  {
    component: 'Textarea',
    fieldName: 'requires_permission',
    label: '所需权限',
    rules: 'required',
    componentProps: {"placeholder": "Enter JSON", "rows": 6},
  },
  {
    component: 'Textarea',
    fieldName: 'tags',
    label: '能力标签',
    componentProps: {"rows": 4},
  },
  {
    component: 'Input',
    fieldName: 'estimated_time_ms',
    label: '预计耗时',
    rules: 'required',
  },
  {
    component: 'Switch',
    fieldName: 'idempotent',
    label: '是否幂等',
  },
  {
    component: 'Select',
    fieldName: 'status',
    label: '状态',
    rules: 'required',
    componentProps: {
      options: getDictOptions('hasn_status'),
    },
  },
];
