import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeGridProps } from '#/adapter/vxe-table';
import type { HasnModelRegistry } from '#/api/hasn/hasn_model_registry';

import { $t } from '@vben/locales';

/**
 * 能力类别。`unclassified`（待标注）标红——未标注的模型**不会下发给分身**，
 * 漏标等于这个模型白买了，必须一眼看见。
 */
export const CAPABILITY_OPTIONS = [
  { color: 'red', label: '待标注', value: 'unclassified' },
  { color: 'blue', label: '对话', value: 'chat' },
  { color: 'blue', label: '视觉理解', value: 'vision' },
  { color: 'green', label: '文生图', value: 'image_generate' },
  { color: 'green', label: '图像编辑', value: 'image_edit' },
  { color: 'purple', label: '语音合成', value: 'tts' },
  { color: 'purple', label: '语音识别', value: 'stt' },
  { color: 'orange', label: '视频生成', value: 'video' },
  { color: 'default', label: '向量化', value: 'embedding' },
  { color: 'default', label: '重排', value: 'rerank' },
];

/** 网关状态：missing = 本轮同步在网关上没看到（行保留，人工标注不丢，但不参与下发）。 */
export const UPSTREAM_STATUS_OPTIONS = [
  { color: 'green', label: '网关上可用', value: 'active' },
  { color: 'red', label: '网关上已消失', value: 'missing' },
];

/** 入参方言（见 doc19 渠道方言矩阵：阿里系只认档位，OpenAI 兼容要像素）。 */
export const DIALECT_OPTIONS = [
  { color: 'blue', label: 'OpenAI 兼容', value: 'openai' },
  { color: 'orange', label: '阿里通义万相', value: 'ali' },
];

/** 质量档。 */
export const QUALITY_OPTIONS = [
  { color: 'default', label: '草稿', value: 'draft' },
  { color: 'blue', label: '标准', value: 'standard' },
  { color: 'green', label: '高质量', value: 'high' },
];

/** 价格档位（对外只给档位，不给计费倍率）。 */
export const COST_TIER_OPTIONS = [
  { color: 'green', label: '经济', value: 'economy' },
  { color: 'blue', label: '标准', value: 'standard' },
  { color: 'orange', label: '高价', value: 'premium' },
];

/** 输入要求三态（省略即「不支持」）。 */
export const INPUT_REQUIREMENT_OPTIONS = [
  { label: '不支持', value: 'unsupported' },
  { label: '可选', value: 'optional' },
  { label: '必需', value: 'required' },
];

/** 标注表单里固定给出的输入种类；其余键走「其它输入要求」JSON 补充。 */
export const KNOWN_INPUT_KEYS = ['image', 'audio', 'last_frame'] as const;

export const INPUT_KEY_LABELS: Record<string, string> = {
  audio: '音频（驱动/对口型）',
  image: '参考图 / 首帧',
  last_frame: '尾帧',
};

/** 查询表单。 */
export const querySchema: VbenFormSchema[] = [
  {
    component: 'Input',
    fieldName: 'keyword',
    label: '模型名',
    componentProps: { placeholder: '模糊匹配，如 wan2.6' },
  },
  {
    component: 'Select',
    fieldName: 'capability',
    label: '能力类别',
    componentProps: {
      allowClear: true,
      options: CAPABILITY_OPTIONS,
      placeholder: '选「待标注」看运营待办',
    },
  },
  {
    component: 'Select',
    fieldName: 'upstream_status',
    label: '网关状态',
    componentProps: { allowClear: true, options: UPSTREAM_STATUS_OPTIONS },
  },
];

/** 把 `inputs` 表渲染成一行可读文案（不支持的键不显示——省略即不支持）。 */
export function formatInputs(inputs: Record<string, string> | undefined): string {
  if (!inputs) {
    return '';
  }
  const parts = Object.entries(inputs)
    .filter(([, requirement]) => requirement && requirement !== 'unsupported')
    .map(([key, requirement]) => {
      const label = INPUT_KEY_LABELS[key] ?? key;
      const mark = requirement === 'required' ? '必需' : '可选';
      return `${label}:${mark}`;
    });
  return parts.join('，');
}

/**
 * 表格列。
 *
 * **原始计费倍率 `relative_cost` 只在本页出现**：它是内部计费参数，下发出去等于把计费口径
 * 泄漏给分身和主人；运营需要它核对档位算得对不对，所以此处保留。
 */
