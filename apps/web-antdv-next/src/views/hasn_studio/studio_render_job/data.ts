import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeGridProps } from '#/adapter/vxe-table';
import type { StudioRenderJob } from '#/api/hasn_studio/studio_render_job';

import { $t } from '@vben/locales';

import { getDictOptions } from '#/utils/dict';

/**
 * Query form schema
 */
export const querySchema: VbenFormSchema[] = [
  {
    component: 'InputNumber',
    fieldName: 'project_id',
    label: '所属项目 id',
    componentProps: { style: 'width: 100%' },
  },
  {
    component: 'Input',
    fieldName: 'owner_hasn_id',
    label: '归属主人 hasn_id',
    componentProps: {
      placeholder:
        'Search by \u5F52\u5C5E\u4E3B\u4EBA hasn_id\uFF08\u884C\u7EA7\u9694\u79BB\u952E\uFF09',
    },
  },
  {
    component: 'Input',
    fieldName: 'agent_hasn_id',
    label: '发起分身 hasn_id',
    componentProps: {
      placeholder: 'Search by \u53D1\u8D77\u5206\u8EAB hasn_id',
    },
  },
  {
    component: 'Input',
    fieldName: 'engine_job_id',
    label: '引擎侧 job 标识',
    componentProps: {
      placeholder:
        'Search by \u5F15\u64CE\u4FA7 job \u6807\u8BC6\uFF08\u4E91\u7AEF\u8F6E\u8BE2/\u56DE\u6D41\u7528\uFF09',
    },
  },
  {
    component: 'Select',
    fieldName: 'status',
    label: '状态',
    componentProps: {
      allowClear: true,
      options: getDictOptions('hasn_studio_status'),
    },
  },
  {
    component: 'Input',
    fieldName: 'work_session_id',
    label: '触发的工作会话 id',
    componentProps: {
      placeholder:
        'Search by \u89E6\u53D1\u7684\u5DE5\u4F5C\u4F1A\u8BDD id\uFF08\u7EED\u63A5\u951A\u70B9 AC-P2\uFF09',
    },
  },
  {
    component: 'RangePicker',
    fieldName: 'started_at',
    label: '开始时间',
    componentProps: { format: 'YYYY-MM-DD' },
  },
  {
    component: 'RangePicker',
    fieldName: 'finished_at',
    label: '结束时间',
    componentProps: { format: 'YYYY-MM-DD' },
  },
];

/**
 * Table columns configuration
 */
export function useColumns(
  onActionClick?: OnActionClickFn<StudioRenderJob>,
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
      field: 'project_id',
      title: '所属项目 id',
      width: 150,
    },
    {
      field: 'owner_hasn_id',
      title: '归属主人 hasn_id',
      width: 150,
    },
    {
      field: 'agent_hasn_id',
      title: '发起分身 hasn_id',
      width: 150,
    },
    {
      field: 'pipeline_key',
      title: '跑哪条管线 key',
      width: 150,
    },
    {
      field: 'engine_job_id',
      title: '引擎侧 job 标识',
      width: 150,
    },
    {
      field: 'status',
      title: '状态',
      width: 150,
      cellRender: {
        name: 'CellTag',
        options: getDictOptions('hasn_studio_status'),
      },
    },
    {
      field: 'progress',
      title: '进度 0-100',
      width: 150,
    },
    {
      field: 'stage',
      title: '当前阶段文本',
      width: 150,
    },
    {
      field: 'work_session_id',
      title: '触发的工作会话 id',
      width: 150,
    },
    {
      field: 'started_at',
      title: '开始时间',
      width: 150,
    },
    {
      field: 'finished_at',
      title: '结束时间',
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
    fieldName: 'project_id',
    label: '所属项目 id',
    rules: 'required',
    componentProps: { style: 'width: 100%' },
  },
  {
    component: 'Input',
    fieldName: 'owner_hasn_id',
    label: '归属主人 hasn_id',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'agent_hasn_id',
    label: '发起分身 hasn_id',
  },
  {
    component: 'Input',
    fieldName: 'pipeline_key',
    label: '跑哪条管线 key',
    rules: 'required',
  },
  {
    component: 'Textarea',
    fieldName: 'input',
    label: '入参快照 jsonb',
    rules: 'required',
    componentProps: { placeholder: 'Enter JSON', rows: 6 },
  },
  {
    component: 'Input',
    fieldName: 'engine_job_id',
    label: '引擎侧 job 标识',
  },
  {
    component: 'Select',
    fieldName: 'status',
    label: '状态',
    rules: 'required',
    componentProps: {
      options: getDictOptions('hasn_studio_status'),
    },
  },
  {
    component: 'InputNumber',
    fieldName: 'progress',
    label: '进度 0-100',
    rules: 'required',
    componentProps: { style: 'width: 100%' },
  },
  {
    component: 'Input',
    fieldName: 'stage',
    label: '当前阶段文本',
  },
  {
    component: 'Textarea',
    fieldName: 'cost',
    label: '成本计量 jsonb',
    componentProps: { placeholder: 'Enter JSON', rows: 6 },
  },
  {
    component: 'Input',
    fieldName: 'work_session_id',
    label: '触发的工作会话 id',
  },
  {
    component: 'Textarea',
    fieldName: 'error',
    label: '失败真实错误',
    componentProps: { rows: 4 },
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
    label: '结束时间',
    componentProps: {
      format: 'YYYY-MM-DD HH:mm:ss',
      showTime: true,
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
];
