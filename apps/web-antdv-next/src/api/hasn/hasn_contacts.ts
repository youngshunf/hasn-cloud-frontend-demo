import { requestClient } from '#/api/request';

/**
 * HasnContacts API
 */

// Types
export interface HasnContacts {
  id: number;
  owner_id: string;
  peer_id: string;
  peer_type: string;
  relation_type: string;
  trust_level: number;
  scope?: Record<string, any>;
  custom_permissions: Record<string, any>;
  nickname?: string;
  tags?: string;
  subscription: boolean;
  status: string;
  request_message?: string;
  auto_expire?: string;
  connected_at?: string;
  last_interaction_at?: string;
  interaction_count: string;
  created_time: string;
  updated_time?: string;
}

export interface HasnContactsParams {
  page?: number;
  size?: number;
  owner_id?: string;
  peer_id?: string;
  peer_type?: string;
  relation_type?: string;
  nickname?: string;
  status?: string;
}

export interface HasnContactsCreateParams {
  owner_id: string;
  peer_id: string;
  peer_type: string;
  relation_type: string;
  trust_level: number;
  scope?: Record<string, any>;
  custom_permissions: Record<string, any>;
  nickname?: string;
  tags?: string;
  subscription: boolean;
  status: string;
  request_message?: string;
  auto_expire?: string;
  connected_at?: string;
  last_interaction_at?: string;
  interaction_count: string;
}

export interface HasnContactsListResult {
  items: HasnContacts[];
  total: number;
}

// API functions
export async function getHasnContactsListApi(params: HasnContactsParams): Promise<HasnContactsListResult> {
  return requestClient.get<HasnContactsListResult>('/api/v1/hasn/hasn/contactss', { params });
}

export async function getHasnContactsApi(id: number): Promise<HasnContacts> {
  return requestClient.get<HasnContacts>(`/api/v1/hasn/hasn/contactss/${id}`);
}

export async function createHasnContactsApi(data: HasnContactsCreateParams): Promise<HasnContacts> {
  return requestClient.post<HasnContacts>('/api/v1/hasn/hasn/contactss', data);
}

export async function updateHasnContactsApi(id: number, data: Partial<HasnContactsCreateParams>): Promise<HasnContacts> {
  return requestClient.put<HasnContacts>(`/api/v1/hasn/hasn/contactss/${id}`, data);
}

export async function deleteHasnContactsApi(id: number): Promise<void> {
  return requestClient.delete<void>(`/api/v1/hasn/hasn/contactss/${id}`);
}
