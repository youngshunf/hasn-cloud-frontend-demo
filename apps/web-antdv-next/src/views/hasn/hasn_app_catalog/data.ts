import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeGridProps } from '#/adapter/vxe-table';
import type { HasnAppCatalog } from '#/api/hasn/hasn_app_catalog';

import { $t } from '@vben/locales';

import { getDictOptions } from '#/utils/dict';

import IconUpload from './IconUpload.vue';

/** 枚举字段选项（取值与后端 schema 注释一致） */
const SOURCE_OPTIONS = [
  { label: '内置', value: 'builtin' },
  { label: '官方', value: 'first_party' },
  { label: '第三方', value: 'third_party' },
];
const EXECUTION_MODE_OPTIONS = [
  { label: '云端', value: 'cloud' },
  { label: '桌面嵌入', value: 'embedded_desktop' },
  { label: '本地工具', value: 'local_tool' },
];
const SCOPE_OPTIONS = [
  { label: '个人空间', value: 'personal' },
  { label: '企业空间', value: 'enterprise' },
];
const COLLABORATION_MODE_OPTIONS = [
  { label: '个人', value: 'none' },
  { label: '空间共享', value: 'workspace_shared' },
];
const MIN_TIER_OPTIONS = [
  { label: '专业版', value: 'pro' },
  { label: '进阶版', value: 'advanced' },
  { label: '旗舰版', value: 'flagship' },
];
const PRICE_UNIT_OPTIONS = [
  { label: '人民币', value: 'cny' },
  { label: '积分', value: 'credits' },
];
const BILLING_CYCLE_OPTIONS = [
  { label: '一次性', value: 'once' },
  { label: '包月', value: 'month' },
  { label: '包年', value: 'year' },
];
/**
 * 上架状态：**本地三值常量，不要换回 `getDictOptions('hasn_status')`。**
 *
 * `hasn_status` 是一条「HASN 模块通用状态字典」，`fba codegen` 把每张 `hasn_*` 表的 `status`
 * 列都往同一个 type_code 里塞值，现已积到约 50 个取值——文章的 `启用/禁用`、联系人的
 * `待处理/已连接`、绑定的 `已绑/未绑`、消息的 `已发送/已送达`、用户的 `正常/已暂停`…
 * 全混在一个下拉里，管理员根本挑不出应用目录自己的那三个。
 *
 * 更糟的是同一 value 被多个模块以不同标签抢注（`disabled` 既有「已下架」又有「已禁用」，
 * `active` 三份、`expired` 五份），各生成文件的幂等守卫是 `IF NOT EXISTS (type_code, value)`，
 * 于是最终标签取决于迁移执行顺序。而后端 schema 的 `status` 是裸 `str` 无枚举约束，误选
 * 「已接收」会把 `accepted` 写进 `hasn_app_catalog.status`，`!= 'published'` 即让应用从全端
 * 静默消失。故本页与同文件其余七组枚举一致，改用本地常量（取值与后端 schema 注释一致）。
 */
const STATUS_OPTIONS = [
  { label: '已上架', value: 'published' },
  { label: '已下架', value: 'disabled' },
  { label: '草稿', value: 'draft' },
];
/** 发布阶段（内测）：与上架状态 status 正交。灰度内测仅被邀请/审批通过的用户可见可开。 */
const RELEASE_PHASE_OPTIONS = [
  { label: '正式发布 (GA)', value: 'ga' },
  { label: '全量内测', value: 'beta_full' },
  { label: '灰度内测', value: 'beta_gray' },
];

/**
 * 表单默认值兜底：后端这些字段非空，但管理员通常无需逐项填写。
 * 提交前与表单值合并，保证未触碰的字段也带上合法默认值（提交侧二次兜底）。
 */
export const CATALOG_FORM_DEFAULTS = {
  icon: 'box',
  source: 'builtin',
  status: 'published',
  execution_mode: 'cloud',
  scope: ['personal'],
  collaboration_mode: 'none',
  sort_order: 0,
  release_phase: 'ga',
  default_mount: false,
  access_type: 'free',
  price_unit: 'cny',
  billing_cycle: 'once',
  trial_days: 0,
  manifest_present: false,
};

