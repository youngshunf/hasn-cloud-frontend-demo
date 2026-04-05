import type { VbenFormSchema } from '#/adapter/form';
import type {
  OnActionClickFn,
  VxeGridProps,
} from '#/adapter/vxe-table';
import type { HasnNodes } from '#/api/hasn/hasn_nodes';

import { $t } from '@vben/locales';

import { getDictOptions } from '#/utils/dict';

/**
 * Query form schema
 */
export const querySchema: VbenFormSchema[] = [
  {
    component: 'Input',
    fieldName: 'node_id',
    label: '节点唯一标识',
    componentProps: {"placeholder": "Search by \u8282\u70b9\u552f\u4e00\u6807\u8bc6 (\u683c\u5f0f: n_{uuid_short})"},
  },
  {
    component: 'Select',
    fieldName: 'node_type',
    label: '节点类型',
    componentProps: {
      allowClear: true,
      options: getDictOptions('hasn_node_type'),
    },
  },
  {
    component: 'Input',
    fieldName: 'node_name',
    label: '节点名称',
    componentProps: {"placeholder": "Search by \u8282\u70b9\u540d\u79f0"},
  },
  {
    component: 'Input',
    fieldName: 'created_by_owner_id',
    label: '初始创建 Owner',
    componentProps: {"placeholder": "Search by \u521d\u59cb\u521b\u5efa Owner\uff08\u4ec5\u5ba1\u8ba1\u7528\u9014\uff09"},
  },
  {
    component: 'RangePicker',
    fieldName: 'last_seen_at',
    label: '最后活跃时间',
    componentProps: {"format": "YYYY-MM-DD"},
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
  onActionClick?: OnActionClickFn<HasnNodes>,
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
      field: 'node_id',
      title: '节点唯一标识',
      width: 150,
    },
    {
      field: 'node_type',
      title: '节点类型',
      width: 150,
      cellRender: {
        name: 'CellTag',
        options: getDictOptions('hasn_node_type'),
      },
    },
    {
      field: 'node_name',
      title: '节点名称',
      width: 150,
    },
    {
      field: 'node_key_hash',
      title: 'Node Key 的 SHA256 哈希',
      width: 150,
    },
    {
      field: 'capacity',
      title: '最大 Agent 承载量',
      width: 150,
    },
    {
      field: 'created_by_owner_id',
      title: '初始创建 Owner',
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
    fieldName: 'node_id',
    label: '节点唯一标识',
    rules: 'required',
  },
  {
    component: 'Select',
    fieldName: 'node_type',
    label: '节点类型',
    rules: 'required',
    componentProps: {
      options: getDictOptions('hasn_node_type'),
    },
  },
  {
    component: 'Input',
    fieldName: 'node_name',
    label: '节点名称',
  },
  {
    component: 'Textarea',
    fieldName: 'node_info',
    label: '节点信息 JSON',
    rules: 'required',
    componentProps: {"placeholder": "Enter JSON", "rows": 6},
  },
  {
    component: 'Input',
    fieldName: 'node_key_hash',
    label: 'Node Key 的 SHA256 哈希',
  },
  {
    component: 'InputNumber',
    fieldName: 'capacity',
    label: '最大 Agent 承载量',
    rules: 'required',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'Input',
    fieldName: 'created_by_owner_id',
    label: '初始创建 Owner',
  },
  {
    component: 'DatePicker',
    fieldName: 'last_seen_at',
    label: '最后活跃时间',
    componentProps: {"format": "YYYY-MM-DD HH:mm:ss", "showTime": true, "valueFormat": "YYYY-MM-DD HH:mm:ss"},
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
