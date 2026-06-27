import { requestClient } from '#/api/request';

/**
 * 第三方 MCP 网关 · 平台管理面 API（P7-D admin，事实源 10 §7.2 / 实施 99 P7-D）
 *
 * 平台运营在此配置 **system-origin** 平台 MCP server（如企查查 qcc）：注册 remote_service、
 * 写/轮换/撤销平台 key、配 per-owner 配额/限流。平台 key 是全体 owner 共享的付费凭据，
 * 必须配额防单 owner 刷爆（10 §7.2 硬需求）。明文平台 key 仅前端→后端单向提交，加密落库，
 * **永不回显**（出参绝无明文）。
 *
 * 路由前缀 `/api/v1/external_mcp/admin`，Admin JWT + RBAC（external_mcp:server:add/edit/del）。
 */

// 平台 server（system-origin，出参绝无明文凭据）
export interface ExternalMcpSystemServer {
  mcp_id: string;
  name: string;
  display_name?: null | string;
  hosting: string;
  transport: string;
  endpoint: string;
  origin: string;
  scope?: null | string;
  risk_level: string;
  /** 已自省工具缓存（raw_name/name/description）。 */
  advertised_tools_cache?: any[] | null;
  tools_hash?: null | string;
  health_status: string;
  health_detail?: null | string;
  per_owner_daily_quota: number;
  rate_limit_per_min: number;
  status: string;
}

/** 注册平台 server 请求体（hosting 恒 remote_service、origin 恒 system）。 */
export interface RegisterSystemServerParams {
  name: string;
  display_name?: string;
  transport?: string;
  endpoint: string;
  risk_level?: string;
  credential?: string;
  auth_header?: string;
  auth_scheme?: string;
  per_owner_daily_quota?: number;
  rate_limit_per_min?: number;
}

/** 写入/轮换平台 key 请求体（明文写后永不回显）。 */
export interface SetCredentialParams {
  credential: string;
  auth_header?: string;
  auth_scheme?: string;
}

/** 配 per-owner 配额/限流请求体。 */
export interface SetServerQuotaParams {
  per_owner_daily_quota: number;
  rate_limit_per_min: number;
}

export interface ExternalMcpSystemServerListResult {
  items: ExternalMcpSystemServer[];
  total: number;
}

/**
 * 列 system-origin 平台 server。后端返回纯列表，这里包成 {items,total} 供 vxe-table 消费。
 */
export async function getSystemServerListApi(): Promise<ExternalMcpSystemServerListResult> {
  const rows = await requestClient.get<ExternalMcpSystemServer[]>(
    '/api/v1/external_mcp/admin/servers',
  );
  const items = rows ?? [];
  return { items, total: items.length };
}

/** 平台 server 详情（含 advertised_tools）。 */
export async function getSystemServerDetailApi(
  mcpId: string,
): Promise<ExternalMcpSystemServer> {
  return requestClient.get<ExternalMcpSystemServer>(
    `/api/v1/external_mcp/admin/servers/${mcpId}`,
  );
}

/** 注册一个 system-origin 平台 MCP server（可选随注册写入平台 key）。 */
export async function registerSystemServerApi(
  data: RegisterSystemServerParams,
): Promise<{ mcp_id: string; name: string }> {
  return requestClient.post<{ mcp_id: string; name: string }>(
    '/api/v1/external_mcp/admin/servers',
    data,
  );
}

/** 自省平台 server（拉 tools/list → 归一缓存 advertised_tools + tools_hash）。 */
export async function introspectSystemServerApi(mcpId: string): Promise<any> {
  return requestClient.post(
    `/api/v1/external_mcp/admin/servers/${mcpId}/introspect`,
  );
}

/** 写入/轮换平台 key（明文→加密；同 URI 覆盖=轮换）。 */
export async function setPlatformCredentialApi(
  mcpId: string,
  data: SetCredentialParams,
): Promise<any> {
  return requestClient.put(
    `/api/v1/external_mcp/admin/servers/${mcpId}/credential`,
    data,
  );
}

/** 撤销平台 key（撤销后分身调用在解析阶段软挡，提示重配）。 */
export async function revokePlatformCredentialApi(mcpId: string): Promise<any> {
  return requestClient.delete(
    `/api/v1/external_mcp/admin/servers/${mcpId}/credential`,
  );
}

/** 配 per-owner 配额/限流（防单 owner 刷爆平台 key）。 */
export async function setSystemServerQuotaApi(
  mcpId: string,
  data: SetServerQuotaParams,
): Promise<any> {
  return requestClient.put(
    `/api/v1/external_mcp/admin/servers/${mcpId}/quota`,
    data,
  );
}

/** 启用/停用平台 server。 */
export async function setSystemServerStatusApi(
  mcpId: string,
  status: string,
): Promise<any> {
  return requestClient.put(
    `/api/v1/external_mcp/admin/servers/${mcpId}/status`,
    { status },
  );
}

/** 删除平台 server（连带删除其凭据与所有分身绑定）。 */
export async function deleteSystemServerApi(
  mcpId: string,
): Promise<{ deleted: boolean }> {
  return requestClient.delete<{ deleted: boolean }>(
    `/api/v1/external_mcp/admin/servers/${mcpId}`,
  );
}
