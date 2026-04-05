import { requestClient } from '#/api/request';

/**
 * HasnHumans API
 */

// Types
export interface HasnHumans {
  id: number;
  hasn_id: string;
  star_id: string;
  user_id: string;
  name: string;
  bio?: string;
  avatar_url?: string;
  status: string;
  contact_policy: Record<string, any>;
  timezone?: string;
  tags?: string;
  stats: Record<string, any>;
  created_time: string;
  updated_time?: string;
}

export interface HasnHumansParams {
  page?: number;
  size?: number;
  hasn_id?: string;
  star_id?: string;
  user_id?: string;
  name?: string;
  status?: string;
}

export interface HasnHumansCreateParams {
  hasn_id: string;
  star_id: string;
  user_id: string;
  name: string;
  bio?: string;
  avatar_url?: string;
  status: string;
  contact_policy: Record<string, any>;
  timezone?: string;
  tags?: string;
  stats: Record<string, any>;
}

export interface HasnHumansListResult {
  items: HasnHumans[];
  total: number;
}

// API functions
export async function getHasnHumansListApi(params: HasnHumansParams): Promise<HasnHumansListResult> {
  return requestClient.get<HasnHumansListResult>('/api/v1/hasn/humans', { params });
}

export async function getHasnHumansApi(id: number): Promise<HasnHumans> {
  return requestClient.get<HasnHumans>(`/api/v1/hasn/humans/${id}`);
}

export async function createHasnHumansApi(data: HasnHumansCreateParams): Promise<HasnHumans> {
  return requestClient.post<HasnHumans>('/api/v1/hasn/humans', data);
}

export async function updateHasnHumansApi(id: number, data: Partial<HasnHumansCreateParams>): Promise<HasnHumans> {
  return requestClient.put<HasnHumans>(`/api/v1/hasn/humans/${id}`, data);
}

export async function deleteHasnHumansApi(id: number): Promise<void> {
  return requestClient.delete<void>(`/api/v1/hasn/humans/${id}`);
}
