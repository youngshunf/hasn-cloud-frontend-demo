import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeGridProps } from '#/adapter/vxe-table';
import type { ReleaseDetail } from '#/api/hasn_release/release_console';

import { $t } from '@vben/locales';

// 状态选项（自包含，不依赖字典表；color 供 CellTag 渲染）
export const STATUS_OPTIONS = [
  { color: 'default', label: '草稿', value: 'draft' },
  { color: 'success', label: '已发布', value: 'published' },
  { color: 'warning', label: '已下线', value: 'deprecated' },
];

export const CHANNEL_OPTIONS = [
  { label: 'stable（稳定）', value: 'stable' },
  { label: 'beta（测试）', value: 'beta' },
];

export const SOURCE_OPTIONS = [
  { color: 'processing', label: 'GitHub 构建', value: 'github' },
  { color: 'default', label: '手动上传', value: 'manual' },
];

/** 顶部查询表单 */
export const querySchema: VbenFormSchema[] = [
  {
    component: 'Select',
    fieldName: 'channel',
    label: '渠道',
    componentProps: {
      allowClear: true,
      options: CHANNEL_OPTIONS,
      placeholder: '全部渠道',
    },
  },
];

/** 版本列表列定义 */
export function useColumns(
  onActionClick?: OnActionClickFn<ReleaseDetail>,
): VxeGridProps['columns'] {
  return [
    { field: 'seq', title: $t('common.table.id'), type: 'seq', width: 50 },
    {
      field: 'version',
      title: '版本号',
      width: 120,
      slots: { default: 'version' },
    },
    {
      field: 'channel',
      title: '渠道',
      width: 90,
      cellRender: { name: 'CellTag', options: CHANNEL_OPTIONS },
    },
    {
      field: 'status',
      title: '状态',
      width: 100,
      cellRender: { name: 'CellTag', options: STATUS_OPTIONS },
    },
    {
      field: 'source',
      title: '来源',
      width: 120,
      cellRender: { name: 'CellTag', options: SOURCE_OPTIONS },
    },
    {
      field: 'platforms',
      title: '平台包',
      minWidth: 200,
      slots: { default: 'platforms' },
    },
    {
      field: 'downloads',
      title: '下载量',
      width: 90,
      slots: { default: 'downloads' },
    },
    {
      field: 'published_time',
      title: '发布时间',
      width: 170,
      slots: { default: 'published_time' },
    },
    {
      field: 'operation',
      title: $t('common.table.operation'),
      align: 'center',
      fixed: 'right',
      width: 240,
      cellRender: {
        attrs: { nameField: 'id', onClick: onActionClick },
        name: 'CellOperation',
        // 动作在 index.vue 里按行状态动态裁剪（set-latest / edit / delete）
        options: [
          { code: 'setLatest', text: '设为最新' },
          { code: 'edit', text: '编辑' },
          { code: 'delete', text: '删除', danger: true },
        ],
      },
    },
  ];
}

/** 编辑版本元数据表单（changelog / 状态） */
export const editFormSchema: VbenFormSchema[] = [
  {
    component: 'Select',
    fieldName: 'status',
    label: '状态',
    componentProps: { options: STATUS_OPTIONS },
    rules: 'required',
  },
  {
    component: 'Textarea',
    fieldName: 'release_notes_md',
    label: '更新日志（中）',
    componentProps: { rows: 5, placeholder: '支持 Markdown' },
  },
  {
    component: 'Textarea',
    fieldName: 'release_notes_en_md',
    label: '更新日志（英）',
    componentProps: { rows: 4, placeholder: 'Markdown, optional' },
  },
];

/** 从 GitHub 构建表单 */
export const buildFormSchema: VbenFormSchema[] = [
  {
    component: 'Input',
    fieldName: 'ref',
    label: '分支 / Tag',
    rules: 'required',
    componentProps: { placeholder: '如 main 或 v1.2.0' },
  },
  {
    component: 'Select',
    fieldName: 'channel',
    label: '渠道',
    defaultValue: 'stable',
    rules: 'required',
    componentProps: { options: CHANNEL_OPTIONS },
  },
];

/** 手动登记发布表单（资产为已预上传七牛的元数据 JSON） */
export const publishFormSchema: VbenFormSchema[] = [
  {
    component: 'Input',
    fieldName: 'version',
    label: '版本号',
    rules: 'required',
    componentProps: { placeholder: 'semver，如 1.2.0' },
  },
  {
    component: 'Select',
    fieldName: 'channel',
    label: '渠道',
    defaultValue: 'stable',
    rules: 'required',
    componentProps: { options: CHANNEL_OPTIONS },
  },
  {
    component: 'Switch',
    fieldName: 'set_latest',
    label: '发布后置为最新',
    defaultValue: true,
  },
  {
    component: 'Textarea',
    fieldName: 'release_notes_md',
    label: '更新日志（中）',
    componentProps: { rows: 4, placeholder: '支持 Markdown' },
  },
  {
    component: 'Textarea',
    fieldName: 'release_notes_en_md',
    label: '更新日志（英）',
    componentProps: { rows: 3, placeholder: 'Markdown, optional' },
  },
  {
    component: 'Textarea',
    fieldName: 'assets_json',
    label: '资产清单 JSON',
    rules: 'required',
    componentProps: {
      rows: 10,
      placeholder:
        '各平台已预上传七牛后的资产元数据数组。updater 必须带 signature（.sig 内容）。\n' +
        '示例：\n' +
        '[\n' +
        '  {"platform_target":"darwin-aarch64","asset_kind":"installer","download_url":"https://cdn.../Astra_1.2.0_aarch64.dmg","file_name":"Astra_1.2.0_aarch64.dmg","file_size":0,"sha256":""},\n' +
        '  {"platform_target":"darwin-aarch64","asset_kind":"updater","download_url":"https://cdn.../Astra.app.tar.gz","file_name":"Astra.app.tar.gz","file_size":0,"sha256":"","signature":"dW50cnVzdGVk..."}\n' +
        ']',
    },
  },
];
