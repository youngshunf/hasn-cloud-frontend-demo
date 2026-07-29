import type { VbenFormSchema } from '#/adapter/form';

/**
 * 平台默认配置表单 schema（扁平字段，保存时再组装回 {node, agent_runtime} 嵌套）
 *
 * - New API 媒体（mediaSchema）：Select(mode=tags) 自由输入网关模型名，列表即 failover 优先级顺序
 * - 运行时模型（runtimeSchema）：Input 单模型名，留空表示「跟随默认」（分身显式设值必胜）
 */
export const mediaSchema: VbenFormSchema[] = [
  {
    component: 'Select',
    fieldName: 'image_models',
    label: '文生图模型（failover 顺序）',
    componentProps: {
      mode: 'tags',
      placeholder: '输入模型名后回车，如 gpt-image-2（须 new-api 已开渠道）',
      style: 'width: 100%',
      tokenSeparators: [',', ' '],
      open: false,
    },
  },
  {
    component: 'Select',
    fieldName: 'image_edit_models',
    label: '图像编辑模型（failover 顺序）',
    componentProps: {
      mode: 'tags',
      placeholder: '输入支持 /images/edits 的模型名后回车，如 gpt-image-2',
      style: 'width: 100%',
      tokenSeparators: [',', ' '],
      open: false,
    },
  },
  {
    component: 'Select',
    fieldName: 'tts_models',
    label: '语音合成模型（failover 顺序）',
    componentProps: {
      mode: 'tags',
      placeholder:
        '输入模型名后回车，如 qwen3-tts-flash（须 new-api 已开渠道）',
      style: 'width: 100%',
      tokenSeparators: [',', ' '],
      open: false,
    },
  },
  {
    component: 'Select',
    fieldName: 'stt_models',
    label: '语音识别模型（failover 顺序）',
    componentProps: {
      mode: 'tags',
      placeholder:
        '输入模型名后回车，如 qwen3-asr-flash（须 new-api 已开渠道）',
      style: 'width: 100%',
      tokenSeparators: [',', ' '],
      open: false,
    },
  },
  {
    component: 'Select',
    fieldName: 'video_models',
    label: '视频生成模型（failover 顺序）',
    componentProps: {
      mode: 'tags',
      placeholder: '输入模型名后回车，如 wan2.5-i2v（须 new-api 已开渠道）',
      style: 'width: 100%',
      tokenSeparators: [',', ' '],
      open: false,
    },
  },
];

// 主模型 failover 全局兜底池（与四槽 models 同级，挂 agent_runtime.model_fallback_pool）。
// 主人只配主模型，平台维护此池；daemon 据此为每个分身的已解析主模型生成兜底链下发 runtime。
export const fallbackPoolSchema: VbenFormSchema[] = [
  {
    component: 'Select',
    fieldName: 'model_fallback_pool',
    label: '主模型 failover 全局兜底池（有序）',
    componentProps: {
      mode: 'tags',
      placeholder:
        '输入备选模型名后回车，如 gpt-4o、claude-sonnet-4-6（须 new-api 同网关已开渠道）',
      style: 'width: 100%',
      tokenSeparators: [',', ' '],
      open: false,
    },
  },
];

// 节点级安全默认（三层漏斗裁判开关，挂 security.sensitive_scanner_enabled）。
// 缺省开；关闭时 daemon 出站闸跳过 L1 正则扫描（L2 云端 LLM 裁判照常）。
export const securitySchema: VbenFormSchema[] = [
  {
    component: 'Switch',
    fieldName: 'sensitive_scanner_enabled',
    label: 'L1 敏感信息扫描器（正则层）',
    defaultValue: true,
    componentProps: {
      checkedChildren: '开',
      unCheckedChildren: '关',
    },
  },
];

export const runtimeSchema: VbenFormSchema[] = [
  {
    component: 'Input',
    fieldName: 'main',
    label: '主模型',
    componentProps: {
      placeholder: '留空＝跟随默认，如 gpt-5.5',
      allowClear: true,
    },
  },
  {
    component: 'Input',
    fieldName: 'fast',
    label: '快速模型',
    componentProps: {
      placeholder: '留空＝跟随默认',
      allowClear: true,
    },
  },
  {
    component: 'Input',
    fieldName: 'vision',
    label: '视觉模型',
    componentProps: {
      placeholder: '留空＝跟随默认',
      allowClear: true,
    },
  },
  {
    component: 'Input',
    fieldName: 'delegation',
    label: '子分身（delegation）模型',
    componentProps: {
      placeholder: '留空＝跟随默认',
      allowClear: true,
    },
  },
];
