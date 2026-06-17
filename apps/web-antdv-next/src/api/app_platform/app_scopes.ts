import { requestClient } from '#/api/request';

/**
 * 应用权限定义表（{domain}.* namespace） API
 */

// Types
export interface AppScopes {
  id: number;
  app_id: string;
  scope: string;
  display_name: string;
  description: string;
  reason?: string;
  risk_level: string;
  requires_owner_confirmation?: boolean;
  rate_limit_per_minute?: number;
  rate_limit_per_hour?: number;
  rate_limit_per_day?: number;
  created_at: string;
  updated_at: string;
}

export interface AppScopesParams {
  page?: number;
  size?: number;
  app_id?: string;
  display_name?: string;
  created_at?: string;
  updated_at?: string;
}

export interface AppScopesCreateParams {
  app_id: string;
  scope: string;
  display_name: string;
  description: string;
  reason?: string;
  risk_level: string;
  requires_owner_confirmation?: boolean;
  rate_limit_per_minute?: number;
  rate_limit_per_hour?: number;
  rate_limit_per_day?: number;
}

export interface AppScopesListResult {
  items: AppScopes[];
  total: number;
}

// API functions
export async function getAppScopesListApi(
  params: AppScopesParams,
): Promise<AppScopesListResult> {
  return requestClient.get<AppScopesListResult>(
    '/api/v1/app-platform/app-scopess',
    { params },
  );
}

export async function getAppScopesApi(id: number): Promise<AppScopes> {
  return requestClient.get<AppScopes>(`/api/v1/app-platform/app-scopess/${id}`);
}

export async function createAppScopesApi(data: any): Promise<AppScopes> {
  return requestClient.post<AppScopes>(
    '/api/v1/app-platform/app-scopess',
    data,
  );
}

export async function updateAppScopesApi(
  id: number,
  data: Partial<AppScopesCreateParams>,
): Promise<AppScopes> {
  return requestClient.put<AppScopes>(
    `/api/v1/app-platform/app-scopess/${id}`,
    data,
  );
}

export async function deleteAppScopesApi(id: number): Promise<void> {
  return requestClient.delete(`/api/v1/app-platform/app-scopess/${id}`);
}
