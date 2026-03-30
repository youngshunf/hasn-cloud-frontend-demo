import type { VbenFormSchema } from '#/adapter/form';
import type {
  OnActionClickFn,
  VxeGridProps,
} from '#/adapter/vxe-table';
import type { CodegenTestTask } from '#/api/codegen_test/codegen_test_task';

import { $t } from '@vben/locales';

import { getDictOptions } from '#/utils/dict';

/**
 * Query form schema
 */
export const querySchema: VbenFormSchema[] = [
  {
    component: 'InputNumber',
    fieldName: 'user_id',
    label: '用户ID',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'Input',
    fieldName: 'title',
    label: '任务标题',
    componentProps: {"placeholder": "Search by \u4efb\u52a1\u6807\u9898"},
  },
  {
    component: 'Select',
    fieldName: 'status',
    label: '状态',
    componentProps: {
      allowClear: true,
      options: getDictOptions('codegen_test_status'),
    },
  },
  {
    component: 'Select',
    fieldName: 'category',
    label: '分类',
    componentProps: {
      allowClear: true,
      options: getDictOptions('codegen_test_category'),
    },
  },
  {
    component: 'Select',
    fieldName: 'type',
    label: '类型',
    componentProps: {
      allowClear: true,
      options: getDictOptions('codegen_test_type'),
    },
  },
  {
    component: 'RangePicker',
    fieldName: 'due_date',
    label: '截止日期',
    componentProps: {"format": "YYYY-MM-DD"},
  },
];

/**
 * Table columns configuration
 */
export function useColumns(
  onActionClick?: OnActionClickFn<CodegenTestTask>,
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
      title: '用户ID',
      width: 150,
    },
    {
      field: 'title',
      title: '任务标题',
      width: 150,
    },
    {
      field: 'status',
      title: '状态',
      width: 150,
      cellRender: {
        name: 'CellTag',
        options: getDictOptions('codegen_test_status'),
      },
    },
    {
      field: 'priority',
      title: '优先级',
      width: 150,
    },
    {
      field: 'category',
      title: '分类',
      width: 150,
      cellRender: {
        name: 'CellTag',
        options: getDictOptions('codegen_test_category'),
      },
    },
    {
      field: 'type',
      title: '类型',
      width: 150,
      cellRender: {
        name: 'CellTag',
        options: getDictOptions('codegen_test_type'),
      },
    },
    {
      field: 'progress',
      title: '进度百分比',
      width: 150,
    },
    {
      field: 'due_date',
      title: '截止日期',
      width: 150,
    },
    {
      field: 'remark',
      title: '备注',
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
    label: '用户ID',
    rules: 'required',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'Input',
    fieldName: 'title',
    label: '任务标题',
    rules: 'required',
  },
  {
    component: 'Textarea',
    fieldName: 'description',
    label: '任务描述',
    componentProps: {"rows": 4},
  },
  {
    component: 'Select',
    fieldName: 'status',
    label: '状态',
    componentProps: {
      options: getDictOptions('codegen_test_status'),
    },
  },
  {
    component: 'InputNumber',
    fieldName: 'priority',
    label: '优先级',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'Select',
    fieldName: 'category',
    label: '分类',
    componentProps: {
      options: getDictOptions('codegen_test_category'),
    },
  },
  {
    component: 'Select',
    fieldName: 'type',
    label: '类型',
    componentProps: {
      options: getDictOptions('codegen_test_type'),
    },
  },
  {
    component: 'InputNumber',
    fieldName: 'progress',
    label: '进度百分比',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'DatePicker',
    fieldName: 'due_date',
    label: '截止日期',
    componentProps: {"format": "YYYY-MM-DD", "valueFormat": "YYYY-MM-DD"},
  },
  {
    component: 'Textarea',
    fieldName: 'remark',
    label: '备注',
    componentProps: {"rows": 4},
  },
];
