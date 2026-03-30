import type { VbenFormSchema } from '#/adapter/form';
import type {
  OnActionClickFn,
  VxeGridProps,
} from '#/adapter/vxe-table';
import type { HasnClients } from '#/api/hasn/hasn_clients';

import { $t } from '@vben/locales';

import { getDictOptions } from '#/utils/dict';

/**
 * Query form schema
 */
export const querySchema: VbenFormSchema[] = [
  {
    component: 'Input',
    fieldName: 'client_id',
    label: '客户端唯一标识',
    componentProps: {"placeholder": "Search by \u5ba2\u6237\u7aef\u552f\u4e00\u6807\u8bc6 (\u683c\u5f0f: c_{uuid_short})"},
  },
  {
    component: 'Input',
    fieldName: 'user_hasn_id',
    label: '所属 Human 的 hasn_id',
    componentProps: {"placeholder": "Search by \u6240\u5c5e Human \u7684 hasn_id\uff08\u683c\u5f0f: h_xxx\uff09"},
  },
  {
    component: 'Select',
    fieldName: 'client_type',
    label: '客户端类型',
    componentProps: {
      allowClear: true,
      options: getDictOptions('hasn_client_type'),
    },
  },
  {
    component: 'Input',
    fieldName: 'device_name',
    label: '设备名称',
    componentProps: {"placeholder": "Search by \u8bbe\u5907\u540d\u79f0"},
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
  onActionClick?: OnActionClickFn<HasnClients>,
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
      field: 'client_id',
      title: '客户端唯一标识',
      width: 150,
    },
    {
      field: 'user_hasn_id',
      title: '所属 Human 的 hasn_id',
      width: 150,
    },
    {
      field: 'client_type',
      title: '客户端类型',
      width: 150,
      cellRender: {
        name: 'CellTag',
        options: getDictOptions('hasn_client_type'),
      },
    },
    {
      field: 'device_name',
      title: '设备名称',
      width: 150,
    },
    {
      field: 'last_seen_at',
      title: '最后活跃时间',
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
    fieldName: 'client_id',
    label: '客户端唯一标识',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'user_hasn_id',
    label: '所属 Human 的 hasn_id',
    rules: 'required',
  },
  {
    component: 'Select',
    fieldName: 'client_type',
    label: '客户端类型',
    rules: 'required',
    componentProps: {
      options: getDictOptions('hasn_client_type'),
    },
  },
  {
    component: 'Input',
    fieldName: 'device_name',
    label: '设备名称',
  },
  {
    component: 'Textarea',
    fieldName: 'device_info',
    label: '设备信息',
    rules: 'required',
    componentProps: {"placeholder": "Enter JSON", "rows": 6},
  },
  {
    component: 'Input',
    fieldName: 'last_seen_at',
    label: '最后活跃时间',
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
