import { requestClient } from '#/api/request';

/**
 * App 安装记录表 API
 */

// Types
export interface AppInstallations {
  id: number;
  owner_id: string;
  app_id: string;
  listing_id: string;
  installed_version: string;
  granted_scopes: Record<string, any>;
  status: string;
  installed_at: string;
  last_used_at?: string;
  created_at: string;
  updated_at: string;
}

export interface AppInstallationsParams {
  page?: number;
  size?: number;
  installation_id?: string;
  owner_id?: string;
  app_id?: string;
  listing_id?: string;
  status?: string;
  installed_at?: string;
  last_used_at?: string;
  created_at?: string;
  updated_at?: string;
}

export interface AppInstallationsCreateParams {
  installation_id: string;
  owner_id: string;
  app_id: string;
  listing_id: string;
  installed_version: string;
  granted_scopes: Record<string, any>;
  status: string;
  installed_at: string;
  last_used_at?: string;
}

export interface AppInstallationsListResult {
  items: AppInstallations[];
  total: number;
}

// API functions
export async function getAppInstallationsListApi(
  params: AppInstallationsParams,
): Promise<AppInstallationsListResult> {
  return requestClient.get<AppInstallationsListResult>(
    '/api/v1/app-platform/app-installationss',
    { params },
  );
}

export async function getAppInstallationsApi(
  id: number,
): Promise<AppInstallations> {
  return requestClient.get<AppInstallations>(
    `/api/v1/app-platform/app-installationss/${id}`,
  );
}

export async function createAppInstallationsApi(
  data: any,
): Promise<AppInstallations> {
  return requestClient.post<AppInstallations>(
    '/api/v1/app-platform/app-installationss',
    data,
  );
}

export async function updateAppInstallationsApi(
  id: number,
  data: Partial<AppInstallationsCreateParams>,
): Promise<AppInstallations> {
  return requestClient.put<AppInstallations>(
    `/api/v1/app-platform/app-installationss/${id}`,
    data,
  );
}

export async function deleteAppInstallationsApi(id: number): Promise<void> {
  return requestClient.delete(`/api/v1/app-platform/app-installationss/${id}`);
}
