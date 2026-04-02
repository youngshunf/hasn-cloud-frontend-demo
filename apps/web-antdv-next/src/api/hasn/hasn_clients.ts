import { requestClient } from '#/api/request';

/**
 * HasnClients API
 */

// Types
export interface HasnClients {
  id: number;
  client_id: string;
  user_hasn_id: string;
  client_type: string;
  device_name?: string;
  device_info: Record<string, any>;
  last_seen_at?: string;
  status: string;
  created_time: string;
  updated_time?: string;
}

export interface HasnClientsParams {
  page?: number;
  size?: number;
  client_id?: string;
  user_hasn_id?: string;
  client_type?: string;
  device_name?: string;
  status?: string;
}

export interface HasnClientsCreateParams {
  client_id: string;
  user_hasn_id: string;
  client_type: string;
  device_name?: string;
  device_info: Record<string, any>;
  last_seen_at?: string;
  status: string;
}

export interface HasnClientsListResult {
  items: HasnClients[];
  total: number;
}

// API functions
export async function getHasnClientsListApi(params: HasnClientsParams): Promise<HasnClientsListResult> {
  return requestClient.get<HasnClientsListResult>('/api/v1/hasn/hasn/clients', { params });
}

export async function getHasnClientsApi(id: number): Promise<HasnClients> {
  return requestClient.get<HasnClients>(`/api/v1/hasn/hasn/clients/${id}`);
}

export async function createHasnClientsApi(data: HasnClientsCreateParams): Promise<HasnClients> {
  return requestClient.post<HasnClients>('/api/v1/hasn/hasn/clients', data);
}

export async function updateHasnClientsApi(id: number, data: Partial<HasnClientsCreateParams>): Promise<HasnClients> {
  return requestClient.put<HasnClients>(`/api/v1/hasn/hasn/clients/${id}`, data);
}

export async function deleteHasnClientsApi(id: number): Promise<void> {
  return requestClient.delete<void>(`/api/v1/hasn/hasn/clients/${id}`);
}
