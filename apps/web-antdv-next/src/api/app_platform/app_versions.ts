import { requestClient } from '#/api/request';

/**
 * App 版本表 API
 */

// Types
export interface AppVersions {
  id: number;
  app_id: string;
  version: string;
  changelog?: string;
  manifest_snapshot: Record<string, any>;
  status: string;
  published_at?: string;
  created_at: string;
  updated_at: string;
}

export interface AppVersionsParams {
  page?: number;
  size?: number;
  version_id?: string;
  app_id?: string;
  status?: string;
  published_at?: string;
  created_at?: string;
  updated_at?: string;
}

export interface AppVersionsCreateParams {
  version_id: string;
  app_id: string;
  version: string;
  changelog?: string;
  manifest_snapshot: Record<string, any>;
  status: string;
  published_at?: string;
}

export interface AppVersionsListResult {
  items: AppVersions[];
  total: number;
}

// API functions
export async function getAppVersionsListApi(
  params: AppVersionsParams,
): Promise<AppVersionsListResult> {
  return requestClient.get<AppVersionsListResult>(
    '/api/v1/app-platform/app-versionss',
    { params },
  );
}

export async function getAppVersionsApi(id: number): Promise<AppVersions> {
  return requestClient.get<AppVersions>(
    `/api/v1/app-platform/app-versionss/${id}`,
  );
}

export async function createAppVersionsApi(data: any): Promise<AppVersions> {
  return requestClient.post<AppVersions>(
    '/api/v1/app-platform/app-versionss',
    data,
  );
}

export async function updateAppVersionsApi(
  id: number,
  data: Partial<AppVersionsCreateParams>,
): Promise<AppVersions> {
  return requestClient.put<AppVersions>(
    `/api/v1/app-platform/app-versionss/${id}`,
    data,
  );
}

export async function deleteAppVersionsApi(id: number): Promise<void> {
  return requestClient.delete(`/api/v1/app-platform/app-versionss/${id}`);
}
