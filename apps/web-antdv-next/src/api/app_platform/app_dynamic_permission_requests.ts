import { requestClient } from '#/api/request';

/**
 * 动态权限请求表 API
 */

// Types
export interface AppDynamicPermissionRequests {
  id: number;
  installation_id: string;
  scope: string;
  requested_at: string;
  request_reason: string;
  request_context?: Record<string, any>;
  status: string;
  decided_at?: string;
  decided_by?: string;
  decision_reason?: string;
  expires_at: string;
  created_at: string;
  updated_at: string;
}

export interface AppDynamicPermissionRequestsParams {
  page?: number;
  size?: number;
  request_id?: string;
  installation_id?: string;
  requested_at?: string;
  status?: string;
  decided_at?: string;
  decided_by?: string;
  expires_at?: string;
  created_at?: string;
  updated_at?: string;
}

export interface AppDynamicPermissionRequestsCreateParams {
  request_id: string;
  installation_id: string;
  scope: string;
  requested_at: string;
  request_reason: string;
  request_context?: Record<string, any>;
  status: string;
  decided_at?: string;
  decided_by?: string;
  decision_reason?: string;
  expires_at: string;
}

export interface AppDynamicPermissionRequestsListResult {
  items: AppDynamicPermissionRequests[];
  total: number;
}

// API functions
export async function getAppDynamicPermissionRequestsListApi(
  params: AppDynamicPermissionRequestsParams,
): Promise<AppDynamicPermissionRequestsListResult> {
  return requestClient.get<AppDynamicPermissionRequestsListResult>(
    '/api/v1/app-platform/app-dynamic-permission-requestss',
    { params },
  );
}

export async function getAppDynamicPermissionRequestsApi(
  id: number,
): Promise<AppDynamicPermissionRequests> {
  return requestClient.get<AppDynamicPermissionRequests>(
    `/api/v1/app-platform/app-dynamic-permission-requestss/${id}`,
  );
}

export async function createAppDynamicPermissionRequestsApi(
  data: any,
): Promise<AppDynamicPermissionRequests> {
  return requestClient.post<AppDynamicPermissionRequests>(
    '/api/v1/app-platform/app-dynamic-permission-requestss',
    data,
  );
}

export async function updateAppDynamicPermissionRequestsApi(
  id: number,
  data: Partial<AppDynamicPermissionRequestsCreateParams>,
): Promise<AppDynamicPermissionRequests> {
  return requestClient.put<AppDynamicPermissionRequests>(
    `/api/v1/app-platform/app-dynamic-permission-requestss/${id}`,
    data,
  );
}

export async function deleteAppDynamicPermissionRequestsApi(
  id: number,
): Promise<void> {
  return requestClient.delete(
    `/api/v1/app-platform/app-dynamic-permission-requestss/${id}`,
  );
}
