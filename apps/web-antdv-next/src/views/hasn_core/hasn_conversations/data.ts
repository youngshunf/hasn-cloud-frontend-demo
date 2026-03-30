import type { VbenFormSchema } from '#/adapter/form';
import type {
  OnActionClickFn,
  VxeGridProps,
} from '#/adapter/vxe-table';
import type { HasnConversations } from '#/api/hasn_core/hasn_conversations';

import { $t } from '@vben/locales';

import { getDictOptions } from '#/utils/dict';

/**
 * Query form schema
 */
export const querySchema: VbenFormSchema[] = [
  {
    component: 'Select',
    fieldName: 'type',
    label: '类型',
    componentProps: {
      allowClear: true,
      options: getDictOptions('hasn_core_type'),
    },
  },
  {
    component: 'Input',
    fieldName: 'name',
    label: '群名称',
    componentProps: {"placeholder": "Search by \u7fa4\u540d\u79f0"},
  },
  {
    component: 'Input',
    fieldName: 'group_star_id',
    label: '群唤星号',
    componentProps: {"placeholder": "Search by \u7fa4\u5524\u661f\u53f7 (g:500001)"},
  },
  {
    component: 'Input',
    fieldName: 'creator_id',
    label: '群创建者 hasn_id',
    componentProps: {"placeholder": "Search by \u7fa4\u521b\u5efa\u8005 hasn_id"},
  },
  {
    component: 'RangePicker',
    fieldName: 'last_message_at',
    label: '最后消息时间',
    componentProps: {"format": "YYYY-MM-DD"},
  },
  {
    component: 'Select',
    fieldName: 'status',
    label: '状态',
    componentProps: {
      allowClear: true,
      options: getDictOptions('hasn_core_status'),
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
      title: '类型',
      width: 150,
      cellRender: {
        name: 'CellTag',
        options: getDictOptions('hasn_core_type'),
      },
    },
    {
      field: 'participant_a',
      title: '参与者A hasn_id',
      width: 150,
    },
    {
      field: 'participant_b',
      title: '参与者B hasn_id',
      width: 150,
    },
    {
      field: 'name',
      title: '群名称',
      width: 150,
    },
    {
      field: 'group_star_id',
      title: '群唤星号',
      width: 150,
    },
    {
      field: 'group_avatar',
      title: '群头像',
      width: 150,
    },
    {
      field: 'agent_policy',
      title: 'Agent 发言策略',
      width: 150,
    },
    {
      field: 'max_members',
      title: '群最大成员数',
      width: 150,
    },
    {
      field: 'creator_id',
      title: '群创建者 hasn_id',
      width: 150,
    },
    {
      field: 'last_message_at',
      title: '最后消息时间',
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
        options: getDictOptions('hasn_core_status'),
      },
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
    component: 'Select',
    fieldName: 'type',
    label: '类型',
    rules: 'required',
    componentProps: {
      options: getDictOptions('hasn_core_type'),
    },
  },
  {
    component: 'Input',
    fieldName: 'participant_a',
    label: '参与者A hasn_id',
  },
  {
    component: 'Input',
    fieldName: 'participant_b',
    label: '参与者B hasn_id',
  },
  {
    component: 'Input',
    fieldName: 'name',
    label: '群名称',
  },
  {
    component: 'Input',
    fieldName: 'group_star_id',
    label: '群唤星号',
  },
  {
    component: 'Textarea',
    fieldName: 'group_avatar',
    label: '群头像',
    componentProps: {"rows": 4},
  },
  {
    component: 'Textarea',
    fieldName: 'group_description',
    label: '群描述',
    componentProps: {"rows": 4},
  },
  {
    component: 'Input',
    fieldName: 'agent_policy',
    label: 'Agent 发言策略',
    rules: 'required',
  },
  {
    component: 'InputNumber',
    fieldName: 'max_members',
    label: '群最大成员数',
    rules: 'required',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'Input',
    fieldName: 'creator_id',
    label: '群创建者 hasn_id',
  },
  {
    component: 'DatePicker',
    fieldName: 'last_message_at',
    label: '最后消息时间',
    componentProps: {"format": "YYYY-MM-DD HH:mm:ss", "showTime": true, "valueFormat": "YYYY-MM-DD HH:mm:ss"},
  },
  {
    component: 'Textarea',
    fieldName: 'last_message_preview',
    label: '最后消息预览',
    componentProps: {"rows": 4},
  },
  {
    component: 'InputNumber',
    fieldName: 'message_count',
    label: '消息总数',
    rules: 'required',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'Select',
    fieldName: 'status',
    label: '状态',
    rules: 'required',
    componentProps: {
      options: getDictOptions('hasn_core_status'),
    },
  },
];
