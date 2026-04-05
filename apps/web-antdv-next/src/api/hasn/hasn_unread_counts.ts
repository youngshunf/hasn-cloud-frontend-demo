import { requestClient } from '#/api/request';

/**
 * HasnUnreadCounts API
 */

// Types
export interface HasnUnreadCounts {
  id: number;
  hasn_id: string;
  conversation_id: string;
  unread_count: string;
  last_read_msg_id: string;
  created_time: string;
  updated_time?: string;
}

export interface HasnUnreadCountsParams {
  page?: number;
  size?: number;
  hasn_id?: string;
  conversation_id?: string;
  last_read_msg_id?: string;
}

export interface HasnUnreadCountsCreateParams {
  hasn_id: string;
  conversation_id: string;
  unread_count: string;
  last_read_msg_id: string;
}

export interface HasnUnreadCountsListResult {
  items: HasnUnreadCounts[];
  total: number;
}

// API functions
export async function getHasnUnreadCountsListApi(params: HasnUnreadCountsParams): Promise<HasnUnreadCountsListResult> {
  return requestClient.get<HasnUnreadCountsListResult>('/api/v1/hasn/unread/counts', { params });
}

export async function getHasnUnreadCountsApi(id: number): Promise<HasnUnreadCounts> {
  return requestClient.get<HasnUnreadCounts>(`/api/v1/hasn/unread/counts/${id}`);
}

export async function createHasnUnreadCountsApi(data: HasnUnreadCountsCreateParams): Promise<HasnUnreadCounts> {
  return requestClient.post<HasnUnreadCounts>('/api/v1/hasn/unread/counts', data);
}

export async function updateHasnUnreadCountsApi(id: number, data: Partial<HasnUnreadCountsCreateParams>): Promise<HasnUnreadCounts> {
  return requestClient.put<HasnUnreadCounts>(`/api/v1/hasn/unread/counts/${id}`, data);
}

export async function deleteHasnUnreadCountsApi(id: number): Promise<void> {
  return requestClient.delete<void>(`/api/v1/hasn/unread/counts/${id}`);
}
