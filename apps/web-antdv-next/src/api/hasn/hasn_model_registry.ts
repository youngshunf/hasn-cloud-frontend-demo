import { requestClient } from '#/api/request';

/**
 * 模型注册表 API（管理端）
 *
 * 后端不是标准 CRUD：注册表的行**只能来自 new-api 同步**，没有新增/删除端点——
 * 手工新增等于放开「手输一个网关上不存在的模型名」，那正是 2026-08-02 线上视频全线 503
 * 的根因；删行会连人工标注一起丢（同步语义是「消失只标 missing、绝不删」）。
 *
 * 路由前缀 `/api/v1/hasn/model-registry`。
 */

/** 能力类别（`unclassified` 即待标注，未标注不下发给分身）。 */
export type ModelCapability =
  | 'chat'
  | 'embedding'
  | 'image_edit'
  | 'image_generate'
  | 'rerank'
  | 'stt'
  | 'tts'
  | 'unclassified'
  | 'video'
  | 'vision';

/** 输入要求三态：省略即 unsupported；text 恒为必需，不写进表里。 */
export type InputRequirement = 'optional' | 'required' | 'unsupported';

export interface HasnModelRegistry {
  id: number;
  /** 网关上的模型名（同步键）。 */
  model_name: string;
  capability: string;
  /** 输入要求表，如 `{ image: 'required', audio: 'optional' }`。 */
  inputs: Record<string, string>;
  /** 入参方言：openai / ali。 */
  dialect?: null | string;
  /** 质量档：draft / standard / high。 */
  quality?: null | string;
  /** 适用场景一句话（给分身选型看）。 */
  scenario?: null | string;
  /** 是否对分身暴露。 */
  agent_visible: boolean;
  /** 同能力内的推荐顺序（failover 优先级，小的在前）。 */
  sort_order: number;
  vendor_name?: null | string;
  /** new-api model_ratio 快照，**仅此页可见**，绝不下发给分身/主人。 */
  relative_cost?: null | number | string;
  cost_extra: Record<string, unknown>;
  /** 人工覆盖价格档位；留空即用算出来的 `cost_tier`。 */
  cost_tier_override?: null | string;
  /** 按能力类别内比价算出来的档位（economy/standard/premium）；可比模型不足两个时为空。 */
  cost_tier?: null | string;
  enable_groups: string[];
  /** 网关状态：active（还在）/ missing（网关上已消失）。 */
  upstream_status: string;
  last_synced_time?: null | string;
  /** 只读建议值（按模型名 + 端点类型推断），需人工确认后才生效。 */
  suggested_capability: string;
  created_time?: string;
  updated_time?: null | string;
}

export interface ModelRegistryListParams {
  page?: number;
  size?: number;
  capability?: string;
  upstream_status?: string;
  keyword?: string;
}

export interface ModelRegistryListResult {
  items: HasnModelRegistry[];
  total: number;
}

/** 人工标注（局部更新，未传的字段一律不动）。 */
export interface PatchModelAnnotationParams {
  capability?: string;
  inputs?: Record<string, string>;
  dialect?: null | string;
  quality?: null | string;
  scenario?: null | string;
  agent_visible?: boolean;
  sort_order?: number;
  cost_tier_override?: null | string;
}

/** 一轮同步的真实结果。 */
export interface ModelRegistrySyncReport {
  created: number;
  updated: number;
  missing: number;
  upstream_total: number;
  unclassified: number;
}

/** 分页列出注册表（可按能力类别 / 网关状态 / 模型名关键字过滤）。 */
export async function getModelRegistryListApi(
  params: ModelRegistryListParams,
): Promise<ModelRegistryListResult> {
  return requestClient.get<ModelRegistryListResult>(
    '/api/v1/hasn/model-registry',
    { params },
  );
}

/** 更新单个模型的人工标注。 */
export async function patchModelAnnotationApi(
  id: number,
  data: PatchModelAnnotationParams,
): Promise<HasnModelRegistry> {
  return requestClient.patch<HasnModelRegistry>(
    `/api/v1/hasn/model-registry/${id}`,
    data,
  );
}

/** 立即从 new-api 同步一轮（upsert，绝不删行）。失败会如实抛错，不返回假报告。 */
export async function syncModelRegistryApi(): Promise<ModelRegistrySyncReport> {
  return requestClient.post<ModelRegistrySyncReport>(
    '/api/v1/hasn/model-registry/sync',
  );
}
