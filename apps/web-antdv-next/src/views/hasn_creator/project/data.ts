import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeGridProps } from '#/adapter/vxe-table';
import type { Project } from '#/api/hasn_creator/project';

import { $t } from '@vben/locales';

import { getDictOptions } from '#/utils/dict';

/**
 * Query form schema
 */
export const querySchema: VbenFormSchema[] = [
  {
    component: 'InputNumber',
    fieldName: 'user_id',
    label: 'user_id',
    componentProps: { style: 'width: 100%' },
  },
  {
    component: 'InputNumber',
    fieldName: 'enterprise_id',
    label: '企业 ID',
    componentProps: { style: 'width: 100%' },
  },
  {
    component: 'Input',
    fieldName: 'assignee_agent_id',
    label: '负责运营的分身 hasn_id',
    componentProps: {
      placeholder:
        'Search by \u8D1F\u8D23\u8FD0\u8425\u7684\u5206\u8EAB hasn_id\uFF08\u00A78.4 \u4E3B\u8111 re-bind\uFF09',
    },
  },
  {
    component: 'Input',
    fieldName: 'name',
    label: 'name',
    componentProps: { placeholder: 'Search by name' },
  },
  {
    component: 'InputNumber',
    fieldName: 'playbook_id',
    label: '采用的账号打法',
    componentProps: { style: 'width: 100%' },
  },
  {
    component: 'Select',
    fieldName: 'status',
    label: '状态',
    componentProps: {
      allowClear: true,
      options: getDictOptions('hasn_creator_status'),
    },
  },
];

/**
 * Table columns configuration
 */
export function useColumns(
  onActionClick?: OnActionClickFn<Project>,
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
      field: 'project_no',
      title: 'project_no',
      width: 150,
    },
    {
      field: 'user_id',
      title: 'user_id',
      width: 150,
    },
    {
      field: 'owner_scope',
      title: '归属模式',
      width: 150,
    },
    {
      field: 'enterprise_id',
      title: '企业 ID',
      width: 150,
    },
    {
      field: 'assignee',
      title: '负责运营的人 hasn_id',
      width: 150,
    },
    {
      field: 'assignee_agent_id',
      title: '负责运营的分身 hasn_id',
      width: 150,
    },
    {
      field: 'name',
      title: 'name',
      width: 150,
    },
    {
      field: 'primary_platform',
      title: '主平台',
      width: 150,
    },
    {
      field: 'pipeline_mode',
      title: '运营自主度',
      width: 150,
    },
    {
      field: 'playbook_id',
      title: '采用的账号打法',
      width: 150,
    },
    {
      field: 'status',
      title: '状态',
      width: 150,
      cellRender: {
        name: 'CellTag',
        options: getDictOptions('hasn_creator_status'),
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
    component: 'Input',
    fieldName: 'project_no',
    label: 'project_no',
    rules: 'required',
  },
  {
    component: 'InputNumber',
    fieldName: 'user_id',
    label: 'user_id',
    rules: 'required',
    componentProps: { style: 'width: 100%' },
  },
  {
    component: 'Input',
    fieldName: 'owner_scope',
    label: '归属模式',
    rules: 'required',
  },
  {
    component: 'InputNumber',
    fieldName: 'enterprise_id',
    label: '企业 ID',
    componentProps: { style: 'width: 100%' },
  },
  {
    component: 'Input',
    fieldName: 'assignee',
    label: '负责运营的人 hasn_id',
  },
  {
    component: 'Input',
    fieldName: 'assignee_agent_id',
    label: '负责运营的分身 hasn_id',
  },
  {
    component: 'Input',
    fieldName: 'name',
    label: 'name',
    rules: 'required',
  },
  {
    component: 'Textarea',
    fieldName: 'description',
    label: 'description',
    componentProps: { rows: 4 },
  },
  {
    component: 'Input',
    fieldName: 'primary_platform',
    label: '主平台',
  },
  {
    component: 'Input',
    fieldName: 'pipeline_mode',
    label: '运营自主度',
    rules: 'required',
  },
  {
    component: 'InputNumber',
    fieldName: 'playbook_id',
    label: '采用的账号打法',
    componentProps: { style: 'width: 100%' },
  },
  {
    component: 'Select',
    fieldName: 'status',
    label: '状态',
    rules: 'required',
    componentProps: {
      options: getDictOptions('hasn_creator_status'),
    },
  },
];
