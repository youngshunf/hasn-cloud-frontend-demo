import { requestClient } from '#/api/request';

/**
 * Lead automation PII and compliance audit log API
 */

// Types
export interface LeadAuditLog {
  id: number;
  event_type: string;
  actor_user_id?: number;
  actor_role?: string;
  actor_ip?: string;
  actor_ua?: string;
  target_table?: string;
  target_count: number;
  target_ref?: string;
  payload: Record<string, any>;
  result: string;
  error_message?: string;
}

export interface LeadAuditLogParams {
  page?: number;
  size?: number;
  event_type?: string;
  actor_user_id?: number;
}

export interface LeadAuditLogCreateParams {
  event_type: string;
  actor_user_id?: number;
  actor_role?: string;
  actor_ip?: string;
  actor_ua?: string;
  target_table?: string;
  target_count: number;
  target_ref?: string;
  payload: Record<string, any>;
  result: string;
  error_message?: string;
}

export interface LeadAuditLogListResult {
  items: LeadAuditLog[];
  total: number;
}

// API functions
export async function getLeadAuditLogListApi(
  params: LeadAuditLogParams,
): Promise<LeadAuditLogListResult> {
  return requestClient.get<LeadAuditLogListResult>(
    '/api/v1/growth/lead/audit/logs',
    { params },
  );
}

export async function getLeadAuditLogApi(id: number): Promise<LeadAuditLog> {
  return requestClient.get<LeadAuditLog>(
    `/api/v1/growth/lead/audit/logs/${id}`,
  );
}

export async function createLeadAuditLogApi(data: any): Promise<LeadAuditLog> {
  return requestClient.post<LeadAuditLog>(
    '/api/v1/growth/lead/audit/logs',
    data,
  );
}

export async function updateLeadAuditLogApi(
  id: number,
  data: Partial<LeadAuditLogCreateParams>,
): Promise<LeadAuditLog> {
  return requestClient.put<LeadAuditLog>(
    `/api/v1/growth/lead/audit/logs/${id}`,
    data,
  );
}

export async function deleteLeadAuditLogApi(id: number): Promise<void> {
  return requestClient.delete<void>(`/api/v1/growth/lead/audit/logs/${id}`);
}
