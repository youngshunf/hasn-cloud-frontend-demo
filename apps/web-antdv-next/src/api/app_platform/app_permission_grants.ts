import { requestClient } from '#/api/request';

/**
 * 权限授予记录表 API
 */

// Types
export interface AppPermissionGrants {
  id: number;
  installation_id: string;
  scope: string;
  granted_by: string;
  granted_at: string;
  grant_source: string;
  status: string;
  revoked_at?: string;
  revoked_by?: string;
  revocation_reason?: string;
  last_used_at?: string;
  usage_count: number;
  created_at: string;
  updated_at: string;
}

export interface AppPermissionGrantsParams {
  page?: number;
  size?: number;
  grant_id?: string;
  installation_id?: string;
  granted_at?: string;
  status?: string;
  revoked_at?: string;
  last_used_at?: string;
  created_at?: string;
  updated_at?: string;
}

export interface AppPermissionGrantsCreateParams {
  grant_id: string;
  installation_id: string;
  scope: string;
  granted_by: string;
  granted_at: string;
  grant_source: string;
  status: string;
  revoked_at?: string;
  revoked_by?: string;
  revocation_reason?: string;
  last_used_at?: string;
  usage_count: number;
}

export interface AppPermissionGrantsListResult {
  items: AppPermissionGrants[];
  total: number;
}

// API functions
export async function getAppPermissionGrantsListApi(
  params: AppPermissionGrantsParams,
): Promise<AppPermissionGrantsListResult> {
  return requestClient.get<AppPermissionGrantsListResult>(
    '/api/v1/app-platform/app-permission-grantss',
    { params },
  );
}

export async function getAppPermissionGrantsApi(
  id: number,
): Promise<AppPermissionGrants> {
  return requestClient.get<AppPermissionGrants>(
    `/api/v1/app-platform/app-permission-grantss/${id}`,
  );
}

export async function createAppPermissionGrantsApi(
  data: any,
): Promise<AppPermissionGrants> {
  return requestClient.post<AppPermissionGrants>(
    '/api/v1/app-platform/app-permission-grantss',
    data,
  );
}

export async function updateAppPermissionGrantsApi(
  id: number,
  data: Partial<AppPermissionGrantsCreateParams>,
): Promise<AppPermissionGrants> {
  return requestClient.put<AppPermissionGrants>(
    `/api/v1/app-platform/app-permission-grantss/${id}`,
    data,
  );
}

export async function deleteAppPermissionGrantsApi(id: number): Promise<void> {
  return requestClient.delete(
    `/api/v1/app-platform/app-permission-grantss/${id}`,
  );
}
