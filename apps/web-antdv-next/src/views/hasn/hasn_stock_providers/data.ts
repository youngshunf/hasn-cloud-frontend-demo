import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeGridProps } from '#/adapter/vxe-table';
import type { StockProviderItem } from '#/api/hasn/hasn_stock_providers';

import { $t } from '@vben/locales';

/** 媒体类型选项（与后端 MEDIA_TYPES 一致：image/video）。 */
const MEDIA_TYPE_OPTIONS = [
  { label: '图片', value: 'image' },
  { label: '视频', value: 'video' },
];

/** download_domains 输入用的 tags 选择器公共配置（自由填写、逗号/空格分隔）。 */
const DOMAINS_INPUT_PROPS = {
  mode: 'tags' as const,
  tokenSeparators: [',', ' '],
  open: false,
  placeholder: '下载直链合法域名，如 images.pexels.com（回车/逗号分隔）',
};

/**
 * 表格列。
 * - media_types / download_domains：数组用 formatter 拼字符串展示。
 * - api_key：明文只进不出——只展示掩码或「未配置」，绝不回显明文。
 * - enabled：布尔用 formatter 展示启用/停用。
 */
export function useColumns(
  onActionClick?: OnActionClickFn<StockProviderItem>,
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
      field: 'provider',
      title: '唯一标识',
      width: 140,
    },
    {
      field: 'display_name',
      title: '显示名称',
      width: 140,
    },
    {
      field: 'media_types',
      title: '媒体类型',
      width: 120,
      formatter: ({ cellValue }) => {
        const labels = (cellValue ?? []).map(
          (v: string) =>
            MEDIA_TYPE_OPTIONS.find((o) => o.value === v)?.label ?? v,
        );
        return labels.join(' / ') || '—';
      },
    },
    {
      field: 'api_key_configured',
      title: 'API Key',
      width: 130,
      // 明文只进不出：已配显示掩码，未配显示「未配置」。
      formatter: ({ row }) =>
        row.api_key_configured ? (row.api_key_masked ?? '已配置') : '未配置',
    },
    {
      field: 'download_domains',
      title: '下载白名单域名',
      minWidth: 200,
      formatter: ({ cellValue }) => (cellValue ?? []).join('、') || '—',
    },
    {
      field: 'enabled',
      title: '状态',
      width: 90,
      formatter: ({ cellValue }) => (cellValue ? '启用' : '停用'),
    },
    {
      field: 'priority',
      title: 'failover 优先级',
      width: 120,
    },
    {
      field: 'license_terms_url',
      title: '授权条款链接',
      width: 160,
    },
    {
      field: 'remark',
      title: '备注',
      width: 160,
    },
    {
      field: 'created_time',
      title: '创建时间',
      width: 170,
    },
    {
      field: 'operation',
      title: $t('common.table.operation'),
      align: 'center',
      fixed: 'right',
      width: 130,
      cellRender: {
        attrs: {
          nameField: 'provider',
          onClick: onActionClick,
        },
        name: 'CellOperation',
        options: ['edit', 'delete'],
      },
    },
  ];
}

/**
 * 新增表单。
 * provider 为唯一标识、创建后不可改（更新接口不含 provider）；api_key 明文只进不出。
 */
