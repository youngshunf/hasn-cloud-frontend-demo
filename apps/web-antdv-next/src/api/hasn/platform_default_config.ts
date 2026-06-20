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

// 节点级视频引擎（film / VideoClaw 应用）默认：五类模型 failover 列表 + 引擎分发包 manifest 地址
// 列表为空＝daemon 退回本机 config [film]；manifest_url 空＝引擎包未配置（daemon 据此 honest 拒绝下载）
export interface PlatformFilmDefaults {
  llm_models: string[];
  vlm_models: string[];
  image_t2i_models: string[];
  image_it2i_models: string[];
  video_models: string[];
  package_manifest_url: string;
}

export interface PlatformNodeDefaults {
  media: PlatformMediaDefaults;
  film: PlatformFilmDefaults;
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
