import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeGridProps } from '#/adapter/vxe-table';
import type { HasnEnterpriseMemberRole } from '#/api/hasn/hasn_enterprise_member_role';

import { $t } from '@vben/locales';

/**
 * Query form schema
 */
export const querySchema: VbenFormSchema[] = [
  {
    component: 'InputNumber',
    fieldName: 'enterprise_id',
    label: '所属企业 ID',
    componentProps: { style: 'width: 100%' },
  },
  {
    component: 'InputNumber',
    fieldName: 'user_id',
    label: '成员 sys_user.id',
    componentProps: { style: 'width: 100%' },
  },
  {
    component: 'InputNumber',
    fieldName: 'role_id',
    label: '企业角色 / 部门 ID',
    componentProps: { style: 'width: 100%' },
  },
];

/**
 * Table columns configuration
 */
export function useColumns(
  onActionClick?: OnActionClickFn<HasnEnterpriseMemberRole>,
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
      field: 'enterprise_id',
      title: '所属企业 ID',
      width: 150,
    },
    {
      field: 'user_id',
      title: '成员 sys_user.id',
      width: 150,
    },
    {
      field: 'role_id',
      title: '企业角色 / 部门 ID',
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
    fieldName: 'enterprise_id',
    label: '所属企业 ID',
    rules: 'required',
    componentProps: { style: 'width: 100%' },
  },
  {
    component: 'InputNumber',
    fieldName: 'user_id',
    label: '成员 sys_user.id',
    rules: 'required',
    componentProps: { style: 'width: 100%' },
  },
  {
    component: 'InputNumber',
    fieldName: 'role_id',
    label: '企业角色 / 部门 ID',
    rules: 'required',
    componentProps: { style: 'width: 100%' },
  },
];
