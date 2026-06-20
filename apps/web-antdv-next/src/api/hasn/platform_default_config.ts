import { requestClient } from '#/api/request';

/**
 * 平台默认配置 API（PDC：Platform Default Config Push）
 *
 * 运营在云端改一处，自动下发到所有桌面端 daemon + agent runtime。
 * 单行权威表 hasn_platform_default_config，Admin 覆盖式 PUT，server 重算 revision。
 */

// 节点级媒体模型默认（image/tts/stt，列表为空表示不覆盖、回落 daemon 本地配置）
export interface PlatformMediaDefaults {
  image_models: string[];
  tts_models: string[];
  stt_models: string[];
}

export interface PlatformNodeDefaults {
  media: PlatformMediaDefaults;
}

// 平台默认 agent 运行时模型四槽（null/空 表示「跟随默认」，分身显式设值必胜）
export interface PlatformAgentRuntimeModels {
  main?: null | string;
  fast?: null | string;
  vision?: null | string;
  delegation?: null | string;
}

export interface PlatformAgentRuntimeDefaults {
  models: PlatformAgentRuntimeModels;
}

// PUT 请求体形状（与云端 PlatformDefaultConfig 对齐）
export interface PlatformDefaultConfig {
  node: PlatformNodeDefaults;
  agent_runtime: PlatformAgentRuntimeDefaults;
  // 只读下发聚合：各 AI-Native 应用自治的 hasn_app_catalog.config_json（如 film 的 5 类模型 + 引擎包
  // manifest 内联）。权威在 catalog，管理端编辑 catalog 页面；GET 响应携带，PUT 写回会被云端丢弃。
  app_configs?: Record<string, Record<string, any>>;
}

// GET 响应（config + 审计元数据）
export interface PlatformDefaultConfigResponse {
  config: PlatformDefaultConfig;
  revision: string;
  updated_by?: null | string;
  updated_time?: null | string;
}

/**
 * 读取平台默认配置（单行）
 */
export async function getPlatformDefaultConfigApi(): Promise<PlatformDefaultConfigResponse> {
  return requestClient.get<PlatformDefaultConfigResponse>(
    '/api/v1/hasn/platform-default-config',
  );
}

/**
 * 覆盖式保存平台默认配置（server 重算 revision，自动下发桌面端）
 */
export async function updatePlatformDefaultConfigApi(
  data: PlatformDefaultConfig,
): Promise<PlatformDefaultConfigResponse> {
  return requestClient.put<PlatformDefaultConfigResponse>(
    '/api/v1/hasn/platform-default-config',
    data,
  );
}
