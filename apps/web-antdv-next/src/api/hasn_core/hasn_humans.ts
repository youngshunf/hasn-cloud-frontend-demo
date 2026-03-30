import { requestClient } from '#/api/request';

/**
 * HASN Human 用户表 API
 */

// Types
export interface HasnHumans {
  star_id: string;
  name: string;
  huanxing_user_id?: string;
  bio: string;
  avatar_url?: string;
  phone?: string;
  phone_hash?: string;
  profile: Record<string, any>;
  privacy_rules: Record<string, any>;
  status: string;
  last_online_at?: string;
}

export interface HasnHumansParams {
  page?: number;
  size?: number;
  star_id?: string;
  name?: string;
  huanxing_user_id?: string;
  status?: string;
  last_online_at?: string;
}

export interface HasnHumansCreateParams {
  star_id: string;
  name: string;
  huanxing_user_id?: string;
  bio: string;
  avatar_url?: string;
  phone?: string;
  phone_hash?: string;
  profile: Record<string, any>;
  privacy_rules: Record<string, any>;
  status: string;
  last_online_at?: string;
}

export interface HasnHumansListResult {
  items: HasnHumans[];
  total: number;
}

// API functions
export async function getHasnHumansListApi(params: HasnHumansParams): Promise<HasnHumansListResult> {
  return requestClient.get<HasnHumansListResult>('/api/v1/hasn_core/hasn/humanss', { params });
}

export async function getHasnHumansApi(id: number): Promise<HasnHumans> {
  return requestClient.get<HasnHumans>(`/api/v1/hasn_core/hasn/humanss/${id}`);
}

export async function createHasnHumansApi(data: HasnHumansCreateParams): Promise<HasnHumans> {
  return requestClient.post<HasnHumans>('/api/v1/hasn_core/hasn/humanss', data);
}

export async function updateHasnHumansApi(id: number, data: Partial<HasnHumansCreateParams>): Promise<HasnHumans> {
  return requestClient.put<HasnHumans>(`/api/v1/hasn_core/hasn/humanss/${id}`, data);
}

export async function deleteHasnHumansApi(id: number): Promise<void> {
  return requestClient.delete<void>(`/api/v1/hasn_core/hasn/humanss/${id}`);
}
