import { requestClient } from '#/api/request';

/**
 * HASN Node 主表 API
 */

// Types
export interface HasnNodes {
  node_id: string;
  node_type: string;
  node_name?: string;
  node_info: Record<string, any>;
  node_key_hash?: string;
  capacity: number;
  created_by_owner_id?: string;
  last_seen_at?: string;
  status: string;
}

export interface HasnNodesParams {
  page?: number;
  size?: number;
  node_id?: string;
  node_type?: string;
  node_name?: string;
  created_by_owner_id?: string;
  last_seen_at?: string;
  status?: string;
}

export interface HasnNodesCreateParams {
  node_id: string;
  node_type: string;
  node_name?: string;
  node_info: Record<string, any>;
  node_key_hash?: string;
  capacity: number;
  created_by_owner_id?: string;
  last_seen_at?: string;
  status: string;
}

export interface HasnNodesListResult {
  items: HasnNodes[];
  total: number;
}

// API functions
export async function getHasnNodesListApi(params: HasnNodesParams): Promise<HasnNodesListResult> {
  return requestClient.get<HasnNodesListResult>('/api/v1/hasn/hasn/nodess', { params });
}

export async function getHasnNodesApi(id: number): Promise<HasnNodes> {
  return requestClient.get<HasnNodes>(`/api/v1/hasn/hasn/nodess/${id}`);
}

export async function createHasnNodesApi(data: HasnNodesCreateParams): Promise<HasnNodes> {
  return requestClient.post<HasnNodes>('/api/v1/hasn/hasn/nodess', data);
}

export async function updateHasnNodesApi(id: number, data: Partial<HasnNodesCreateParams>): Promise<HasnNodes> {
  return requestClient.put<HasnNodes>(`/api/v1/hasn/hasn/nodess/${id}`, data);
}

export async function deleteHasnNodesApi(id: number): Promise<void> {
  return requestClient.delete<void>(`/api/v1/hasn/hasn/nodess/${id}`);
}
