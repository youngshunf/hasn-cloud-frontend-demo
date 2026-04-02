import { requestClient } from '#/api/request';

/**
 * HasnConversations API
 */

// Types
export interface HasnConversations {
  id: string;
  type: string;
  relation_type?: string;
  participant_b_id?: string;
  participant_a_type: string;
  participant_b_type?: string;
  trade_session_id?: string;
  group_name?: string;
  group_description?: string;
  group_avatar_url?: string;
  group_owner_id?: string;
  agent_policy: string;
  join_policy: string;
  max_members: string;
  allow_invite: boolean;
  mute_all: boolean;
  member_count: string;
  last_message_at?: string;
  last_message_preview?: string;
  last_message_from?: string;
  message_count: string;
  status: string;
  created_time: string;
  updated_time?: string;
}

export interface HasnConversationsParams {
  page?: number;
  size?: number;
  id?: string;
  type?: string;
  relation_type?: string;
  participant_b_id?: string;
  participant_a_type?: string;
  participant_b_type?: string;
  trade_session_id?: string;
  group_name?: string;
  group_owner_id?: string;
  status?: string;
}

export interface HasnConversationsCreateParams {
  id: string;
  type: string;
  relation_type?: string;
  participant_b_id?: string;
  participant_a_type: string;
  participant_b_type?: string;
  trade_session_id?: string;
  group_name?: string;
  group_description?: string;
  group_avatar_url?: string;
  group_owner_id?: string;
  agent_policy: string;
  join_policy: string;
  max_members: string;
  allow_invite: boolean;
  mute_all: boolean;
  member_count: string;
  last_message_at?: string;
  last_message_preview?: string;
  last_message_from?: string;
  message_count: string;
  status: string;
}

export interface HasnConversationsListResult {
  items: HasnConversations[];
  total: number;
}

// API functions
export async function getHasnConversationsListApi(params: HasnConversationsParams): Promise<HasnConversationsListResult> {
  return requestClient.get<HasnConversationsListResult>('/api/v1/hasn/hasn/conversations', { params });
}

export async function getHasnConversationsApi(id: number): Promise<HasnConversations> {
  return requestClient.get<HasnConversations>(`/api/v1/hasn/hasn/conversations/${id}`);
}

export async function createHasnConversationsApi(data: HasnConversationsCreateParams): Promise<HasnConversations> {
  return requestClient.post<HasnConversations>('/api/v1/hasn/hasn/conversations', data);
}

export async function updateHasnConversationsApi(id: number, data: Partial<HasnConversationsCreateParams>): Promise<HasnConversations> {
  return requestClient.put<HasnConversations>(`/api/v1/hasn/hasn/conversations/${id}`, data);
}

export async function deleteHasnConversationsApi(id: number): Promise<void> {
  return requestClient.delete<void>(`/api/v1/hasn/hasn/conversations/${id}`);
}
