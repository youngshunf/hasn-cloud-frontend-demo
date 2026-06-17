import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeGridProps } from '#/adapter/vxe-table';
import type { HasnEnterpriseRole } from '#/api/hasn/hasn_enterprise_role';

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
    component: 'Input',
    fieldName: 'name',
    label: '角色 / 部门名称',
    componentProps: {
      placeholder:
        'Search by \u89D2\u8272 / \u90E8\u95E8\u540D\u79F0\uFF08\u5982\u300C\u9500\u552E\u90E8\u300D\u300C\u8D22\u52A1\u300D\uFF09',
    },
  },
];

/**
 * Table columns configuration
 */
export function useColumns(
  onActionClick?: OnActionClickFn<HasnEnterpriseRole>,
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
      field: 'name',
      title: '角色 / 部门名称',
      width: 150,
    },
    {
      field: 'kind',
      title: '类型',
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
    component: 'Input',
    fieldName: 'name',
    label: '角色 / 部门名称',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'kind',
    label: '类型',
    rules: 'required',
  },
];
