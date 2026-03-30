import { requestClient } from '#/api/request';

/**
 * HASN 消息表 API
 */

// Types
export interface HasnMessages {
  conversation_id: string;
  from_id: string;
  from_type: number;
  to_id: string;
  to_type: number;
  content_type: number;
  content: Record<string, any>;
  msg_type: string;
  status: number;
  priority: string;
  reply_to_id?: number;
  local_id?: string;
  context?: Record<string, any>;
  recalled_at?: string;
  recalled_by?: string;
  edited_at?: string;
  edit_version: number;
  server_received_at: string;
}

export interface HasnMessagesParams {
  page?: number;
  size?: number;
  conversation_id?: string;
  from_id?: string;
  from_type?: number;
  to_id?: string;
  to_type?: number;
  content_type?: number;
  msg_type?: string;
  status?: number;
  reply_to_id?: number;
  local_id?: string;
  recalled_at?: string;
  edited_at?: string;
  server_received_at?: string;
}

export interface HasnMessagesCreateParams {
  conversation_id: string;
  from_id: string;
  from_type: number;
  to_id: string;
  to_type: number;
  content_type: number;
  content: Record<string, any>;
  msg_type: string;
  status: number;
  priority: string;
  reply_to_id?: number;
  local_id?: string;
  context?: Record<string, any>;
  recalled_at?: string;
  recalled_by?: string;
  edited_at?: string;
  edit_version: number;
  server_received_at: string;
}

export interface HasnMessagesListResult {
  items: HasnMessages[];
  total: number;
}

// API functions
export async function getHasnMessagesListApi(params: HasnMessagesParams): Promise<HasnMessagesListResult> {
  return requestClient.get<HasnMessagesListResult>('/api/v1/hasn_core/hasn/messagess', { params });
}

export async function getHasnMessagesApi(id: number): Promise<HasnMessages> {
  return requestClient.get<HasnMessages>(`/api/v1/hasn_core/hasn/messagess/${id}`);
}

export async function createHasnMessagesApi(data: HasnMessagesCreateParams): Promise<HasnMessages> {
  return requestClient.post<HasnMessages>('/api/v1/hasn_core/hasn/messagess', data);
}

export async function updateHasnMessagesApi(id: number, data: Partial<HasnMessagesCreateParams>): Promise<HasnMessages> {
  return requestClient.put<HasnMessages>(`/api/v1/hasn_core/hasn/messagess/${id}`, data);
}

export async function deleteHasnMessagesApi(id: number): Promise<void> {
  return requestClient.delete<void>(`/api/v1/hasn_core/hasn/messagess/${id}`);
}
