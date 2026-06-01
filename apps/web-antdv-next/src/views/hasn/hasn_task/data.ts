import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeGridProps } from '#/adapter/vxe-table';
import type { HasnTask } from '#/api/hasn/hasn_task';
import { $t } from '@vben/locales';

import { z } from '#/adapter/form';
import { getHasnSkillBundleListApi } from '#/api/hasn/hasn_skill_bundle';

const scheduleTypeOptions = [
  { color: 'blue', label: '一次性', value: 'once' },
  { color: 'green', label: '间隔', value: 'interval' },
  { color: 'orange', label: 'Cron', value: 'cron' },
];

const taskStateOptions = [
  { color: 'blue', label: '已调度', value: 'scheduled' },
  { color: 'orange', label: '已暂停', value: 'paused' },
  { color: 'green', label: '已完成', value: 'completed' },
  { color: 'red', label: '异常', value: 'error' },
];

const lastStatusOptions = [
  { color: 'green', label: '成功', value: 'ok' },
  { color: 'red', label: '错误', value: 'error' },
  { color: 'default', label: '静默', value: 'silent' },
  { color: 'orange', label: '超时', value: 'timeout' },
];

function formatJsonCell(value: unknown): string {
  if (value === undefined || value === null || value === '') return '-';
  if (typeof value === 'string') return value;
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}

function jsonRule(message = '请输入合法 JSON'): VbenFormSchema['rules'] {
  return z
    .string()
    .optional()
    .transform((value, ctx) => {
      if (!value || value.trim() === '') return {};
      try {
        return JSON.parse(value);
      } catch {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message,
        });
        return z.NEVER;
      }
    });
}

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

function arrayOrJsonRule(): VbenFormSchema['rules'] {
  return z
    .union([z.array(z.string()), z.string()])
    .optional()
    .transform((value, ctx) => {
      if (value === undefined || value === null || value === '') return [];
      if (Array.isArray(value)) return value;
      try {
        const parsed = JSON.parse(value);
        if (Array.isArray(parsed)) return parsed;
      } catch {
        return [String(value)];
      }
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: '请输入合法数组或单个字符串',
      });
      return z.NEVER;
    });
}

export const querySchema: VbenFormSchema[] = [
  {
    component: 'Input',
    fieldName: 'owner_id',
    label: '任务归属 owner',
  },
  {
    component: 'Input',
    fieldName: 'agent_id',
    label: '执行 agent',
  },
  {
    component: 'Input',
    fieldName: 'name',
    label: '任务名称',
  },
  {
    component: 'Select',
    fieldName: 'schedule_type',
    label: '调度类型',
    componentProps: {
      allowClear: true,
      options: scheduleTypeOptions,
    },
  },
  {
    component: 'Select',
    fieldName: 'state',
    label: '状态',
    componentProps: {
      allowClear: true,
      options: taskStateOptions,
    },
  },
];