/**
 * 提交前用默认值兜底：仅填补缺失/未定义的字段，已填字段保持原值。
 * （注意：跳过 undefined，避免被表单丢弃的隐藏字段覆盖掉合法默认值。）
 */
export function withCatalogDefaults<T extends Record<string, any>>(
  values: T,
): Record<string, any> {
  const merged: Record<string, any> = { ...CATALOG_FORM_DEFAULTS };
  for (const [key, value] of Object.entries(values)) {
    if (value !== undefined) {
      merged[key] = value;
    }
  }
  return merged;
}

/**
 * Query form schema
 */
export const querySchema: VbenFormSchema[] = [
  {
    component: 'Input',
    fieldName: 'app_id',
    label: '应用唯一标识',
    componentProps: {
      placeholder:
        'Search by \u5E94\u7528\u552F\u4E00\u6807\u8BC6\uFF08\u4E0E manifest.app_id / WorkbenchApp.id \u4E00\u81F4\uFF09',
    },
  },
  {
    component: 'Input',
    fieldName: 'name',
    label: '显示名称',
    componentProps: { placeholder: 'Search by \u663E\u793A\u540D\u79F0' },
  },
  {
    component: 'Select',
    fieldName: 'status',
    label: '上架状态',
    componentProps: {
      allowClear: true,
      options: STATUS_OPTIONS,
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
        options: STATUS_OPTIONS,
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
      field: 'release_phase',
      title: '发布阶段',
      width: 120,
      cellRender: {
        name: 'CellTag',
        options: RELEASE_PHASE_OPTIONS,
      },
    },
    {
      field: 'badge_text',
      title: '自定义角标',
      width: 120,
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
        options: ['edit', { code: 'config', text: '编辑配置' }, 'delete'],
      },
    },
  ];
}

/**
 * Form schema for add/edit
 *
 * 优化要点：
 * - 只把真正必须由人填写的字段标为必填（app_id / name / 图标 token / 描述 / 路由 / 准入类型）。
 * - 其余后端非空字段统一给默认值（见 CATALOG_FORM_DEFAULTS），管理员无需逐项填写。
 * - 枚举字段统一用 Select，避免手填非法值；可挂载空间改多选。
 * - 图标支持上传图片到公共桶（IconUpload），优先于图标 token。
 * - 计费/订阅相关字段仅在对应准入类型下展示（v-show 隐藏时保留默认值，提交仍合法）。
 */
