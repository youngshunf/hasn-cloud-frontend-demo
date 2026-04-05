import { requestClient } from '#/api/request';

/**
 * HASN Owner API Key 表 API
 */

// Types
export interface HasnOwnerApiKeys {
  key_id: string;
  owner_id: string;
  key_name: string;
  key_hash: string;
  status: string;
  scopes: Record<string, any>;
  bound_node_id?: string;
  expires_at?: string;
  last_used_at?: string;
  revoked_at?: string;
  revoke_reason?: string;
}

export interface HasnOwnerApiKeysParams {
  page?: number;
  size?: number;
  key_id?: string;
  owner_id?: string;
  key_name?: string;
  status?: string;
  bound_node_id?: string;
  expires_at?: string;
  last_used_at?: string;
  revoked_at?: string;
}

export interface HasnOwnerApiKeysCreateParams {
  key_id: string;
  owner_id: string;
  key_name: string;
  key_hash: string;
  status: string;
  scopes: Record<string, any>;
  bound_node_id?: string;
  expires_at?: string;
  last_used_at?: string;
  revoked_at?: string;
  revoke_reason?: string;
}

export interface HasnOwnerApiKeysListResult {
  items: HasnOwnerApiKeys[];
  total: number;
}

// API functions
export async function getHasnOwnerApiKeysListApi(params: HasnOwnerApiKeysParams): Promise<HasnOwnerApiKeysListResult> {
  return requestClient.get<HasnOwnerApiKeysListResult>('/api/v1/hasn/hasn/owner/api/keyss', { params });
}

export async function getHasnOwnerApiKeysApi(id: number): Promise<HasnOwnerApiKeys> {
  return requestClient.get<HasnOwnerApiKeys>(`/api/v1/hasn/hasn/owner/api/keyss/${id}`);
}

export async function createHasnOwnerApiKeysApi(data: HasnOwnerApiKeysCreateParams): Promise<HasnOwnerApiKeys> {
  return requestClient.post<HasnOwnerApiKeys>('/api/v1/hasn/hasn/owner/api/keyss', data);
}

export async function updateHasnOwnerApiKeysApi(id: number, data: Partial<HasnOwnerApiKeysCreateParams>): Promise<HasnOwnerApiKeys> {
  return requestClient.put<HasnOwnerApiKeys>(`/api/v1/hasn/hasn/owner/api/keyss/${id}`, data);
}

export async function deleteHasnOwnerApiKeysApi(id: number): Promise<void> {
  return requestClient.delete<void>(`/api/v1/hasn/hasn/owner/api/keyss/${id}`);
}
