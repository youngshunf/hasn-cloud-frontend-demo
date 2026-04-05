import { requestClient } from '#/api/request';

/**
 * HasnAgents API
 */

// Types
export interface HasnAgents {
  id: number;
  hasn_id: string;
  star_id: string;
  owner_id: string;
  name: string;
  agent_name: string;
  description?: string;
  avatar_url?: string;
  type: string;
  role: string;
  server_id?: string;
  home_client_id?: string;
  api_key_hash: string;
  status: string;
  created_via: string;
  created_time: string;
  updated_time?: string;
}

export interface HasnAgentsParams {
  page?: number;
  size?: number;
  hasn_id?: string;
  star_id?: string;
  owner_id?: string;
  name?: string;
  agent_name?: string;
  type?: string;
  server_id?: string;
  home_client_id?: string;
  status?: string;
}

export interface HasnAgentsCreateParams {
  hasn_id: string;
  star_id: string;
  owner_id: string;
  name: string;
  agent_name: string;
  description?: string;
  avatar_url?: string;
  type: string;
  role: string;
  server_id?: string;
  home_client_id?: string;
  api_key_hash: string;
  status: string;
  created_via: string;
}

export interface HasnAgentsListResult {
  items: HasnAgents[];
  total: number;
}

// API functions
export async function getHasnAgentsListApi(params: HasnAgentsParams): Promise<HasnAgentsListResult> {
  return requestClient.get<HasnAgentsListResult>('/api/v1/hasn/agents', { params });
}

export async function getHasnAgentsApi(id: number): Promise<HasnAgents> {
  return requestClient.get<HasnAgents>(`/api/v1/hasn/agents/${id}`);
}

export async function createHasnAgentsApi(data: HasnAgentsCreateParams): Promise<HasnAgents> {
  return requestClient.post<HasnAgents>('/api/v1/hasn/agents', data);
}

export async function updateHasnAgentsApi(id: number, data: Partial<HasnAgentsCreateParams>): Promise<HasnAgents> {
  return requestClient.put<HasnAgents>(`/api/v1/hasn/agents/${id}`, data);
}

export async function deleteHasnAgentsApi(id: number): Promise<void> {
  return requestClient.delete<void>(`/api/v1/hasn/agents/${id}`);
}
