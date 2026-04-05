import { requestClient } from '#/api/request';

/**
 * HasnGroupMembers API
 */

// Types
export interface HasnGroupMembers {
  id: number;
  conversation_id: string;
  member_id: string;
  member_type: string;
  member_star_id: string;
  member_name: string;
  role: string;
  muted: boolean;
  joined_at?: string;
  invited_by?: string;
  created_time: string;
  updated_time?: string;
}

export interface HasnGroupMembersParams {
  page?: number;
  size?: number;
  conversation_id?: string;
  member_id?: string;
  member_type?: string;
  member_star_id?: string;
  member_name?: string;
}

export interface HasnGroupMembersCreateParams {
  conversation_id: string;
  member_id: string;
  member_type: string;
  member_star_id: string;
  member_name: string;
  role: string;
  muted: boolean;
  joined_at?: string;
  invited_by?: string;
}

export interface HasnGroupMembersListResult {
  items: HasnGroupMembers[];
  total: number;
}

// API functions
export async function getHasnGroupMembersListApi(params: HasnGroupMembersParams): Promise<HasnGroupMembersListResult> {
  return requestClient.get<HasnGroupMembersListResult>('/api/v1/hasn/group/members', { params });
}

export async function getHasnGroupMembersApi(id: number): Promise<HasnGroupMembers> {
  return requestClient.get<HasnGroupMembers>(`/api/v1/hasn/group/members/${id}`);
}

export async function createHasnGroupMembersApi(data: HasnGroupMembersCreateParams): Promise<HasnGroupMembers> {
  return requestClient.post<HasnGroupMembers>('/api/v1/hasn/group/members', data);
}

export async function updateHasnGroupMembersApi(id: number, data: Partial<HasnGroupMembersCreateParams>): Promise<HasnGroupMembers> {
  return requestClient.put<HasnGroupMembers>(`/api/v1/hasn/group/members/${id}`, data);
}

export async function deleteHasnGroupMembersApi(id: number): Promise<void> {
  return requestClient.delete<void>(`/api/v1/hasn/group/members/${id}`);
}
