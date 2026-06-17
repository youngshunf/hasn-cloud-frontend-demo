import { requestClient } from '#/api/request';

/**
 * App 清单表 API
 */

// Types
export interface AppManifests {
  id: number;
  developer_id: string;
  namespace: string;
  name: string;
  display_name: string;
  description: string;
  icon_url?: string;
  current_version: string;
  backend_runtime_mode: string;
  frontend_hosting_mode: string;
  requested_scopes: Record<string, any>;
  category?: string;
  tags?: Record<string, any>;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface AppManifestsParams {
  page?: number;
  size?: number;
  app_id?: string;
  developer_id?: string;
  namespace?: string;
  name?: string;
  display_name?: string;
  category?: string;
  status?: string;
  created_at?: string;
  updated_at?: string;
}

export interface AppManifestsCreateParams {
  app_id: string;
  developer_id: string;
  namespace: string;
  name: string;
  display_name: string;
  description: string;
  icon_url?: string;
  current_version: string;
  backend_runtime_mode: string;
  frontend_hosting_mode: string;
  requested_scopes: Record<string, any>;
  category?: string;
  tags?: Record<string, any>;
  status: string;
}

export interface AppManifestsListResult {
  items: AppManifests[];
  total: number;
}

// API functions
export async function getAppManifestsListApi(
  params: AppManifestsParams,
): Promise<AppManifestsListResult> {
  return requestClient.get<AppManifestsListResult>(
    '/api/v1/app-platform/app-manifestss',
    { params },
  );
}

export async function getAppManifestsApi(id: number): Promise<AppManifests> {
  return requestClient.get<AppManifests>(
    `/api/v1/app-platform/app-manifestss/${id}`,
  );
}

export async function createAppManifestsApi(data: any): Promise<AppManifests> {
  return requestClient.post<AppManifests>(
    '/api/v1/app-platform/app-manifestss',
    data,
  );
}

export async function updateAppManifestsApi(
  id: number,
  data: Partial<AppManifestsCreateParams>,
): Promise<AppManifests> {
  return requestClient.put<AppManifests>(
    `/api/v1/app-platform/app-manifestss/${id}`,
    data,
  );
}

export async function deleteAppManifestsApi(id: number): Promise<void> {
  return requestClient.delete(`/api/v1/app-platform/app-manifestss/${id}`);
}
