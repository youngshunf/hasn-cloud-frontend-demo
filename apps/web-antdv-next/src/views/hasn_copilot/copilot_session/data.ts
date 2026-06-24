import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeGridProps } from '#/adapter/vxe-table';
import type { CopilotSession } from '#/api/hasn_copilot/copilot_session';

import { $t } from '@vben/locales';

import { getDictOptions } from '#/utils/dict';

/**
 * Query form schema
 */
export const querySchema: VbenFormSchema[] = [
  {
    component: 'Input',
    fieldName: 'owner_hasn_id',
    label: '归属 owner HASN ID',
    componentProps: {
      placeholder:
        'Search by \u5F52\u5C5E owner HASN ID\uFF08owner \u9694\u79BB\u952E\uFF0C\u6240\u6709\u67E5\u8BE2\u5F3A\u5236\u5E26\uFF1B\u5F15\u7528 public.hasn_humans\uFF09',
    },
  },
  {
    component: 'Input',
    fieldName: 'session_id',
    label: '工作会话 id',
    componentProps: {
      placeholder:
        'Search by \u5DE5\u4F5C\u4F1A\u8BDD id\uFF08\u4EFB\u52A1\u7CFB\u7EDF session_kind=task/summary_only\uFF0C\u76F4\u8FDE hermes runtime_session\uFF1B\u8F6C\u5199/\u5EFA\u8BAE\u90FD\u5728\u6B64\u4F1A\u8BDD\u5185\uFF0C\u4E0D\u5728 conversation\uFF09',
    },
  },
  {
    component: 'Input',
    fieldName: 'bound_agent_id',
    label: '协作分身 HASN ID',
    componentProps: {
      placeholder:
        'Search by \u534F\u4F5C\u5206\u8EAB HASN ID\uFF08owner \u540D\u4E0B a_* \u5206\u8EAB\uFF0C\u4F1A\u8BDD\u7EA7\u5FEB\u7167\uFF1Bnull=\u672A\u7ED1\u5B9A\uFF09',
    },
  },
  {
    component: 'Input',
    fieldName: 'title',
    label: '会议标题',
    componentProps: {
      placeholder:
        'Search by \u4F1A\u8BAE\u6807\u9898\uFF08\u53EF\u7531\u5206\u8EAB\u81EA\u52A8\u547D\u540D\uFF09',
    },
  },
  {
    component: 'Select',
    fieldName: 'status',
    label: '状态',
    componentProps: {
      allowClear: true,
      options: getDictOptions('hasn_copilot_status'),
    },
  },
  {
    component: '',
    fieldName: 'projection_conversation_id',
    label: '完成投影到的主 IM 会话 id',
  },
  {
    component: '',
    fieldName: 'projection_message_id',
    label: '投影的那条卡片消息 id',
  },
  {
    component: 'RangePicker',
    fieldName: 'started_time',
    label: '会议开始时间',
    componentProps: { format: 'YYYY-MM-DD' },
  },
  {
    component: 'RangePicker',
    fieldName: 'ended_time',
    label: '会议结束时间',
    componentProps: { format: 'YYYY-MM-DD' },
  },
];

/**
 * Table columns configuration
 */
export function useColumns(
  onActionClick?: OnActionClickFn<CopilotSession>,
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
      field: 'owner_hasn_id',
      title: '归属 owner HASN ID',
      width: 150,
    },
    {
      field: 'session_id',
      title: '工作会话 id',
      width: 150,
    },
    {
      field: 'bound_agent_id',
      title: '协作分身 HASN ID',
      width: 150,
    },
    {
      field: 'title',
      title: '会议标题',
      width: 150,
    },
    {
      field: 'scene',
      title: '场景',
      width: 150,
    },
    {
      field: 'response_mode',
      title: '应答模式',
      width: 150,
    },
    {
      field: 'status',
      title: '状态',
      width: 150,
      cellRender: {
        name: 'CellTag',
        options: getDictOptions('hasn_copilot_status'),
      },
    },
    {
      field: 'projection_conversation_id',
      title: '完成投影到的主 IM 会话 id',
      width: 150,
    },
    {
      field: 'projection_message_id',
      title: '投影的那条卡片消息 id',
      width: 150,
    },
    {
      field: 'started_time',
      title: '会议开始时间',
      width: 150,
    },
    {
      field: 'ended_time',
      title: '会议结束时间',
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
    fieldName: 'owner_hasn_id',
    label: '归属 owner HASN ID',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'session_id',
    label: '工作会话 id',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'bound_agent_id',
    label: '协作分身 HASN ID',
  },
  {
    component: 'Textarea',
    fieldName: 'title',
    label: '会议标题',
    rules: 'required',
    componentProps: { rows: 4 },
  },
  {
    component: 'Input',
    fieldName: 'scene',
    label: '场景',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'response_mode',
    label: '应答模式',
    rules: 'required',
  },
  {
    component: 'Select',
    fieldName: 'status',
    label: '状态',
    rules: 'required',
    componentProps: {
      options: getDictOptions('hasn_copilot_status'),
    },
  },
  {
    component: 'Textarea',
    fieldName: 'source_config',
    label: '采集快照 JSON',
    rules: 'required',
    componentProps: { placeholder: 'Enter JSON', rows: 6 },
  },
  {
    component: 'Input',
    fieldName: 'projection_conversation_id',
    label: '完成投影到的主 IM 会话 id',
  },
  {
    component: 'Input',
    fieldName: 'projection_message_id',
    label: '投影的那条卡片消息 id',
  },
  {
    component: 'DatePicker',
    fieldName: 'started_time',
    label: '会议开始时间',
    componentProps: {
      format: 'YYYY-MM-DD HH:mm:ss',
      showTime: true,
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
  {
    component: 'DatePicker',
    fieldName: 'ended_time',
    label: '会议结束时间',
    componentProps: {
      format: 'YYYY-MM-DD HH:mm:ss',
      showTime: true,
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
];
