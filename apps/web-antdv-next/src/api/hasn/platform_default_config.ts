import { requestClient } from '#/api/request';

/**
 * 平台默认配置 API（PDC：Platform Default Config Push）
 *
 * 运营在云端改一处，自动下发到所有桌面端 daemon + agent runtime。
 * 单行权威表 hasn_platform_default_config，Admin 覆盖式 PUT，server 重算 revision。
 */

// New API 网关媒体模型链（image/tts/stt/video）；不承载本地模型与本地路由策略。
// 列表为空时 daemon 回落到内置网关模型链，不代表强制本地推理。
export interface PlatformMediaDefaults {
  image_models: string[];
  tts_models: string[];
  stt_models: string[];
  video_models: string[];
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
  // 主模型 failover 全局兜底池（有序模型名，同一 new-api 网关只换模型名）。空=无兜底（单模型，行为不回归）。
  // daemon 据此为每个分身的已解析主模型生成兜底链下发 runtime（剔除主模型自身、去重、保序）。
  model_fallback_pool: string[];
}

// 节点级安全默认（三层漏斗裁判开关等，doc07）
export interface PlatformSecurityDefaults {
  // L1 敏感信息扫描器（hasn-core SensitiveScanner）总开关，缺省 true。
  // 关闭时 daemon 出站闸跳过正则层（L2 云端 LLM 裁判照常）。
  sensitive_scanner_enabled: boolean;
}

// PUT 请求体形状（与云端 PlatformDefaultConfig 对齐）
export interface PlatformDefaultConfig {
  node: PlatformNodeDefaults;
  agent_runtime: PlatformAgentRuntimeDefaults;
  security?: PlatformSecurityDefaults;
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
