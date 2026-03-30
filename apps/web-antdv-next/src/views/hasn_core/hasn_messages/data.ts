import type { VbenFormSchema } from '#/adapter/form';
import type {
  OnActionClickFn,
  VxeGridProps,
} from '#/adapter/vxe-table';
import type { HasnMessages } from '#/api/hasn_core/hasn_messages';

import { $t } from '@vben/locales';

import { getDictOptions } from '#/utils/dict';

/**
 * Query form schema
 */
export const querySchema: VbenFormSchema[] = [
  {
    component: '',
    fieldName: 'conversation_id',
    label: '所属会话 ID',
  },
  {
    component: 'Input',
    fieldName: 'from_id',
    label: '发送方 hasn_id',
    componentProps: {"placeholder": "Search by \u53d1\u9001\u65b9 hasn_id"},
  },
  {
    component: 'Select',
    fieldName: 'from_type',
    label: '发送方类型',
    componentProps: {
      allowClear: true,
      options: getDictOptions('hasn_core_from_type'),
    },
  },
  {
    component: 'Input',
    fieldName: 'to_id',
    label: '接收方 hasn_id',
    componentProps: {"placeholder": "Search by \u63a5\u6536\u65b9 hasn_id"},
  },
  {
    component: 'Select',
    fieldName: 'to_type',
    label: '接收方类型',
    componentProps: {
      allowClear: true,
      options: getDictOptions('hasn_core_to_type'),
    },
  },
  {
    component: 'Select',
    fieldName: 'content_type',
    label: '内容类型',
    componentProps: {
      allowClear: true,
      options: getDictOptions('hasn_core_content_type'),
    },
  },
  {
    component: 'Select',
    fieldName: 'msg_type',
    label: '消息类型',
    componentProps: {
      allowClear: true,
      options: getDictOptions('hasn_core_msg_type'),
    },
  },
  {
    component: 'Select',
    fieldName: 'status',
    label: '消息状态',
    componentProps: {
      allowClear: true,
      options: getDictOptions('hasn_core_status'),
    },
  },
  {
    component: 'InputNumber',
    fieldName: 'reply_to_id',
    label: '回复的消息 ID',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: '',
    fieldName: 'local_id',
    label: '客户端本地 ID',
  },
  {
    component: 'RangePicker',
    fieldName: 'recalled_at',
    label: '撤回时间',
    componentProps: {"format": "YYYY-MM-DD"},
  },
  {
    component: 'RangePicker',
    fieldName: 'edited_at',
    label: '最后编辑时间',
    componentProps: {"format": "YYYY-MM-DD"},
  },
  {
    component: 'RangePicker',
    fieldName: 'server_received_at',
    label: '服务端接收时间',
    componentProps: {"format": "YYYY-MM-DD"},
  },
];

/**
 * Table columns configuration
 */
