import { requestClient } from '#/api/request';

/**
 * 平台权限定义表（hasn.* namespace） API
 */

// Types
export interface PlatformScopes {
  id: number;
  display_name: string;
  description: string;
  reason?: string;
  category: string;
  risk_level: string;
  requires_owner_confirmation?: boolean;
  rate_limit_per_minute?: number;
  rate_limit_per_hour?: number;
  rate_limit_per_day?: number;
  created_at: string;
  updated_at: string;
}

export interface PlatformScopesParams {
  page?: number;
  size?: number;
  display_name?: string;
  category?: string;
  created_at?: string;
  updated_at?: string;
}

export interface PlatformScopesCreateParams {
  scope: string;
  display_name: string;
  description: string;
  reason?: string;
  category: string;
  risk_level: string;
  requires_owner_confirmation?: boolean;
  rate_limit_per_minute?: number;
  rate_limit_per_hour?: number;
  rate_limit_per_day?: number;
}

export interface PlatformScopesListResult {
  items: PlatformScopes[];
  total: number;
}

// API functions
export async function getPlatformScopesListApi(
  params: PlatformScopesParams,
): Promise<PlatformScopesListResult> {
  return requestClient.get<PlatformScopesListResult>(
    '/api/v1/app-platform/platform-scopess',
    { params },
  );
}

export async function getPlatformScopesApi(
  id: number,
): Promise<PlatformScopes> {
  return requestClient.get<PlatformScopes>(
    `/api/v1/app-platform/platform-scopess/${id}`,
  );
}

export async function createPlatformScopesApi(
  data: any,
): Promise<PlatformScopes> {
  return requestClient.post<PlatformScopes>(
    '/api/v1/app-platform/platform-scopess',
    data,
  );
}

export async function updatePlatformScopesApi(
  id: number,
  data: Partial<PlatformScopesCreateParams>,
): Promise<PlatformScopes> {
  return requestClient.put<PlatformScopes>(
    `/api/v1/app-platform/platform-scopess/${id}`,
    data,
  );
}

export async function deletePlatformScopesApi(id: number): Promise<void> {
  return requestClient.delete(`/api/v1/app-platform/platform-scopess/${id}`);
}
