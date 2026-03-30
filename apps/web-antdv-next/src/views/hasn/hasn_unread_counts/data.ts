import type { VbenFormSchema } from '#/adapter/form';
import type {
  OnActionClickFn,
  VxeGridProps,
} from '#/adapter/vxe-table';
import type { HasnUnreadCounts } from '#/api/hasn/hasn_unread_counts';

import { $t } from '@vben/locales';

/**
 * Query form schema
 */
export const querySchema: VbenFormSchema[] = [
  {
    component: 'Input',
    fieldName: 'hasn_id',
    label: '用户/Agent 的 hasn_id',
    componentProps: {"placeholder": "Search by \u7528\u6237/Agent \u7684 hasn_id"},
  },
  {
    component: '',
    fieldName: 'conversation_id',
    label: '会话 ID',
  },
  {
    component: '',
    fieldName: 'last_read_msg_id',
    label: '最后已读消息 ID',
  },
];

/**
 * Table columns configuration
 */
export function useColumns(
  onActionClick?: OnActionClickFn<HasnUnreadCounts>,
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
      field: 'hasn_id',
      title: '用户/Agent 的 hasn_id',
      width: 150,
    },
    {
      field: 'conversation_id',
      title: '会话 ID',
      width: 150,
    },
    {
      field: 'unread_count',
      title: '未读消息数',
      width: 150,
    },
    {
      field: 'last_read_msg_id',
      title: '最后已读消息 ID',
      width: 150,
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
    fieldName: 'hasn_id',
    label: '用户/Agent 的 hasn_id',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'conversation_id',
    label: '会话 ID',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'unread_count',
    label: '未读消息数',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'last_read_msg_id',
    label: '最后已读消息 ID',
    rules: 'required',
  },
];