export function useColumns(
  onActionClick?: OnActionClickFn<HasnMessages>,
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
      field: 'conversation_id',
      title: '所属会话 ID',
      width: 150,
    },
    {
      field: 'from_id',
      title: '发送方 hasn_id',
      width: 150,
    },
    {
      field: 'from_type',
      title: '发送方类型',
      width: 150,
      cellRender: {
        name: 'CellTag',
        options: getDictOptions('hasn_core_from_type'),
      },
    },
    {
      field: 'to_id',
      title: '接收方 hasn_id',
      width: 150,
    },
    {
      field: 'to_type',
      title: '接收方类型',
      width: 150,
      cellRender: {
        name: 'CellTag',
        options: getDictOptions('hasn_core_to_type'),
      },
    },
    {
      field: 'content_type',
      title: '内容类型',
      width: 150,
      cellRender: {
        name: 'CellTag',
        options: getDictOptions('hasn_core_content_type'),
      },
    },
    {
      field: 'msg_type',
      title: '消息类型',
      width: 150,
      cellRender: {
        name: 'CellTag',
        options: getDictOptions('hasn_core_msg_type'),
      },
    },
    {
      field: 'status',
      title: '消息状态',
      width: 150,
      cellRender: {
        name: 'CellTag',
        options: getDictOptions('hasn_core_status'),
      },
    },
    {
      field: 'priority',
      title: '优先级',
      width: 150,
    },
    {
      field: 'reply_to_id',
      title: '回复的消息 ID',
      width: 150,
    },
    {
      field: 'local_id',
      title: '客户端本地 ID',
      width: 150,
    },
    {
      field: 'recalled_at',
      title: '撤回时间',
      width: 150,
    },
    {
      field: 'recalled_by',
      title: '撤回者 hasn_id',
      width: 150,
    },
    {
      field: 'edited_at',
      title: '最后编辑时间',
      width: 150,
    },
    {
      field: 'edit_version',
      title: '编辑版本号',
      width: 150,
    },
    {
      field: 'server_received_at',
      title: '服务端接收时间',
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
    fieldName: 'conversation_id',
    label: '所属会话 ID',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'from_id',
    label: '发送方 hasn_id',
    rules: 'required',
  },
  {
    component: 'Select',
    fieldName: 'from_type',
    label: '发送方类型',
    rules: 'required',
    componentProps: {
      options: getDictOptions('hasn_core_from_type'),
    },
  },
  {
    component: 'Input',
    fieldName: 'to_id',
    label: '接收方 hasn_id',
    rules: 'required',
  },
  {
    component: 'Select',
    fieldName: 'to_type',
    label: '接收方类型',
    rules: 'required',
    componentProps: {
      options: getDictOptions('hasn_core_to_type'),
    },
  },
  {
    component: 'Select',
    fieldName: 'content_type',
    label: '内容类型',
    rules: 'required',
    componentProps: {
      options: getDictOptions('hasn_core_content_type'),
    },
  },
  {
    component: 'Textarea',
    fieldName: 'content',
    label: '消息内容',
    rules: 'required',
    componentProps: {"placeholder": "Enter JSON", "rows": 6},
  },
  {
    component: 'Select',
    fieldName: 'msg_type',
    label: '消息类型',
    rules: 'required',
    componentProps: {
      options: getDictOptions('hasn_core_msg_type'),
    },
  },
  {
    component: 'Select',
    fieldName: 'status',
    label: '消息状态',
    rules: 'required',
    componentProps: {
      options: getDictOptions('hasn_core_status'),
    },
  },
  {
    component: 'Input',
    fieldName: 'priority',
    label: '优先级',
    rules: 'required',
  },
  {
    component: 'InputNumber',
    fieldName: 'reply_to_id',
    label: '回复的消息 ID',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'Input',
    fieldName: 'local_id',
    label: '客户端本地 ID',
  },
  {
    component: 'Textarea',
    fieldName: 'context',
    label: '消息上下文',
    componentProps: {"placeholder": "Enter JSON", "rows": 6},
  },
  {
    component: 'DatePicker',
    fieldName: 'recalled_at',
    label: '撤回时间',
    componentProps: {"format": "YYYY-MM-DD HH:mm:ss", "showTime": true, "valueFormat": "YYYY-MM-DD HH:mm:ss"},
  },
  {
    component: 'Input',
    fieldName: 'recalled_by',
    label: '撤回者 hasn_id',
  },
  {
    component: 'DatePicker',
    fieldName: 'edited_at',
    label: '最后编辑时间',
    componentProps: {"format": "YYYY-MM-DD HH:mm:ss", "showTime": true, "valueFormat": "YYYY-MM-DD HH:mm:ss"},
  },
  {
    component: 'InputNumber',
    fieldName: 'edit_version',
    label: '编辑版本号',
    rules: 'required',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'DatePicker',
    fieldName: 'server_received_at',
    label: '服务端接收时间',
    rules: 'required',
    componentProps: {"format": "YYYY-MM-DD HH:mm:ss", "showTime": true, "valueFormat": "YYYY-MM-DD HH:mm:ss"},
  },
];
