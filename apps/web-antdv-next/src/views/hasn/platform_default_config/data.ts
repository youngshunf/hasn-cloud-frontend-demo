import type { VbenFormSchema } from '#/adapter/form';

/**
 * 平台默认配置表单 schema（扁平字段，保存时再组装回 {node, agent_runtime} 嵌套）
 *
 * - 节点媒体（mediaSchema）：Select(mode=tags) 自由输入模型名，列表即 failover 优先级顺序
 * - 运行时模型（runtimeSchema）：Input 单模型名，留空表示「跟随默认」（分身显式设值必胜）
 */
export const mediaSchema: VbenFormSchema[] = [
  {
    component: 'Select',
    fieldName: 'image_models',
    label: '图像模型（failover 顺序）',
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
    fieldName: 'tts_models',
    label: '语音合成模型（failover 顺序）',
    componentProps: {
      mode: 'tags',
      placeholder: '输入模型名后回车，如 gpt-4o-mini-tts',
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
      placeholder: '输入模型名后回车，如 whisper-1',
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
