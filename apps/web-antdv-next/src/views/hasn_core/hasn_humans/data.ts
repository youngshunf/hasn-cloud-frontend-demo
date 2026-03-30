import type { VbenFormSchema } from '#/adapter/form';
import type {
  OnActionClickFn,
  VxeGridProps,
} from '#/adapter/vxe-table';
import type { HasnHumans } from '#/api/hasn_core/hasn_humans';

import { $t } from '@vben/locales';

import { getDictOptions } from '#/utils/dict';

/**
 * Query form schema
 */
export const querySchema: VbenFormSchema[] = [
  {
    component: 'Input',
    fieldName: 'star_id',
    label: '唤星号',
    componentProps: {"placeholder": "Search by \u5524\u661f\u53f7 (100001 / fuzi)"},
  },
  {
    component: 'Input',
    fieldName: 'name',
    label: '昵称/显示名',
    componentProps: {"placeholder": "Search by \u6635\u79f0/\u663e\u793a\u540d"},
  },
  {
    component: 'Input',
    fieldName: 'huanxing_user_id',
    label: '关联唤星平台 user_id',
    componentProps: {"placeholder": "Search by \u5173\u8054\u5524\u661f\u5e73\u53f0 user_id"},
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
  {
    component: 'RangePicker',
    fieldName: 'last_online_at',
    label: '最后在线时间',
    componentProps: {"format": "YYYY-MM-DD"},
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
      field: 'star_id',
      title: '唤星号',
      width: 150,
    },
    {
      field: 'name',
      title: '昵称/显示名',
      width: 150,
    },
    {
      field: 'huanxing_user_id',
      title: '关联唤星平台 user_id',
      width: 150,
    },
    {
      field: 'avatar_url',
      title: '头像URL',
      width: 150,
    },
    {
      field: 'phone',
      title: '手机号',
      width: 150,
    },
    {
      field: 'phone_hash',
      title: '手机号 SHA256 哈希',
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
      field: 'last_online_at',
      title: '最后在线时间',
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
    fieldName: 'star_id',
    label: '唤星号',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'name',
    label: '昵称/显示名',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'huanxing_user_id',
    label: '关联唤星平台 user_id',
  },
  {
    component: 'Textarea',
    fieldName: 'bio',
    label: '个人简介',
    rules: 'required',
    componentProps: {"rows": 4},
  },
  {
    component: 'Textarea',
    fieldName: 'avatar_url',
    label: '头像URL',
    componentProps: {"rows": 4},
  },
  {
    component: 'Input',
    fieldName: 'phone',
    label: '手机号',
  },
  {
    component: 'Input',
    fieldName: 'phone_hash',
    label: '手机号 SHA256 哈希',
  },
  {
    component: 'Textarea',
    fieldName: 'profile',
    label: '完整 Profile Card',
    rules: 'required',
    componentProps: {"placeholder": "Enter JSON", "rows": 6},
  },
  {
    component: 'Textarea',
    fieldName: 'privacy_rules',
    label: '隐私策略配置',
    rules: 'required',
    componentProps: {"placeholder": "Enter JSON", "rows": 6},
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
  {
    component: 'DatePicker',
    fieldName: 'last_online_at',
    label: '最后在线时间',
    componentProps: {"format": "YYYY-MM-DD HH:mm:ss", "showTime": true, "valueFormat": "YYYY-MM-DD HH:mm:ss"},
  },
];
