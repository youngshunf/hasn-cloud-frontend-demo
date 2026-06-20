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
];

/**
 * 节点视频引擎（film / VideoClaw 应用）模型默认 schema
 *
 * - 五类模型（llm/vlm/image_t2i/image_it2i/video）：Select(mode=tags) 自由输入，列表即 failover 优先级
 *   （空＝daemon 退回本机 config [film]）
 * - 引擎包 manifest 地址（package_manifest_url）：Input 单值，运营托管 downloadable_local 引擎包后填，
 *   空＝未配置（daemon 据此 honest 拒绝下载）。页面读出原值并回写 → admin 保存天然 round-trip 保留，
 *   不会抹掉运营脚本下发的地址。
 */
export const filmSchema: VbenFormSchema[] = [
  {
    component: 'Select',
    fieldName: 'llm_models',
    label: '脚本 / 规划 LLM（failover 顺序）',
    componentProps: {
      mode: 'tags',
      placeholder: '输入模型名后回车，如 gpt-5.5（须 new-api 已开渠道）',
      style: 'width: 100%',
      tokenSeparators: [',', ' '],
      open: false,
    },
  },
  {
    component: 'Select',
    fieldName: 'vlm_models',
    label: '视觉理解 VLM（failover 顺序）',
    componentProps: {
      mode: 'tags',
      placeholder: '输入模型名后回车，如 gpt-4o',
      style: 'width: 100%',
      tokenSeparators: [',', ' '],
      open: false,
    },
  },
  {
    component: 'Select',
    fieldName: 'image_t2i_models',
    label: '文生图模型（failover 顺序）',
    componentProps: {
      mode: 'tags',
      placeholder: '输入模型名后回车，如 gpt-image-2',
      style: 'width: 100%',
      tokenSeparators: [',', ' '],
      open: false,
    },
  },
  {
    component: 'Select',
    fieldName: 'image_it2i_models',
    label: '图生图模型（failover 顺序）',
    componentProps: {
      mode: 'tags',
      placeholder: '输入模型名后回车，如 gpt-image-2',
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
      placeholder: '输入模型名后回车，如 sora-2、kling-v2',
      style: 'width: 100%',
      tokenSeparators: [',', ' '],
      open: false,
    },
  },
  {
    component: 'Input',
    fieldName: 'package_manifest_url',
    label: '引擎分发包 manifest 地址',
    componentProps: {
      placeholder:
        '运营托管 downloadable_local 引擎包后填对象存储 URL；留空＝未配置，daemon 据此拒绝下载',
      allowClear: true,
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
