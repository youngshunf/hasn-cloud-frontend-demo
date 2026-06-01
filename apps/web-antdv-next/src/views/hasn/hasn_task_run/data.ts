import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeGridProps } from '#/adapter/vxe-table';
import type { HasnTaskRun } from '#/api/hasn/hasn_task_run';

import { $t } from '@vben/locales';

import { z } from '#/adapter/form';

const runStatusOptions = [
  { color: 'blue', label: '待执行', value: 'pending' },
  { color: 'orange', label: '执行中', value: 'running' },
  { color: 'green', label: '成功', value: 'success' },
  { color: 'red', label: '失败', value: 'error' },
  { color: 'orange', label: '超时', value: 'timeout' },
  { color: 'default', label: '静默', value: 'silent' },
];

function optionalJsonRule(): VbenFormSchema['rules'] {
  return z
    .string()
    .optional()
    .transform((value, ctx) => {
      if (!value || value.trim() === '') return undefined;
      try {
        return JSON.parse(value);
      } catch {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: '请输入合法 JSON',
        });
        return z.NEVER;
      }
    });
}

export const querySchema: VbenFormSchema[] = [
  {
    component: 'InputNumber',
    fieldName: 'task_id',
    label: '任务 ID',
    componentProps: {
      style: 'width: 100%',
    },
  },
  {
    component: 'Input',
    fieldName: 'agent_id',
    label: '执行 agent',
  },
  {
    component: 'Input',
    fieldName: 'runtime_node_id',
    label: '运行节点',
  },
  {
    component: 'Select',
    fieldName: 'status',
    label: '执行状态',
    componentProps: {
      allowClear: true,
      options: runStatusOptions,
    },
  },
];

export function useColumns(
  onActionClick?: OnActionClickFn<HasnTaskRun>,
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
      field: 'task_id',
      title: '任务 ID',
      width: 100,
    },
    {
      field: 'agent_id',
      title: '执行 Agent',
      width: 160,
    },
    {
      field: 'runtime_node_id',
      title: '运行节点',
      width: 160,
    },
    {
      field: 'status',
      title: '状态',
      width: 110,
      cellRender: {
        name: 'CellTag',
        options: runStatusOptions,
      },
    },
    {
      field: 'started_at',
      title: '开始时间',
      width: 170,
    },
    {
      field: 'finished_at',
      title: '完成时间',
      width: 170,
    },
    {
      field: 'duration_ms',
      title: '耗时(ms)',
      width: 100,
    },
    {
      field: 'model',
      title: '模型',
      width: 140,
      showOverflow: true,
    },
    {
      field: 'output',
      title: '输出',
      minWidth: 180,
      showOverflow: true,
    },
    {
      field: 'error',
      title: '错误',
      minWidth: 180,
      showOverflow: true,
    },
    {
      field: 'created_time',
      title: '创建时间',
      width: 170,
    },
    {
      field: 'operation',
      title: $t('common.table.operation'),
      align: 'center',
      fixed: 'right',
      width: 190,
      cellRender: {
        attrs: {
          nameField: 'id',
          onClick: onActionClick,
        },
        name: 'CellOperation',
        options: [
          {
            code: 'details',
            text: '详情',
          },
          'edit',
          'delete',
        ],
      },
    },
  ];
}

export const formSchema: VbenFormSchema[] = [
  {
    component: 'InputNumber',
    fieldName: 'task_id',
    label: '任务 ID',
    rules: 'required',
    componentProps: {
      style: 'width: 100%',
    },
  },
  {
    component: 'Input',
    fieldName: 'agent_id',
    label: '执行 agent',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'runtime_node_id',
    label: '运行节点',
  },
  {
    component: 'Select',
    defaultValue: 'pending',
    fieldName: 'status',
    label: '执行状态',
    rules: 'required',
    componentProps: {
      options: runStatusOptions,
    },
  },
  {
    component: 'DatePicker',
    fieldName: 'started_at',
    label: '开始时间',
    componentProps: {
      format: 'YYYY-MM-DD HH:mm:ss',
      showTime: true,
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
  {
    component: 'DatePicker',
    fieldName: 'finished_at',
    label: '完成时间',
    componentProps: {
      format: 'YYYY-MM-DD HH:mm:ss',
      showTime: true,
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
  {
    component: 'InputNumber',
    fieldName: 'duration_ms',
    label: '耗时(ms)',
    componentProps: {
      style: 'width: 100%',
    },
  },
  {
    component: 'Input',
    fieldName: 'model',
    label: '模型',
  },
  {
    component: 'Textarea',
    fieldName: 'prompt_snapshot',
    label: 'Prompt 快照',
    componentProps: {
      rows: 6,
    },
  },
  {
    component: 'Textarea',
    fieldName: 'output',
    label: '最终输出',
    componentProps: {
      rows: 6,
    },
  },
  {
    component: 'Textarea',
    fieldName: 'error',
    label: '错误信息',
    componentProps: {
      rows: 4,
    },
  },
  {
    component: 'Textarea',
    fieldName: 'token_usage',
    label: 'Token 消耗',
    rules: optionalJsonRule(),
    componentProps: {
      placeholder: '{"input_tokens": 0, "output_tokens": 0, "total_tokens": 0}',
      rows: 4,
    },
  },
];