export function useColumns(
  onActionClick?: OnActionClickFn<HasnTask>,
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
      field: 'name',
      title: '任务名称',
      minWidth: 160,
      showOverflow: true,
    },
    {
      field: 'owner_id',
      title: 'Owner',
      width: 160,
    },
    {
      field: 'agent_id',
      title: '执行 Agent',
      width: 160,
    },
    {
      field: 'schedule_type',
      title: '调度类型',
      width: 110,
      cellRender: {
        name: 'CellTag',
        options: scheduleTypeOptions,
      },
    },
    {
      field: 'schedule_config',
      title: '调度配置',
      minWidth: 180,
      formatter: ({ cellValue }) => formatJsonCell(cellValue),
      showOverflow: true,
    },
    {
      field: 'enabled',
      title: '启用',
      width: 80,
      formatter: ({ cellValue }) => (cellValue ? '是' : '否'),
    },
    {
      field: 'state',
      title: '状态',
      width: 110,
      cellRender: {
        name: 'CellTag',
        options: taskStateOptions,
      },
    },
    {
      field: 'last_status',
      title: '上次状态',
      width: 110,
      cellRender: {
        name: 'CellTag',
        options: lastStatusOptions,
      },
    },
    {
      field: 'next_run_at',
      title: '下次执行',
      width: 170,
    },
    {
      field: 'last_run_at',
      title: '上次执行',
      width: 170,
    },
    {
      field: 'run_count',
      title: '执行次数',
      width: 100,
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

export const formSchema: VbenFormSchema[] = [
  {
    component: 'Input',
    fieldName: 'owner_id',
    label: '任务归属 owner',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'agent_id',
    label: '执行 agent',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'name',
    label: '任务名称',
    rules: 'required',
  },
  {
    component: 'Textarea',
    fieldName: 'description',
    label: '任务描述',
    componentProps: {
      rows: 3,
    },
  },
  {
    component: 'Textarea',
    fieldName: 'prompt',
    label: '任务指令',
    rules: 'required',
    componentProps: {
      rows: 6,
    },
  },
  {
    component: 'ApiSelect',
    fieldName: 'skill_bundle_ids',
    label: 'Skill Bundle 列表',
    help: '可多选 Skill Bundle',
    rules: 'selectRequired',
    componentProps: {
      api: () =>
        getHasnSkillBundleListApi({
          page: 1,
          size: 100,
        }),
      class: 'w-full',
      allowClear: true,
      labelField: 'label',
      valueField: 'value',
      mode: 'multiple',
      showSearch: true,
      placeholder: '选择 Skill Bundle',
      filterOption: false,
      afterFetch: (data: {
        items: { display_name?: string; name: string }[];
      }) =>
        data.items.map((item) => ({
          label: item.display_name || item.name,
          value: item.name,
        })),
    },
  },
  {
    component: 'Select',
    fieldName: 'skill_ids',
    label: 'Skill 列表',
    help: '可多选 Skill',
    rules: arrayOrJsonRule(),
    componentProps: {
      allowClear: true,
      mode: 'multiple',
      options: [],
      placeholder: '选择 Skill',
      showSearch: true,
      tokenSeparators: [',', ' '],
    },
  },
  {
    component: 'InputNumber',
    fieldName: 'workflow_id',
    label: '工作流 ID',
    componentProps: {
      style: 'width: 100%',
    },
  },
  {
    component: 'Textarea',
    fieldName: 'enabled_toolsets',
    label: '可用工具集',
    help: '留空表示全部工具集',
    rules: optionalJsonRule(),
    componentProps: {
      placeholder: '["terminal", "file", "web"]',
      rows: 4,
    },
  },
  {
    component: 'InputNumber',
    fieldName: 'context_from_task_id',
    label: '上下文任务 ID',
    componentProps: {
      style: 'width: 100%',
    },
  },
  {
    component: 'Select',
    fieldName: 'schedule_type',
    label: '调度类型',
    rules: 'required',
    componentProps: {
      options: scheduleTypeOptions,
    },
  },
  {
    component: 'Textarea',
    fieldName: 'schedule_config',
    label: '调度配置',
    rules: jsonRule(),
    componentProps: {
      placeholder: '{"expr": "0 9 * * *"}',
      rows: 4,
    },
  },
  {
    component: 'Input',
    fieldName: 'schedule_display',
    label: '调度描述',
  },
  {
    component: 'Switch',
    defaultValue: true,
    fieldName: 'enabled',
    label: '是否启用',
  },
  {
    component: 'Select',
    defaultValue: 'scheduled',
    fieldName: 'state',
    label: '状态',
    rules: 'required',
    componentProps: {
      options: taskStateOptions,
    },
  },
  {
    component: 'DatePicker',
    fieldName: 'next_run_at',
    label: '下次执行时间',
    componentProps: {
      format: 'YYYY-MM-DD HH:mm:ss',
      showTime: true,
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
  {
    component: 'DatePicker',
    fieldName: 'last_run_at',
    label: '上次执行时间',
    componentProps: {
      format: 'YYYY-MM-DD HH:mm:ss',
      showTime: true,
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
  {
    component: 'Select',
    fieldName: 'last_status',
    label: '上次状态',
    componentProps: {
      allowClear: true,
      options: lastStatusOptions,
    },
  },
  {
    component: 'Textarea',
    fieldName: 'last_error',
    label: '上次错误',
    componentProps: {
      rows: 4,
    },
  },
  {
    component: 'InputNumber',
    defaultValue: 0,
    fieldName: 'run_count',
    label: '总执行次数',
    rules: 'required',
    componentProps: {
      style: 'width: 100%',
    },
  },
  {
    component: 'InputNumber',
    fieldName: 'repeat_times',
    label: '重复次数',
    componentProps: {
      style: 'width: 100%',
    },
  },
  {
    component: 'InputNumber',
    defaultValue: 0,
    fieldName: 'repeat_completed',
    label: '已执行次数',
    rules: 'required',
    componentProps: {
      style: 'width: 100%',
    },
  },
  {
    component: 'Input',
    fieldName: 'created_by',
    label: '创建者',
  },
];
