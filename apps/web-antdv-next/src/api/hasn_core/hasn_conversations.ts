import { requestClient } from '#/api/request';

/**
 * HASN 对话/会话表 API
 */

// Types
export interface HasnConversations {
  type: string;
  participant_a?: string;
  participant_b?: string;
  name?: string;
  group_star_id?: string;
  group_avatar?: string;
  group_description?: string;
  agent_policy: string;
  max_members: number;
  creator_id?: string;
  last_message_at?: string;
  last_message_preview?: string;
  message_count: number;
  status: string;
}

export interface HasnConversationsParams {
  page?: number;
  size?: number;
  type?: string;
  name?: string;
  group_star_id?: string;
  creator_id?: string;
  last_message_at?: string;
  status?: string;
}

export interface HasnConversationsCreateParams {
  type: string;
  participant_a?: string;
  participant_b?: string;
  name?: string;
  group_star_id?: string;
  group_avatar?: string;
  group_description?: string;
  agent_policy: string;
  max_members: number;
  creator_id?: string;
  last_message_at?: string;
  last_message_preview?: string;
  message_count: number;
  status: string;
}

export interface HasnConversationsListResult {
  items: HasnConversations[];
  total: number;
}

// API functions
export async function getHasnConversationsListApi(params: HasnConversationsParams): Promise<HasnConversationsListResult> {
  return requestClient.get<HasnConversationsListResult>('/api/v1/hasn_core/hasn/conversationss', { params });
}

export async function getHasnConversationsApi(id: number): Promise<HasnConversations> {
  return requestClient.get<HasnConversations>(`/api/v1/hasn_core/hasn/conversationss/${id}`);
}

export async function createHasnConversationsApi(data: HasnConversationsCreateParams): Promise<HasnConversations> {
  return requestClient.post<HasnConversations>('/api/v1/hasn_core/hasn/conversationss', data);
}

export async function updateHasnConversationsApi(id: number, data: Partial<HasnConversationsCreateParams>): Promise<HasnConversations> {
  return requestClient.put<HasnConversations>(`/api/v1/hasn_core/hasn/conversationss/${id}`, data);
}

export async function deleteHasnConversationsApi(id: number): Promise<void> {
  return requestClient.delete<void>(`/api/v1/hasn_core/hasn/conversationss/${id}`);
}