export function useColumns(
  onActionClick?: OnActionClickFn<HasnModelRegistry>,
): VxeGridProps['columns'] {
  return [
    {
      field: 'model_name',
      title: '模型名',
      minWidth: 240,
      fixed: 'left',
    },
    {
      field: 'capability',
      title: '能力类别',
      width: 110,
      cellRender: { name: 'CellTag', options: CAPABILITY_OPTIONS },
    },
    {
      field: 'suggested_capability',
      title: '建议',
      width: 100,
      cellRender: { name: 'CellTag', options: CAPABILITY_OPTIONS },
    },
    {
      field: 'vendor_name',
      title: '供应商',
      width: 110,
    },
    {
      field: 'cost_tier',
      title: '价格档位',
      width: 100,
      cellRender: { name: 'CellTag', options: COST_TIER_OPTIONS },
    },
    {
      field: 'relative_cost',
      title: '计费倍率',
      width: 100,
      align: 'right',
    },
    {
      field: 'quality',
      title: '质量档',
      width: 90,
      cellRender: { name: 'CellTag', options: QUALITY_OPTIONS },
    },
    {
      field: 'inputs',
      title: '输入要求',
      minWidth: 200,
      formatter: ({ row }: { row: HasnModelRegistry }) => formatInputs(row.inputs),
    },
    {
      field: 'dialect',
      title: '方言',
      width: 120,
      cellRender: { name: 'CellTag', options: DIALECT_OPTIONS },
    },
    {
      field: 'agent_visible',
      title: '对分身可见',
      width: 100,
      formatter: ({ row }: { row: HasnModelRegistry }) =>
        row.agent_visible ? '是' : '否',
    },
    {
      field: 'sort_order',
      title: '排序',
      width: 70,
      align: 'right',
    },
    {
      field: 'upstream_status',
      title: '网关状态',
      width: 110,
      cellRender: { name: 'CellTag', options: UPSTREAM_STATUS_OPTIONS },
    },
    {
      field: 'scenario',
      title: '适用场景',
      minWidth: 200,
    },
    {
      field: 'last_synced_time',
      title: '最近同步',
      width: 170,
    },
    {
      field: 'operation',
      title: $t('common.table.operation'),
      align: 'center',
      fixed: 'right',
      width: 100,
      cellRender: {
        attrs: { nameField: 'model_name', onClick: onActionClick },
        name: 'CellOperation',
        options: [{ code: 'annotate', text: '标注' }],
      },
    },
  ];
}

/**
 * 标注表单。**只有人工标注列**——成本/分组/供应商/网关状态由同步器权威覆盖，
 * 放开只会制造「改了没生效」的困惑。
 */
export const annotationFormSchema: VbenFormSchema[] = [
  {
    component: 'Select',
    fieldName: 'capability',
    label: '能力类别',
    rules: 'required',
    componentProps: { options: CAPABILITY_OPTIONS },
    help: '未标注（待标注）的模型不会下发给分身',
  },
  {
    component: 'Select',
    fieldName: 'input_image',
    label: INPUT_KEY_LABELS.image,
    defaultValue: 'unsupported',
    componentProps: { options: INPUT_REQUIREMENT_OPTIONS },
    help: '「必需」= 不给图必然失败且仍预扣配额；「不支持」= 给了图也不会用',
  },
  {
    component: 'Select',
    fieldName: 'input_audio',
    label: INPUT_KEY_LABELS.audio,
    defaultValue: 'unsupported',
    componentProps: { options: INPUT_REQUIREMENT_OPTIONS },
  },
  {
    component: 'Select',
    fieldName: 'input_last_frame',
    label: INPUT_KEY_LABELS.last_frame,
    defaultValue: 'unsupported',
    componentProps: { options: INPUT_REQUIREMENT_OPTIONS },
  },
  {
    component: 'Textarea',
    fieldName: 'inputs_extra',
    label: '其它输入要求',
    componentProps: { rows: 2, placeholder: '{"mask": "optional"}' },
    help: 'JSON 对象，键集合可扩展；值只能是 required/optional/unsupported',
  },
  {
    component: 'Select',
    fieldName: 'dialect',
    label: '入参方言',
    componentProps: { allowClear: true, options: DIALECT_OPTIONS },
    help: '阿里系只认 480P/720P/1080P 档位，OpenAI 兼容要 宽x高 像素',
  },
  {
    component: 'Select',
    fieldName: 'quality',
    label: '质量档',
    componentProps: { allowClear: true, options: QUALITY_OPTIONS },
  },
  {
    component: 'Select',
    fieldName: 'cost_tier_override',
    label: '价格档位覆盖',
    componentProps: { allowClear: true, options: COST_TIER_OPTIONS },
    help: '留空即用同能力内比价算出来的档位',
  },
  {
    component: 'InputNumber',
    fieldName: 'sort_order',
    label: '推荐顺序',
    defaultValue: 0,
    componentProps: { min: 0, precision: 0 },
    help: '同能力内 failover 的先后，小的先试',
  },
  {
    component: 'Switch',
    fieldName: 'agent_visible',
    label: '对分身可见',
    defaultValue: false,
  },
  {
    component: 'Textarea',
    fieldName: 'scenario',
    label: '适用场景',
    componentProps: { rows: 2, placeholder: '一句话，给分身选型看' },
  },
];