export const createFormSchema: VbenFormSchema[] = [
  {
    component: 'Input',
    fieldName: 'provider',
    label: '唯一标识',
    rules: 'required',
    help: '素材站唯一标识，如 pexels / pixabay / coverr（创建后不可修改）',
  },
  {
    component: 'Input',
    fieldName: 'display_name',
    label: '显示名称',
  },
  {
    component: 'Select',
    fieldName: 'media_types',
    label: '媒体类型',
    rules: 'required',
    defaultValue: ['image'],
    componentProps: {
      mode: 'multiple',
      options: MEDIA_TYPE_OPTIONS,
      placeholder: '该素材站支持的媒体类型（image/video 子集）',
    },
  },
  {
    component: 'InputPassword',
    fieldName: 'api_key',
    label: 'API Key',
    help: '明文只进不出：加密落库，永不回显。留空表示暂不配置。',
    componentProps: {
      placeholder: '素材站 API Key（可留空）',
      autocomplete: 'new-password',
    },
  },
  {
    component: 'Select',
    fieldName: 'download_domains',
    label: '下载白名单域名',
    help: '仅这些域名的直链允许下载（SSRF 白名单并集来源）',
    componentProps: DOMAINS_INPUT_PROPS,
  },
  {
    component: 'Switch',
    fieldName: 'enabled',
    label: '启用',
    defaultValue: true,
    componentProps: { checkedChildren: '启用', unCheckedChildren: '停用' },
  },
  {
    component: 'InputNumber',
    fieldName: 'priority',
    label: 'failover 优先级',
    defaultValue: 100,
    help: '数值小的优先命中（failover 链按优先级排序）',
    componentProps: { min: 0, style: 'width: 100%' },
  },
  {
    component: 'Input',
    fieldName: 'license_terms_url',
    label: '授权条款链接',
    help: '素材授权条款页 URL，可留空',
  },
  {
    component: 'Textarea',
    fieldName: 'remark',
    label: '备注',
    componentProps: { rows: 2 },
  },
];

/**
 * 编辑表单。
 * - 不含 provider（唯一标识不可改）。
 * - api_key：留空=不修改（安全默认，绝不误清空）；填写=覆盖轮换；勾选「清空」=清除已配 key。
 *   三态与后端 UpdateProviderParam 对齐（空串清空 / undefined 不改 / 非空覆盖），
 *   在提交侧（index.vue）据 clear_api_key 与是否填写组装 payload。
 */
export const editFormSchema: VbenFormSchema[] = [
  {
    component: 'Input',
    fieldName: 'display_name',
    label: '显示名称',
  },
  {
    component: 'Select',
    fieldName: 'media_types',
    label: '媒体类型',
    rules: 'required',
    componentProps: {
      mode: 'multiple',
      options: MEDIA_TYPE_OPTIONS,
    },
  },
  {
    component: 'InputPassword',
    fieldName: 'api_key',
    label: 'API Key',
    help: '留空=不修改；填写=覆盖轮换。明文只进不出，永不回显。',
    componentProps: {
      placeholder: '留空表示不修改',
      autocomplete: 'new-password',
    },
    // 勾选「清空」后禁用输入框，避免同时填写与清空冲突。
    dependencies: {
      disabled: (values) => values.clear_api_key === true,
      triggerFields: ['clear_api_key'],
    },
  },
  {
    component: 'Switch',
    fieldName: 'clear_api_key',
    label: '清空 API Key',
    defaultValue: false,
    help: '开启后保存将清除已配置的 api_key（与上方填写互斥）',
    componentProps: { checkedChildren: '清空', unCheckedChildren: '保留' },
  },
  {
    component: 'Select',
    fieldName: 'download_domains',
    label: '下载白名单域名',
    help: '仅这些域名的直链允许下载（SSRF 白名单并集来源）',
    componentProps: DOMAINS_INPUT_PROPS,
  },
  {
    component: 'Switch',
    fieldName: 'enabled',
    label: '启用',
    componentProps: { checkedChildren: '启用', unCheckedChildren: '停用' },
  },
  {
    component: 'InputNumber',
    fieldName: 'priority',
    label: 'failover 优先级',
    help: '数值小的优先命中（failover 链按优先级排序）',
    componentProps: { min: 0, style: 'width: 100%' },
  },
  {
    component: 'Input',
    fieldName: 'license_terms_url',
    label: '授权条款链接',
  },
  {
    component: 'Textarea',
    fieldName: 'remark',
    label: '备注',
    componentProps: { rows: 2 },
  },
];
