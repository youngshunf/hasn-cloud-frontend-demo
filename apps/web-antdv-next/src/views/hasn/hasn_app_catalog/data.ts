import type { VbenFormSchema } from '#/adapter/form';
import type {
  OnActionClickFn,
  VxeGridProps,
} from '#/adapter/vxe-table';
import type { HasnAppCatalog } from '#/api/hasn/hasn_app_catalog';

import { $t } from '@vben/locales';

import { getDictOptions } from '#/utils/dict';

/**
 * Query form schema
 */
export const querySchema: VbenFormSchema[] = [
  {
    component: 'Input',
    fieldName: 'app_id',
    label: '应用唯一标识',
    componentProps: {"placeholder": "Search by \u5e94\u7528\u552f\u4e00\u6807\u8bc6\uff08\u4e0e manifest.app_id / WorkbenchApp.id \u4e00\u81f4\uff09"},
  },
  {
    component: 'Input',
    fieldName: 'name',
    label: '显示名称',
    componentProps: {"placeholder": "Search by \u663e\u793a\u540d\u79f0"},
  },
  {
    component: 'Select',
    fieldName: 'status',
    label: '上架状态',
    componentProps: {
      allowClear: true,
      options: getDictOptions('hasn_status'),
    },
  },
  {
    component: 'Select',
    fieldName: 'access_type',
    label: '准入类型',
    componentProps: {
      allowClear: true,
      options: getDictOptions('hasn_access_type'),
    },
  },
];

/**
 * Table columns configuration
 */
export function useColumns(
  onActionClick?: OnActionClickFn<HasnAppCatalog>,
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
      field: 'app_id',
      title: '应用唯一标识',
      width: 150,
    },
    {
      field: 'name',
      title: '显示名称',
      width: 150,
    },
    {
      field: 'icon',
      title: '图标 token',
      width: 150,
    },
    {
      field: 'icon_asset_uri',
      title: '自定义图标资产 URI',
      width: 150,
    },
    {
      field: 'description',
      title: '应用描述',
      width: 150,
    },
    {
      field: 'source',
      title: '来源',
      width: 150,
    },
    {
      field: 'status',
      title: '上架状态',
      width: 150,
      cellRender: {
        name: 'CellTag',
        options: getDictOptions('hasn_status'),
      },
    },
    {
      field: 'execution_mode',
      title: '执行形态',
      width: 150,
    },
    {
      field: 'collaboration_mode',
      title: '协作模式',
      width: 150,
    },
    {
      field: 'entry_route',
      title: '客户端原生路由',
      width: 150,
    },
    {
      field: 'sort_order',
      title: '工作台排序',
      width: 150,
    },
    {
      field: 'default_mount',
      title: '新空间是否自动挂载',
      width: 150,
    },
    {
      field: 'requires_role',
      title: '企业空间所需角色',
      width: 150,
    },
    {
      field: 'access_type',
      title: '准入类型',
      width: 150,
      cellRender: {
        name: 'CellTag',
        options: getDictOptions('hasn_access_type'),
      },
    },
    {
      field: 'min_tier',
      title: '订阅准入所需最低档',
      width: 150,
    },
    {
      field: 'price_amount',
      title: '购买价格',
      width: 150,
    },
    {
      field: 'price_unit',
      title: '计价单位',
      width: 150,
    },
    {
      field: 'billing_cycle',
      title: '计费周期',
      width: 150,
    },
    {
      field: 'trial_days',
      title: '试用天数',
      width: 150,
    },
    {
      field: 'sku_ref',
      title: '对接计费商品/订单 SKU',
      width: 150,
    },
    {
      field: 'manifest_present',
      title: '是否有对应 code manifest',
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
    fieldName: 'app_id',
    label: '应用唯一标识',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'name',
    label: '显示名称',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'icon',
    label: '图标 token',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'icon_asset_uri',
    label: '自定义图标资产 URI',
  },
  {
    component: 'Input',
    fieldName: 'description',
    label: '应用描述',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'source',
    label: '来源',
    rules: 'required',
  },
  {
    component: 'Select',
    fieldName: 'status',
    label: '上架状态',
    rules: 'required',
    componentProps: {
      options: getDictOptions('hasn_status'),
    },
  },
  {
    component: 'Input',
    fieldName: 'execution_mode',
    label: '执行形态',
    rules: 'required',
  },
  {
    component: 'Textarea',
    fieldName: 'scope',
    label: '可挂载空间类型 JSONB',
    rules: 'required',
    componentProps: {"placeholder": "Enter JSON", "rows": 6},
  },
  {
    component: 'Input',
    fieldName: 'collaboration_mode',
    label: '协作模式',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'entry_route',
    label: '客户端原生路由',
    rules: 'required',
  },
  {
    component: 'InputNumber',
    fieldName: 'sort_order',
    label: '工作台排序',
    rules: 'required',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'Switch',
    fieldName: 'default_mount',
    label: '新空间是否自动挂载',
  },
  {
    component: 'Input',
    fieldName: 'requires_role',
    label: '企业空间所需角色',
  },
  {
    component: 'Select',
    fieldName: 'access_type',
    label: '准入类型',
    rules: 'required',
    componentProps: {
      options: getDictOptions('hasn_access_type'),
    },
  },
  {
    component: 'Input',
    fieldName: 'min_tier',
    label: '订阅准入所需最低档',
  },
  {
    component: 'InputNumber',
    fieldName: 'price_amount',
    label: '购买价格',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'Input',
    fieldName: 'price_unit',
    label: '计价单位',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'billing_cycle',
    label: '计费周期',
    rules: 'required',
  },
  {
    component: 'InputNumber',
    fieldName: 'trial_days',
    label: '试用天数',
    rules: 'required',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'Input',
    fieldName: 'sku_ref',
    label: '对接计费商品/订单 SKU',
  },
  {
    component: 'Switch',
    fieldName: 'manifest_present',
    label: '是否有对应 code manifest',
  },
];
