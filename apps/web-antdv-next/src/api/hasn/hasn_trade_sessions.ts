import { requestClient } from '#/api/request';

/**
 * HasnTradeSessions API
 */

// Types
export interface HasnTradeSessions {
  id: string;
  buyer_id: string;
  seller_id: string;
  relation_type: string;
  scope: string;
  status: string;
  order_id?: string;
  expires_at?: string;
  metadata: Record<string, any>;
  created_time: string;
  updated_time?: string;
}

export interface HasnTradeSessionsParams {
  page?: number;
  size?: number;
  id?: string;
  buyer_id?: string;
  seller_id?: string;
  relation_type?: string;
  status?: string;
  order_id?: string;
}

export interface HasnTradeSessionsCreateParams {
  id: string;
  buyer_id: string;
  seller_id: string;
  relation_type: string;
  scope: string;
  status: string;
  order_id?: string;
  expires_at?: string;
  metadata: Record<string, any>;
}

export interface HasnTradeSessionsListResult {
  items: HasnTradeSessions[];
  total: number;
}

// API functions
export async function getHasnTradeSessionsListApi(params: HasnTradeSessionsParams): Promise<HasnTradeSessionsListResult> {
  return requestClient.get<HasnTradeSessionsListResult>('/api/v1/hasn/hasn/trade/sessions', { params });
}

export async function getHasnTradeSessionsApi(id: number): Promise<HasnTradeSessions> {
  return requestClient.get<HasnTradeSessions>(`/api/v1/hasn/hasn/trade/sessions/${id}`);
}

export async function createHasnTradeSessionsApi(data: HasnTradeSessionsCreateParams): Promise<HasnTradeSessions> {
  return requestClient.post<HasnTradeSessions>('/api/v1/hasn/hasn/trade/sessions', data);
}

export async function updateHasnTradeSessionsApi(id: number, data: Partial<HasnTradeSessionsCreateParams>): Promise<HasnTradeSessions> {
  return requestClient.put<HasnTradeSessions>(`/api/v1/hasn/hasn/trade/sessions/${id}`, data);
}

export async function deleteHasnTradeSessionsApi(id: number): Promise<void> {
  return requestClient.delete<void>(`/api/v1/hasn/hasn/trade/sessions/${id}`);
}
