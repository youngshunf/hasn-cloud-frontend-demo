import type { VbenFormSchema } from '#/adapter/form';
import type {
  OnActionClickFn,
  VxeGridProps,
} from '#/adapter/vxe-table';
import type { NewApiUserOverview } from '#/api/user_tier/newapi_quota';

import { h } from 'vue';

import { $t } from '@vben/locales';

import { Tag } from 'antdv-next';

/**
 * 订阅等级 Tag 颜色映射
 */
function tierColor(tier: string | null): string {
  switch (tier) {
    case 'free': return 'default';
    case 'basic': return 'blue';
    case 'pro': return 'gold';
    case 'enterprise': return 'purple';
    default: return 'default';
  }
}

function tierLabel(tier: string | null): string {
  switch (tier) {
    case 'free': return '免费版';
    case 'basic': return '基础版';
    case 'pro': return '专业版';
    case 'enterprise': return '企业版';
    default: return tier || '未订阅';
  }
}

/**
 * 格式化 quota 为人类可读（除以 500000 显示积分值）
 */
function formatQuota(val: number): string {
  if (val <= 0) return '0';
  const credits = val / 500_000;
  if (credits >= 1000) {
    return `${(credits / 1000).toFixed(1)}K`;
  }
  return credits.toFixed(1);
}

/**
 * Query form schema
 */
export const querySchema: VbenFormSchema[] = [
  {
    component: 'Input',
    fieldName: 'user_keyword',
    label: '用户搜索',
    componentProps: { placeholder: '昵称/手机号' },
  },
  {
    component: 'Select',
    fieldName: 'app_code',
    label: '应用',
    componentProps: {
      allowClear: true,
      options: [
        { label: '唤星', value: 'huanxing' },
        { label: '知小鸦', value: 'zhixiaoya' },
      ],
    },
  },
  {
    component: 'Select',
    fieldName: 'mapping_status',
    label: '状态',
    componentProps: {
      allowClear: true,
      options: [
        { label: '启用', value: 'active' },
        { label: '禁用', value: 'disabled' },
      ],
    },
  },
];

/**
 * Table columns configuration
 */
export function useColumns(
  onActionClick?: OnActionClickFn<NewApiUserOverview>,
): VxeGridProps['columns'] {
  return [
    {
      field: 'seq',
      title: '#',
      type: 'seq',
      fixed: 'left',
      width: 50,
    },
    {
      field: 'user_nickname',
      title: '用户昵称',
      width: 120,
      formatter: ({ cellValue }) => cellValue || '-',
    },
    {
      field: 'user_phone',
      title: '手机号',
      width: 130,
      formatter: ({ cellValue }) => cellValue || '-',
    },
    {
      field: 'subscription_tier',
      title: '订阅等级',
      width: 110,
      slots: {
        default: ({ row }: { row: NewApiUserOverview }) => {
          return [h(Tag, { color: tierColor(row.subscription_tier) }, () => tierLabel(row.subscription_tier))];
        },
      },
    },
    {
      field: 'newapi_token_key_masked',
      title: 'API Key',
      width: 180,
    },
    {
      field: 'total_quota',
      title: '总额度',
      width: 100,
      formatter: ({ cellValue }) => formatQuota(cellValue),
    },
    {
      field: 'used_quota',
      title: '已使用',
      width: 100,
      formatter: ({ cellValue }) => formatQuota(cellValue),
    },
    {
      field: 'remain_quota',
      title: '剩余额度',
      width: 100,
      formatter: ({ cellValue }) => formatQuota(cellValue),
    },
    {
      field: 'request_count',
      title: '请求次数',
      width: 100,
    },
    {
      field: 'app_code',
      title: '应用',
      width: 80,
      formatter: ({ cellValue }) => cellValue === 'huanxing' ? '唤星' : cellValue,
    },
    {
      field: 'mapping_status',
      title: '状态',
      width: 80,
      slots: {
        default: ({ row }: { row: NewApiUserOverview }) => {
          const color = row.mapping_status === 'active' ? 'green' : 'red';
          const label = row.mapping_status === 'active' ? '启用' : '禁用';
          return [h(Tag, { color }, () => label)];
        },
      },
    },
    {
      field: 'operation',
      title: $t('common.table.operation'),
      align: 'center',
      fixed: 'right',
      width: 200,
      cellRender: {
        attrs: {
          nameField: 'huanxing_user_id',
          onClick: onActionClick,
        },
        name: 'CellOperation',
        options: [
          { code: 'copy_key', text: '复制Key' },
          { code: 'edit_quota', text: '编辑额度' },
          { code: 'view_usage', text: '用量详情' },
        ],
      },
    },
  ];
}

/**
 * Quota edit form schema
 */
export const quotaFormSchema: VbenFormSchema[] = [
  {
    component: 'InputNumber',
    fieldName: 'new_quota',
    label: '新额度',
    rules: 'required',
    componentProps: {
      style: 'width: 100%',
      min: 0,
      placeholder: '请输入新的总额度值',
    },
  },
];
