import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeGridProps } from '#/adapter/vxe-table';
import type { BillingPlan } from '#/api/user_tier/billing_plan';

import { $t } from '@vben/locales';

import { BILLING_STATUS_OPTIONS } from '../billing_offering/data';
import { formatStorageBytes } from './storageQuota';

/**
 * 商品档位（billing_plan）管理面 —— 价格 + 配额快照 + 试用/宽限策略
 * 改价只影响新购续费（已购周期固化配额快照）。
 * 试用、宽限与 LLM 套餐存储权益使用结构化字段；
 * 其他随商品变化的配额仍保留高级 JSON 编辑，但不得在其中手写 storage_bytes。
 */

export const PRICE_UNIT_OPTIONS = [
  { label: '人民币元', value: 'cny', color: 'blue' },
  { label: '积分', value: 'credits', color: 'cyan' },
];

export const CYCLE_OPTIONS = [
  { label: '一次买断', value: 'once', color: 'default' },
  { label: '月', value: 'month', color: 'blue' },
  { label: '年', value: 'year', color: 'green' },
];

export const STORAGE_UNIT_OPTIONS = [
  { label: 'GiB（二进制）', value: 'GiB' },
  { label: 'TiB（二进制）', value: 'TiB' },
];

// 复用商品目录的上/下架状态选项
export { BILLING_STATUS_OPTIONS };

/**
 * 检索表单（后端支持 offering_key 精确 + status 精确过滤）
 */
export const querySchema: VbenFormSchema[] = [
  {
    component: 'Input',
    fieldName: 'offering_key',
    label: '所属商品',
    componentProps: {
      placeholder: '按 offering 业务键精确检索（查某商品全部档位）',
    },
  },
  {
    component: 'Select',
    fieldName: 'status',
    label: '状态',
    componentProps: {
      allowClear: true,
      options: BILLING_STATUS_OPTIONS,
    },
  },
];

/**
 * 列表列
 */
