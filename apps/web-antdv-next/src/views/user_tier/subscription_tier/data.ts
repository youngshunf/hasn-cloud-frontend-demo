import type { VbenFormSchema } from '#/adapter/form';
import type {
  OnActionClickFn,
  VxeGridProps,
} from '#/adapter/vxe-table';
import type { SubscriptionTier } from '#/api/user_tier/subscription_tier';

import { $t } from '@vben/locales';

import { getDictOptions } from '#/utils/dict';

/**
 * Query form schema
 */
export const querySchema: VbenFormSchema[] = [
  {
    component: 'Select',
    fieldName: 'app_code',
    label: '应用',
    componentProps: {
      allowClear: true,
      options: getDictOptions('sys_app_code'),
    },
  },
  {
    component: 'Input',
    fieldName: 'tier_name',
    label: '等级标识',
    componentProps: {"placeholder": "Search by \u7b49\u7ea7\u6807\u8bc6 (free:\u514d\u8d39\u7248/basic:\u57fa\u7840\u7248/pro:\u4e13\u4e1a\u7248/enterprise:\u4f01\u4e1a\u7248)"},
  },
  {
    component: 'Input',
    fieldName: 'display_name',
    label: '显示名称',
    componentProps: {"placeholder": "Search by \u663e\u793a\u540d\u79f0"},
  },
];

/**
 * Table columns configuration
 */
export function useColumns(
  onActionClick?: OnActionClickFn<SubscriptionTier>,
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
      field: 'app_code',
      title: '应用',
      width: 100,
      cellRender: {
        name: 'CellTag',
        options: getDictOptions('sys_app_code'),
      },
    },
    {
      field: 'tier_name',
      title: '等级标识',
      width: 150,
    },
    {
      field: 'display_name',
      title: '显示名称',
      width: 150,
    },
    {
      field: 'monthly_credits',
      title: '每月赠送积分',
      width: 150,
    },
    {
      field: 'monthly_price',
      title: '月费',
      width: 120,
    },
    {
      field: 'yearly_price',
      title: '年费',
      width: 120,
    },
    {
      field: 'yearly_discount',
      title: '年费折扣',
      width: 100,
      formatter: ({ cellValue }) => cellValue ? `${(cellValue * 100).toFixed(0)}%` : '-',
    },
    {
      field: 'newapi_quota_display',
      title: 'New-API 额度',
      width: 140,
      formatter: ({ row }: { row: any }) => {
        const q = row.features?.newapi_quota;
        if (!q) return '默认';
        const v = Number(q);
        if (v >= 1_000_000_000) return `${(v / 1_000_000_000).toFixed(1)}B`;
        if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(1)}M`;
        return String(v);
      },
    },
    {
      field: 'max_agents',
      title: '最大Agent数',
      width: 110,
    },
    {
      field: 'enabled',
      title: '是否启用',
      width: 100,
    },
    {
      field: 'sort_order',
      title: '排序权重',
      width: 100,
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
    component: 'Select',
    fieldName: 'app_code',
    label: '应用',
    rules: 'required',
    defaultValue: 'huanxing',
    componentProps: {
      options: getDictOptions('sys_app_code'),
    },
  },
  {
    component: 'Input',
    fieldName: 'tier_name',
    label: '等级标识',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'display_name',
    label: '显示名称',
    rules: 'required',
  },
  {
    component: 'InputNumber',
    fieldName: 'monthly_credits',
    label: '每月赠送积分',
    rules: 'required',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'InputNumber',
    fieldName: 'monthly_price',
    label: '月费',
    rules: 'required',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'InputNumber',
    fieldName: 'yearly_price',
    label: '年费',
    componentProps: {"style": "width: 100%", "placeholder": "留空则不支持年费订阅"},
  },
  {
    component: 'InputNumber',
    fieldName: 'yearly_discount',
    label: '年费折扣',
    componentProps: {"style": "width: 100%", "placeholder": "如 0.8 表示8折", "min": 0, "max": 1, "step": 0.05},
  },
  {
    component: 'InputNumber',
    fieldName: 'newapi_quota',
    label: 'New-API 额度',
    componentProps: {
      "style": "width: 100%",
      "placeholder": "留空则使用默认值（1积分=500,000 quota）",
      "min": 0,
    },
    help: '覆盖默认的 new-api quota，留空则按 积分×500000 自动计算',
  },
  {
    component: 'InputNumber',
    fieldName: 'max_agents',
    label: '最大Agent数',
    componentProps: {"style": "width: 100%", "min": 1},
    defaultValue: 1,
  },
  {
    component: 'Textarea',
    fieldName: 'features',
    label: '功能特性(JSON)',
    componentProps: {"placeholder": "其他功能配置（JSON格式，newapi_quota 已提取为独立字段）", "rows": 4},
  },
  {
    component: 'Switch',
    fieldName: 'enabled',
    label: '是否启用',
  },
  {
    component: 'InputNumber',
    fieldName: 'sort_order',
    label: '排序权重',
    rules: 'required',
    componentProps: {"style": "width: 100%"},
  },
];