export const formSchema: VbenFormSchema[] = [
  {
    component: 'Input',
    fieldName: 'app_id',
    label: '应用唯一标识',
    rules: 'required',
    help: '与 manifest.app_id / WorkbenchApp.id 一致，例如 hasn_task',
  },
  {
    component: 'Input',
    fieldName: 'name',
    label: '显示名称',
    rules: 'required',
  },
  {
    component: IconUpload,
    fieldName: 'icon_asset_uri',
    label: '应用图标',
    help: '上传图片到公共桶，设置后优先于图标 token 显示',
  },
  {
    component: 'Input',
    fieldName: 'icon',
    label: '图标 token',
    rules: 'required',
    defaultValue: 'box',
    help: '未上传图标时使用的兜底 Lucide 图标 token',
  },
  {
    component: 'Textarea',
    fieldName: 'description',
    label: '应用描述',
    rules: 'required',
    componentProps: { rows: 2 },
  },
  {
    component: 'Select',
    fieldName: 'source',
    label: '来源',
    rules: 'required',
    defaultValue: 'builtin',
    componentProps: { options: SOURCE_OPTIONS },
  },
  {
    component: 'Select',
    fieldName: 'status',
    label: '上架状态',
    rules: 'required',
    defaultValue: 'published',
    componentProps: { options: STATUS_OPTIONS },
  },
  {
    component: 'Select',
    fieldName: 'execution_mode',
    label: '执行形态',
    rules: 'required',
    defaultValue: 'cloud',
    componentProps: { options: EXECUTION_MODE_OPTIONS },
  },
  {
    component: 'Select',
    fieldName: 'scope',
    label: '可挂载空间',
    rules: 'required',
    defaultValue: ['personal'],
    componentProps: {
      mode: 'multiple',
      options: SCOPE_OPTIONS,
    },
  },
  {
    component: 'Select',
    fieldName: 'collaboration_mode',
    label: '协作模式',
    rules: 'required',
    defaultValue: 'none',
    componentProps: { options: COLLABORATION_MODE_OPTIONS },
  },
  {
    component: 'Input',
    fieldName: 'entry_route',
    label: '客户端原生路由',
    rules: 'required',
    help: '客户端内打开应用的路由，统一在 /apps/ 下，例如 /apps/tasks',
  },
  {
    component: 'InputNumber',
    fieldName: 'sort_order',
    label: '工作台排序',
    defaultValue: 0,
    help: '数值小的排在前面',
    componentProps: { style: 'width: 100%' },
  },
  {
    component: 'Select',
    fieldName: 'release_phase',
    label: '发布阶段',
    defaultValue: 'ga',
    componentProps: { options: RELEASE_PHASE_OPTIONS },
    help: '与上架状态正交。全量内测=所有人可见并标内测；灰度内测=仅被邀请/审批通过的用户可见可开',
  },
  {
    component: 'Input',
    fieldName: 'badge_text',
    label: '自定义角标',
    help: '如 热门 / 推荐 / 限免，留空则不显示角标',
  },
  {
    component: 'Input',
    fieldName: 'badge_color',
    label: '角标颜色',
    help: '角标背景色（hex，如 #6D28D9），留空回落品牌紫',
    componentProps: { placeholder: '#6D28D9' },
  },
  {
    component: 'Switch',
    fieldName: 'default_mount',
    label: '新空间自动挂载',
    defaultValue: false,
    help: '开启后新空间注册即用',
  },
  {
    component: 'Input',
    fieldName: 'requires_role',
    label: '企业空间所需角色',
    help: '仅企业空间生效，留空表示 member 即可',
  },
  {
    component: 'Select',
    fieldName: 'access_type',
    label: '准入类型',
    rules: 'required',
    defaultValue: 'free',
    componentProps: { options: getDictOptions('hasn_access_type') },
  },
  {
    component: 'Select',
    fieldName: 'min_tier',
    label: '所需最低订阅档',
    componentProps: { allowClear: true, options: MIN_TIER_OPTIONS },
    dependencies: {
      show: (values) => values.access_type === 'tier',
      triggerFields: ['access_type'],
    },
  },
  {
    component: 'InputNumber',
    fieldName: 'price_amount',
    label: '购买价格',
    componentProps: { min: 0, style: 'width: 100%' },
    dependencies: {
      show: (values) => values.access_type === 'purchase',
      triggerFields: ['access_type'],
    },
  },
  {
    component: 'Select',
    fieldName: 'price_unit',
    label: '计价单位',
    defaultValue: 'cny',
    componentProps: { options: PRICE_UNIT_OPTIONS },
    dependencies: {
      show: (values) => values.access_type !== 'free',
      triggerFields: ['access_type'],
    },
  },
  {
    component: 'Select',
    fieldName: 'billing_cycle',
    label: '计费周期',
    defaultValue: 'once',
    componentProps: { options: BILLING_CYCLE_OPTIONS },
    dependencies: {
      show: (values) => values.access_type !== 'free',
      triggerFields: ['access_type'],
    },
  },
  {
    component: 'InputNumber',
    fieldName: 'trial_days',
    label: '试用天数',
    defaultValue: 0,
    componentProps: { min: 0, style: 'width: 100%' },
    dependencies: {
      show: (values) => values.access_type !== 'free',
      triggerFields: ['access_type'],
    },
  },
  {
    component: 'Input',
    fieldName: 'sku_ref',
    label: '计费商品/订单 SKU',
    help: '对接计费系统时填写，可留空',
    dependencies: {
      show: (values) => values.access_type !== 'free',
      triggerFields: ['access_type'],
    },
  },
  {
    component: 'Switch',
    fieldName: 'manifest_present',
    label: '已部署 code manifest',
    defaultValue: false,
    help: '部署期自动回填，一般无需手动设置',
  },
];