export function useColumns(
  onActionClick?: OnActionClickFn<BillingPlan>,
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
      field: 'offering_key',
      title: '所属商品',
      minWidth: 180,
    },
    {
      field: 'plan_key',
      title: '档位键',
      width: 120,
    },
    {
      field: 'price_amount',
      title: '价格',
      width: 140,
      formatter: ({ row }: { row: any }) => {
        const unit = row.price_unit === 'credits' ? '积分' : '元';
        return `${row.price_amount} ${unit}`;
      },
    },
    {
      field: 'cycle',
      title: '计费周期',
      width: 110,
      cellRender: {
        name: 'CellTag',
        options: CYCLE_OPTIONS,
      },
    },
    {
      field: 'trial_json',
      title: '试用',
      width: 130,
      formatter: ({ row }: { row: any }) => {
        const t = row.trial_json || {};
        if (!t.enabled) return '无';
        return `${t.days || 0}天 ×${t.times ?? 1}`;
      },
    },
    {
      field: 'quota_json',
      title: '存储空间',
      width: 130,
      formatter: ({ row }: { row: BillingPlan }) => {
        const bytes = row.quota_json?.storage_bytes;
        if (!Number.isSafeInteger(bytes) || bytes < 0) return '未配置';
        try {
          return formatStorageBytes(bytes);
        } catch {
          return `${bytes} bytes`;
        }
      },
    },
    {
      field: 'grace_json',
      title: '宽限',
      width: 130,
      formatter: ({ row }: { row: any }) => {
        const g = row.grace_json || {};
        const remind = Array.isArray(g.remind_days)
          ? g.remind_days.join('/')
          : '';
        const grace = g.grace_days ?? 0;
        return remind ? `提醒${remind}天·宽限${grace}天` : `宽限${grace}天`;
      },
    },
    {
      field: 'status',
      title: '状态',
      width: 100,
      cellRender: {
        name: 'CellTag',
        options: BILLING_STATUS_OPTIONS,
      },
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
 * 新增/编辑表单
 * 说明：trial_ 与 grace_ 前缀字段为结构化输入，提交时在 index.vue 组装回 trial_json/grace_json。
 */
export const formSchema: VbenFormSchema[] = [
  {
    component: 'Input',
    fieldName: 'offering_key',
    label: '所属商品业务键',
    rules: 'required',
    componentProps: {
      placeholder: '指向 billing_offering.key，如 app:quant / llm:tier',
    },
  },
  {
    component: 'Input',
    fieldName: 'plan_key',
    label: '档位键',
    rules: 'required',
    componentProps: { placeholder: 'monthly / yearly / standard / once' },
  },
  {
    component: 'InputNumber',
    fieldName: 'price_amount',
    label: '价格',
    rules: 'required',
    componentProps: { style: 'width: 100%', min: 0, step: 0.01 },
    help: '改价只影响新购续费；已购周期配额快照不受影响',
  },
  {
    component: 'Select',
    fieldName: 'price_unit',
    label: '计价单位',
    rules: 'required',
    defaultValue: 'cny',
    componentProps: { options: PRICE_UNIT_OPTIONS },
  },
  {
    component: 'Select',
    fieldName: 'cycle',
    label: '计费周期',
    rules: 'required',
    defaultValue: 'month',
    componentProps: { options: CYCLE_OPTIONS },
  },
  {
    component: 'Switch',
    fieldName: 'trial_enabled',
    label: '开启试用',
  },
  {
    component: 'InputNumber',
    fieldName: 'trial_days',
    label: '试用天数',
    componentProps: { style: 'width: 100%', min: 0 },
    dependencies: {
      show: (values) => Boolean(values.trial_enabled),
      triggerFields: ['trial_enabled'],
    },
  },
  {
    component: 'InputNumber',
    fieldName: 'trial_times',
    label: '试用次数',
    componentProps: { style: 'width: 100%', min: 1 },
    defaultValue: 1,
    dependencies: {
      show: (values) => Boolean(values.trial_enabled),
      triggerFields: ['trial_enabled'],
    },
  },
  {
    component: 'Input',
    fieldName: 'grace_remind_days',
    label: '到期提醒（天）',
    componentProps: { placeholder: '逗号分隔，如 7,3,1' },
    help: '到期前第 N 天各提醒一次；逗号分隔多个节点',
  },
  {
    component: 'InputNumber',
    fieldName: 'grace_days',
    label: '宽限天数',
    componentProps: { style: 'width: 100%', min: 0 },
    defaultValue: 0,
    help: '到期后停服保留数据的宽限期',
  },
  {
    component: 'InputNumber',
    fieldName: 'storage_quota_value',
    label: '存储空间',
    rules: 'required',
    componentProps: {
      min: 1,
      precision: 0,
      step: 1,
      style: 'width: 100%',
    },
    dependencies: {
      show: (values) => values.offering_key === 'llm:tier',
      triggerFields: ['offering_key'],
    },
    help: '只接受正整数，按右侧选择的二进制单位精确换算为 bytes',
  },
  {
    component: 'Select',
    fieldName: 'storage_quota_unit',
    label: '存储单位',
    rules: 'required',
    defaultValue: 'GiB',
    componentProps: { options: STORAGE_UNIT_OPTIONS },
    dependencies: {
      show: (values) => values.offering_key === 'llm:tier',
      triggerFields: ['offering_key'],
    },
    help: '1 GiB = 1024³ bytes；1 TiB = 1024⁴ bytes',
  },
  {
    component: 'Textarea',
    fieldName: 'quota_json',
    label: '其他配额(JSON)',
    componentProps: {
      placeholder:
        '随商品种类而异，如 {"sites":1,"memory_mb":512,"seats":5,"max_agents":3}',
      rows: 4,
    },
    help: '高级字段会与结构化配额合并；禁止在此手写 storage_bytes',
  },
  {
    component: 'Select',
    fieldName: 'status',
    label: '状态',
    rules: 'required',
    defaultValue: 'active',
    componentProps: { options: BILLING_STATUS_OPTIONS },
  },
  {
    component: 'InputNumber',
    fieldName: 'sort_order',
    label: '排序权重',
    rules: 'required',
    defaultValue: 0,
    componentProps: { style: 'width: 100%' },
  },
];
