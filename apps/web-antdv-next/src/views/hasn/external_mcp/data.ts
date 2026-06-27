import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeGridProps } from '#/adapter/vxe-table';
import type { ExternalMcpSystemServer } from '#/api/hasn/external_mcp';

import { $t } from '@vben/locales';

/** 健康状态（后端 health_status）。 */
const HEALTH_OPTIONS = [
  { color: 'default', label: '未探测', value: 'unknown' },
  { color: 'green', label: '健康', value: 'healthy' },
  { color: 'orange', label: '降级', value: 'degraded' },
  { color: 'red', label: '不可达', value: 'unreachable' },
  { color: 'red', label: '熔断', value: 'circuit_broken' },
];

/** server 启停状态。 */
const STATUS_OPTIONS = [
  { color: 'green', label: '启用', value: 'active' },
  { color: 'red', label: '停用', value: 'disabled' },
];

/** 风险等级。 */
const RISK_OPTIONS = [
  { color: 'green', label: '低风险', value: 'low' },
  { color: 'orange', label: '中风险', value: 'medium' },
  { color: 'red', label: '高风险', value: 'high' },
];

/** 传输方式（remote_service 合法：http/websocket/sse）。 */
const TRANSPORT_OPTIONS = [
  { label: 'HTTP（streamable）', value: 'http' },
  { label: 'WebSocket', value: 'websocket' },
  { label: 'SSE', value: 'sse' },
];

/**
 * Table columns configuration。
 * 行操作：自省 / 凭据 / 撤销凭据 / 配额 / 启停 / 删除。
 */
export function useColumns(
  onActionClick?: OnActionClickFn<ExternalMcpSystemServer>,
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
      field: 'display_name',
      title: '平台 MCP',
      minWidth: 160,
      slots: { default: 'display_name' },
    },
    {
      field: 'name',
      title: '命名空间',
      width: 150,
      slots: { default: 'namespace' },
    },
    {
      field: 'endpoint',
      title: '远程端点',
      minWidth: 200,
      showOverflow: true,
    },
    {
      field: 'transport',
      title: '传输',
      width: 100,
    },
    {
      field: 'risk_level',
      title: '风险',
      width: 90,
      cellRender: { name: 'CellTag', options: RISK_OPTIONS },
    },
    {
      field: 'health_status',
      title: '健康',
      width: 90,
      cellRender: { name: 'CellTag', options: HEALTH_OPTIONS },
    },
    {
      field: 'tools_count',
      title: '工具数',
      width: 80,
      slots: { default: 'tools_count' },
    },
    {
      field: 'quota',
      title: 'per-owner 配额',
      width: 150,
      slots: { default: 'quota' },
    },
    {
      field: 'status',
      title: '状态',
      width: 90,
      cellRender: { name: 'CellTag', options: STATUS_OPTIONS },
    },
    {
      field: 'operation',
      title: $t('common.table.operation'),
      align: 'center',
      fixed: 'right',
      width: 300,
      cellRender: {
        attrs: {
          nameField: 'mcp_id',
          onClick: onActionClick,
        },
        name: 'CellOperation',
        options: [
          { code: 'introspect', text: '自省' },
          { code: 'credential', text: '凭据' },
          { code: 'revoke', text: '撤销凭据' },
          { code: 'quota', text: '配额' },
          { code: 'toggle', text: '启停' },
          'delete',
        ],
      },
    },
  ];
}

/**
 * 注册平台 server 表单 schema（hosting 恒 remote_service、origin 恒 system，前端不填）。
 * 明文凭据可选随注册写入；写后永不回显。
 */
export const registerFormSchema: VbenFormSchema[] = [
  {
    component: 'Input',
    fieldName: 'display_name',
    label: '展示名',
    rules: 'required',
    componentProps: { placeholder: '中文展示名，如 企查查' },
  },
  {
    component: 'Input',
    fieldName: 'name',
    label: '命名空间',
    rules: 'required',
    help: '全局唯一，映射 hasn.ext.{name}.*（如 qcc）',
    componentProps: { placeholder: 'qcc' },
  },
  {
    component: 'Select',
    fieldName: 'transport',
    label: '传输方式',
    defaultValue: 'http',
    componentProps: { options: TRANSPORT_OPTIONS },
  },
  {
    component: 'Input',
    fieldName: 'endpoint',
    label: '远程端点',
    rules: 'required',
    help: 'remote_service 远程 URL（http/https/ws/wss）',
    componentProps: { placeholder: 'https://mcp.example.com/sse' },
  },
  {
    component: 'Select',
    fieldName: 'risk_level',
    label: '风险等级',
    defaultValue: 'medium',
    componentProps: { options: RISK_OPTIONS },
  },
  {
    component: 'InputNumber',
    fieldName: 'per_owner_daily_quota',
    label: 'per-owner 每日配额',
    defaultValue: 0,
    help: '每个 owner 每日调用上限（0=不限）。平台付费 key 防刷爆硬需求。',
    componentProps: { min: 0, precision: 0, class: 'w-full' },
  },
  {
    component: 'InputNumber',
    fieldName: 'rate_limit_per_min',
    label: 'per-owner 每分钟限流',
    defaultValue: 0,
    help: '每个 owner 每分钟调用上限（0=不限）。',
    componentProps: { min: 0, precision: 0, class: 'w-full' },
  },
  {
    component: 'InputPassword',
    fieldName: 'credential',
    label: '平台 key（可选）',
    help: '明文凭据（如 bearer token）。写后加密落库、永不回显；留空可稍后单独写入。',
    componentProps: { placeholder: '留空则注册后再写入凭据' },
  },
  {
    component: 'Input',
    fieldName: 'auth_header',
    label: '凭据请求头',
    defaultValue: 'Authorization',
  },
  {
    component: 'Input',
    fieldName: 'auth_scheme',
    label: '凭据前缀',
    defaultValue: 'Bearer',
    help: '如 Bearer；留空=裸值。',
  },
];

/**
 * 写入/轮换平台 key 表单 schema（明文写后永不回显）。
 */
export const credentialFormSchema: VbenFormSchema[] = [
  {
    component: 'InputPassword',
    fieldName: 'credential',
    label: '平台 key',
    rules: 'required',
    help: '明文凭据，写后加密落库、永不回显；同 server 再次写入即轮换。',
  },
  {
    component: 'Input',
    fieldName: 'auth_header',
    label: '凭据请求头',
    defaultValue: 'Authorization',
  },
  {
    component: 'Input',
    fieldName: 'auth_scheme',
    label: '凭据前缀',
    defaultValue: 'Bearer',
    help: '如 Bearer；留空=裸值。',
  },
];

/**
 * per-owner 配额/限流表单 schema。
 */
export const quotaFormSchema: VbenFormSchema[] = [
  {
    component: 'InputNumber',
    fieldName: 'per_owner_daily_quota',
    label: 'per-owner 每日配额',
    defaultValue: 0,
    help: '每个 owner 每日调用上限（0=不限）。超额抛 MCP_9216 QUOTA_EXCEEDED。',
    componentProps: { min: 0, precision: 0, class: 'w-full' },
  },
  {
    component: 'InputNumber',
    fieldName: 'rate_limit_per_min',
    label: 'per-owner 每分钟限流',
    defaultValue: 0,
    help: '每个 owner 每分钟调用上限（0=不限）。',
    componentProps: { min: 0, precision: 0, class: 'w-full' },
  },
];
