import type { VbenFormSchema } from '#/adapter/form';
import type {
  OnActionClickFn,
  VxeGridProps,
} from '#/adapter/vxe-table';
import type { HasnHumans } from '#/api/hasn/hasn_humans';

import { $t } from '@vben/locales';

import { getDictOptions } from '#/utils/dict';

/**
 * Query form schema
 */
export const querySchema: VbenFormSchema[] = [
  {
    component: 'Input',
    fieldName: 'hasn_id',
    label: 'HASN 唯一标识',
    componentProps: {"placeholder": "Search by HASN \u552f\u4e00\u6807\u8bc6 (h_{uuid})"},
  },
  {
    component: 'Input',
    fieldName: 'star_id',
    label: '唤星号',
    componentProps: {"placeholder": "Search by \u5524\u661f\u53f7 (\u6570\u5b57\u53f7\u6216\u81ea\u5b9a\u4e49\u53f7)"},
  },
  {
    component: '',
    fieldName: 'user_id',
    label: '关联唤星平台用户 ID',
  },
  {
    component: 'Input',
    fieldName: 'nickname',
    label: '昵称',
    componentProps: {"placeholder": "Search by \u663e\u793a\u540d\u79f0"},
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
  onActionClick?: OnActionClickFn<HasnHumans>,
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
      title: 'HASN 唯一标识',
      width: 150,
    },
    {
      field: 'star_id',
      title: '唤星号',
      width: 150,
    },
    {
      field: 'user_id',
      title: '关联唤星平台用户 ID',
      width: 150,
    },
    {
      field: 'nickname',
      title: '昵称',
      width: 150,
    },
    {
      field: 'avatar',
      title: '头像',
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
      field: 'timezone',
      title: '时区',
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
    label: 'HASN 唯一标识',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'star_id',
    label: '唤星号',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'user_id',
    label: '关联唤星平台用户 ID',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'nickname',
    label: '昵称',
    rules: 'required',
  },
  {
    component: 'Textarea',
    fieldName: 'bio',
    label: '个人简介',
    componentProps: {"rows": 4},
  },
  {
    component: 'Textarea',
    fieldName: 'avatar',
    label: '头像',
    componentProps: {"rows": 4},
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
  {
    component: 'Textarea',
    fieldName: 'contact_policy',
    label: '联系人策略',
    rules: 'required',
    componentProps: {"placeholder": "Enter JSON", "rows": 6},
  },
  {
    component: 'Input',
    fieldName: 'timezone',
    label: '时区',
  },
  {
    component: 'Textarea',
    fieldName: 'tags',
    label: '个人标签',
    componentProps: {"rows": 4},
  },
  {
    component: 'Textarea',
    fieldName: 'stats',
    label: '统计信息',
    rules: 'required',
    componentProps: {"placeholder": "Enter JSON", "rows": 6},
  },
];
