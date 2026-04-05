import { requestClient } from '#/api/request';

/**
 * HASN Node Owner Binding 租约表 API
 */

// Types
export interface HasnNodeBindings {
  binding_id: string;
  node_id: string;
  owner_id: string;
  auth_profile: string;
  scopes: Record<string, any>;
  status: string;
  bound_at: string;
  expires_at: string;
  renewed_at?: string;
  revoked_at?: string;
  revoke_reason?: string;
  last_used_at?: string;
}

export interface HasnNodeBindingsParams {
  page?: number;
  size?: number;
  binding_id?: string;
  node_id?: string;
  owner_id?: string;
  status?: string;
  bound_at?: string;
  expires_at?: string;
  renewed_at?: string;
  revoked_at?: string;
  last_used_at?: string;
}

export interface HasnNodeBindingsCreateParams {
  binding_id: string;
  node_id: string;
  owner_id: string;
  auth_profile: string;
  scopes: Record<string, any>;
  status: string;
  bound_at: string;
  expires_at: string;
  renewed_at?: string;
  revoked_at?: string;
  revoke_reason?: string;
  last_used_at?: string;
}

export interface HasnNodeBindingsListResult {
  items: HasnNodeBindings[];
  total: number;
}

// API functions
export async function getHasnNodeBindingsListApi(params: HasnNodeBindingsParams): Promise<HasnNodeBindingsListResult> {
  return requestClient.get<HasnNodeBindingsListResult>('/api/v1/hasn/hasn/node/bindingss', { params });
}

export async function getHasnNodeBindingsApi(id: number): Promise<HasnNodeBindings> {
  return requestClient.get<HasnNodeBindings>(`/api/v1/hasn/hasn/node/bindingss/${id}`);
}

export async function createHasnNodeBindingsApi(data: HasnNodeBindingsCreateParams): Promise<HasnNodeBindings> {
  return requestClient.post<HasnNodeBindings>('/api/v1/hasn/hasn/node/bindingss', data);
}

export async function updateHasnNodeBindingsApi(id: number, data: Partial<HasnNodeBindingsCreateParams>): Promise<HasnNodeBindings> {
  return requestClient.put<HasnNodeBindings>(`/api/v1/hasn/hasn/node/bindingss/${id}`, data);
}

export async function deleteHasnNodeBindingsApi(id: number): Promise<void> {
  return requestClient.delete<void>(`/api/v1/hasn/hasn/node/bindingss/${id}`);
}
