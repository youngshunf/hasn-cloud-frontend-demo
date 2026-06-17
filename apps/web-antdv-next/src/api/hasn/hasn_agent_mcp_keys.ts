import { requestClient } from '#/api/request';

/**
 * Agent MCP 接入凭证（稳定可吊销 API Key，落库只存哈希） API
 */

// Types
export interface HasnAgentMcpKeys {
  id: number;
  agent_hasn_id: string;
  owner_hasn_id: string;
  owner_user_id?: number;
  key_prefix: string;
  key_hash: string;
  scopes: Record<string, any>;
  node_id?: string;
  status: string;
  expire_time?: string;
  last_used_time?: string;
}

export interface HasnAgentMcpKeysParams {
  page?: number;
  size?: number;
  agent_hasn_id?: string;
  owner_hasn_id?: string;
  owner_user_id?: number;
  node_id?: string;
  status?: string;
  expire_time?: string;
  last_used_time?: string;
}

export interface HasnAgentMcpKeysCreateParams {
  agent_hasn_id: string;
  owner_hasn_id: string;
  owner_user_id?: number;
  key_prefix: string;
  key_hash: string;
  scopes: Record<string, any>;
  node_id?: string;
  status: string;
  expire_time?: string;
  last_used_time?: string;
}

export interface HasnAgentMcpKeysListResult {
  items: HasnAgentMcpKeys[];
  total: number;
}

// API functions
export async function getHasnAgentMcpKeysListApi(
  params: HasnAgentMcpKeysParams,
): Promise<HasnAgentMcpKeysListResult> {
  return requestClient.get<HasnAgentMcpKeysListResult>(
    '/api/v1/hasn/hasn-agent-mcp-keyss',
    { params },
  );
}

export async function getHasnAgentMcpKeysApi(
  id: number,
): Promise<HasnAgentMcpKeys> {
  return requestClient.get<HasnAgentMcpKeys>(
    `/api/v1/hasn/hasn-agent-mcp-keyss/${id}`,
  );
}

export async function createHasnAgentMcpKeysApi(
  data: any,
): Promise<HasnAgentMcpKeys> {
  return requestClient.post<HasnAgentMcpKeys>(
    '/api/v1/hasn/hasn-agent-mcp-keyss',
    data,
  );
}

export async function updateHasnAgentMcpKeysApi(
  id: number,
  data: Partial<HasnAgentMcpKeysCreateParams>,
): Promise<HasnAgentMcpKeys> {
  return requestClient.put<HasnAgentMcpKeys>(
    `/api/v1/hasn/hasn-agent-mcp-keyss/${id}`,
    data,
  );
}

export async function deleteHasnAgentMcpKeysApi(id: number): Promise<void> {
  return requestClient.delete(`/api/v1/hasn/hasn-agent-mcp-keyss/${id}`);
}
