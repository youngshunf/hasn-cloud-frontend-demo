import type { VbenFormSchema } from '#/adapter/form';
import type {
  OnActionClickFn,
  VxeGridProps,
} from '#/adapter/vxe-table';
import type { HasnConversations } from '#/api/hasn/hasn_conversations';

import { $t } from '@vben/locales';

import { getDictOptions } from '#/utils/dict';

/**
 * Query form schema
 */
export const querySchema: VbenFormSchema[] = [
  {
    component: '',
    fieldName: 'id',
    label: '会话 ID',
  },
  {
    component: 'Select',
    fieldName: 'type',
    label: '会话类型',
    componentProps: {
      allowClear: true,
      options: getDictOptions('hasn_type'),
    },
  },
  {
    component: 'Select',
    fieldName: 'relation_type',
    label: '关系类型',
    componentProps: {
      allowClear: true,
      options: getDictOptions('hasn_relation_type'),
    },
  },
  {
    component: 'Input',
    fieldName: 'participant_b_id',
    label: '参与方 B hasn_id',
    componentProps: {"placeholder": "Search by \u53c2\u4e0e\u65b9 B hasn_id\uff08\u5355\u804a\u5fc5\u586b\uff0c\u7fa4\u804a\u4e3a NULL\uff09"},
  },
  {
    component: 'Select',
    fieldName: 'participant_a_type',
    label: '参与方 A 类型',
    componentProps: {
      allowClear: true,
      options: getDictOptions('hasn_participant_a_type'),
    },
  },
  {
    component: 'Select',
    fieldName: 'participant_b_type',
    label: '参与方 B 类型',
    componentProps: {
      allowClear: true,
      options: getDictOptions('hasn_participant_b_type'),
    },
  },
  {
    component: '',
    fieldName: 'trade_session_id',
    label: '关联交易会话 ID',
  },
  {
    component: 'Input',
    fieldName: 'group_name',
    label: '群名称',
    componentProps: {"placeholder": "Search by \u7fa4\u540d\u79f0\uff08type=group \u65f6\u6709\u503c\uff09"},
  },
  {
    component: 'Input',
    fieldName: 'group_owner_id',
    label: '群主 hasn_id',
    componentProps: {"placeholder": "Search by \u7fa4\u4e3b hasn_id\uff08type=group \u65f6\u6709\u503c\uff09"},
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
  onActionClick?: OnActionClickFn<HasnConversations>,
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
      field: 'type',
      title: '会话类型',
      width: 150,
      cellRender: {
        name: 'CellTag',
        options: getDictOptions('hasn_type'),
      },
    },
    {
      field: 'relation_type',
      title: '关系类型',
      width: 150,
      cellRender: {
        name: 'CellTag',
        options: getDictOptions('hasn_relation_type'),
      },
    },
    {
      field: 'participant_b_id',
      title: '参与方 B hasn_id',
      width: 150,
    },
    {
      field: 'participant_a_type',
      title: '参与方 A 类型',
      width: 150,
      cellRender: {
        name: 'CellTag',
        options: getDictOptions('hasn_participant_a_type'),
      },
    },
    {
      field: 'participant_b_type',
      title: '参与方 B 类型',
      width: 150,
      cellRender: {
        name: 'CellTag',
        options: getDictOptions('hasn_participant_b_type'),
      },
    },
    {
      field: 'trade_session_id',
      title: '关联交易会话 ID',
      width: 150,
    },
    {
      field: 'group_name',
      title: '群名称',
      width: 150,
    },
    {
      field: 'group_avatar_url',
      title: '群头像 URL',
      width: 150,
    },
    {
      field: 'group_owner_id',
      title: '群主 hasn_id',
      width: 150,
    },
    {
      field: 'agent_policy',
      title: 'Agent 发言策略',
      width: 150,
    },
    {
      field: 'join_policy',
      title: '加入策略',
      width: 150,
    },
    {
      field: 'max_members',
      title: '最大成员数',
      width: 150,
    },
    {
      field: 'allow_invite',
      title: '成员是否可邀请',
      width: 150,
    },
    {
      field: 'mute_all',
      title: '全员禁言',
      width: 150,
    },
    {
      field: 'member_count',
      title: '当前成员数',
      width: 150,
    },
    {
      field: 'last_message_at',
      title: '最后消息时间',
      width: 150,
    },
    {
      field: 'last_message_preview',
      title: '最后消息预览',
      width: 150,
    },
    {
      field: 'last_message_from',
      title: '最后消息发送方 hasn_id',
      width: 150,
    },
    {
      field: 'message_count',
      title: '消息总数',
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
    fieldName: 'id',
    label: '会话 ID',
    rules: 'required',
  },
  {
    component: 'Select',
    fieldName: 'type',
    label: '会话类型',
    rules: 'required',
    componentProps: {
      options: getDictOptions('hasn_type'),
    },
  },
  {
    component: 'Select',
    fieldName: 'relation_type',
    label: '关系类型',
    componentProps: {
      options: getDictOptions('hasn_relation_type'),
    },
  },
  {
    component: 'Input',
    fieldName: 'participant_b_id',
    label: '参与方 B hasn_id',
  },
  {
    component: 'Select',
    fieldName: 'participant_a_type',
    label: '参与方 A 类型',
    rules: 'required',
    componentProps: {
      options: getDictOptions('hasn_participant_a_type'),
    },
  },
  {
    component: 'Select',
    fieldName: 'participant_b_type',
    label: '参与方 B 类型',
    componentProps: {
      options: getDictOptions('hasn_participant_b_type'),
    },
  },
  {
    component: 'Input',
    fieldName: 'trade_session_id',
    label: '关联交易会话 ID',
  },
  {
    component: 'Input',
    fieldName: 'group_name',
    label: '群名称',
  },
  {
    component: 'Textarea',
    fieldName: 'group_description',
    label: '群描述',
    componentProps: {"rows": 4},
  },
  {
    component: 'Textarea',
    fieldName: 'group_avatar_url',
    label: '群头像 URL',
    componentProps: {"rows": 4},
  },
  {
    component: 'Input',
    fieldName: 'group_owner_id',
    label: '群主 hasn_id',
  },
  {
    component: 'Input',
    fieldName: 'agent_policy',
    label: 'Agent 发言策略',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'join_policy',
    label: '加入策略',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'max_members',
    label: '最大成员数',
    rules: 'required',
  },
  {
    component: 'Switch',
    fieldName: 'allow_invite',
    label: '成员是否可邀请',
  },
  {
    component: 'Switch',
    fieldName: 'mute_all',
    label: '全员禁言',
  },
  {
    component: 'Input',
    fieldName: 'member_count',
    label: '当前成员数',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'last_message_at',
    label: '最后消息时间',
  },
  {
    component: 'Input',
    fieldName: 'last_message_preview',
    label: '最后消息预览',
  },
  {
    component: 'Input',
    fieldName: 'last_message_from',
    label: '最后消息发送方 hasn_id',
  },
  {
    component: 'Input',
    fieldName: 'message_count',
    label: '消息总数',
    rules: 'required',
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
