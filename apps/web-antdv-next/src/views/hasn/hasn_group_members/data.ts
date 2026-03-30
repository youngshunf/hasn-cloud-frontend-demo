import type { VbenFormSchema } from '#/adapter/form';
import type {
  OnActionClickFn,
  VxeGridProps,
} from '#/adapter/vxe-table';
import type { HasnGroupMembers } from '#/api/hasn/hasn_group_members';

import { $t } from '@vben/locales';

import { getDictOptions } from '#/utils/dict';

/**
 * Query form schema
 */
export const querySchema: VbenFormSchema[] = [
  {
    component: '',
    fieldName: 'conversation_id',
    label: '群会话 ID',
  },
  {
    component: 'Input',
    fieldName: 'member_id',
    label: '成员 hasn_id',
    componentProps: {"placeholder": "Search by \u6210\u5458 hasn_id"},
  },
  {
    component: 'Select',
    fieldName: 'member_type',
    label: '成员类型',
    componentProps: {
      allowClear: true,
      options: getDictOptions('hasn_member_type'),
    },
  },
  {
    component: 'Input',
    fieldName: 'member_star_id',
    label: '成员唤星号',
    componentProps: {"placeholder": "Search by \u6210\u5458\u5524\u661f\u53f7"},
  },
  {
    component: 'Input',
    fieldName: 'member_name',
    label: '成员名称',
    componentProps: {"placeholder": "Search by \u6210\u5458\u540d\u79f0"},
  },
];

/**
 * Table columns configuration
 */
export function useColumns(
  onActionClick?: OnActionClickFn<HasnGroupMembers>,
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
      title: '群会话 ID',
      width: 150,
    },
    {
      field: 'member_id',
      title: '成员 hasn_id',
      width: 150,
    },
    {
      field: 'member_type',
      title: '成员类型',
      width: 150,
      cellRender: {
        name: 'CellTag',
        options: getDictOptions('hasn_member_type'),
      },
    },
    {
      field: 'member_star_id',
      title: '成员唤星号',
      width: 150,
    },
    {
      field: 'member_name',
      title: '成员名称',
      width: 150,
    },
    {
      field: 'role',
      title: '角色',
      width: 150,
    },
    {
      field: 'muted',
      title: '是否免打扰',
      width: 150,
    },
    {
      field: 'joined_at',
      title: '加入时间',
      width: 150,
    },
    {
      field: 'invited_by',
      title: '邀请者 hasn_id',
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
    fieldName: 'conversation_id',
    label: '群会话 ID',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'member_id',
    label: '成员 hasn_id',
    rules: 'required',
  },
  {
    component: 'Select',
    fieldName: 'member_type',
    label: '成员类型',
    rules: 'required',
    componentProps: {
      options: getDictOptions('hasn_member_type'),
    },
  },
  {
    component: 'Input',
    fieldName: 'member_star_id',
    label: '成员唤星号',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'member_name',
    label: '成员名称',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'role',
    label: '角色',
    rules: 'required',
  },
  {
    component: 'Switch',
    fieldName: 'muted',
    label: '是否免打扰',
  },
  {
    component: 'Input',
    fieldName: 'joined_at',
    label: '加入时间',
  },
  {
    component: 'Input',
    fieldName: 'invited_by',
    label: '邀请者 hasn_id',
  },
];
