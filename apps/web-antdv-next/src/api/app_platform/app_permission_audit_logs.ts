import { requestClient } from '#/api/request';

/**
 * 权限审计日志表 API
 */

// Types
export interface AppPermissionAuditLogs {
  id: number;
  owner_id: string;
  installation_id: string;
  app_id: string;
  agent_id?: string;
  action: string;
  scope: string;
  resource_type?: string;
  resource_id?: string;
  result: string;
  error_message?: string;
  details?: Record<string, any>;
  request_id?: string;
  user_agent?: string;
  ip_address?: string;
  created_at: string;
}

export interface AppPermissionAuditLogsParams {
  page?: number;
  size?: number;
  owner_id?: string;
  installation_id?: string;
  app_id?: string;
  agent_id?: string;
  resource_type?: string;
  resource_id?: string;
  request_id?: string;
  created_at?: string;
}

export interface AppPermissionAuditLogsCreateParams {
  owner_id: string;
  installation_id: string;
  app_id: string;
  agent_id?: string;
  action: string;
  scope: string;
  resource_type?: string;
  resource_id?: string;
  result: string;
  error_message?: string;
  details?: Record<string, any>;
  request_id?: string;
  user_agent?: string;
  ip_address?: string;
}

export interface AppPermissionAuditLogsListResult {
  items: AppPermissionAuditLogs[];
  total: number;
}

// API functions
export async function getAppPermissionAuditLogsListApi(
  params: AppPermissionAuditLogsParams,
): Promise<AppPermissionAuditLogsListResult> {
  return requestClient.get<AppPermissionAuditLogsListResult>(
    '/api/v1/app-platform/app-permission-audit-logss',
    { params },
  );
}

export async function getAppPermissionAuditLogsApi(
  id: number,
): Promise<AppPermissionAuditLogs> {
  return requestClient.get<AppPermissionAuditLogs>(
    `/api/v1/app-platform/app-permission-audit-logss/${id}`,
  );
}

export async function createAppPermissionAuditLogsApi(
  data: any,
): Promise<AppPermissionAuditLogs> {
  return requestClient.post<AppPermissionAuditLogs>(
    '/api/v1/app-platform/app-permission-audit-logss',
    data,
  );
}

export async function updateAppPermissionAuditLogsApi(
  id: number,
  data: Partial<AppPermissionAuditLogsCreateParams>,
): Promise<AppPermissionAuditLogs> {
  return requestClient.put<AppPermissionAuditLogs>(
    `/api/v1/app-platform/app-permission-audit-logss/${id}`,
    data,
  );
}

export async function deleteAppPermissionAuditLogsApi(
  id: number,
): Promise<void> {
  return requestClient.delete(
    `/api/v1/app-platform/app-permission-audit-logss/${id}`,
  );
}
