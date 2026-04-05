import { requestClient } from '#/api/request';

/**
 * HasnAuditLog API
 */

// Types
export interface HasnAuditLog {
  id: number;
  actor_id: string;
  actor_type: string;
  action: string;
  target_type?: string;
  target_id?: string;
  details: Record<string, any>;
  ip_address?: string;
  created_time: string;
  updated_time?: string;
}

export interface HasnAuditLogParams {
  page?: number;
  size?: number;
  actor_id?: string;
  actor_type?: string;
  target_type?: string;
  target_id?: string;
}

export interface HasnAuditLogCreateParams {
  actor_id: string;
  actor_type: string;
  action: string;
  target_type?: string;
  target_id?: string;
  details: Record<string, any>;
  ip_address?: string;
}

export interface HasnAuditLogListResult {
  items: HasnAuditLog[];
  total: number;
}

// API functions
export async function getHasnAuditLogListApi(params: HasnAuditLogParams): Promise<HasnAuditLogListResult> {
  return requestClient.get<HasnAuditLogListResult>('/api/v1/hasn/audit/logs', { params });
}

export async function getHasnAuditLogApi(id: number): Promise<HasnAuditLog> {
  return requestClient.get<HasnAuditLog>(`/api/v1/hasn/audit/logs/${id}`);
}

export async function createHasnAuditLogApi(data: HasnAuditLogCreateParams): Promise<HasnAuditLog> {
  return requestClient.post<HasnAuditLog>('/api/v1/hasn/audit/logs', data);
}

export async function updateHasnAuditLogApi(id: number, data: Partial<HasnAuditLogCreateParams>): Promise<HasnAuditLog> {
  return requestClient.put<HasnAuditLog>(`/api/v1/hasn/audit/logs/${id}`, data);
}

export async function deleteHasnAuditLogApi(id: number): Promise<void> {
  return requestClient.delete<void>(`/api/v1/hasn/audit/logs/${id}`);
}
