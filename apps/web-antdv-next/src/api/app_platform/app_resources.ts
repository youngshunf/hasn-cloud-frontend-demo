import { requestClient } from '#/api/request';

/**
 * App Resource 定义表 API
 */

// Types
export interface AppResources {
  id: number;
  app_id: string;
  version_id: string;
  resource_name: string;
  display_name: string;
  description: string;
  schema_json: Record<string, any>;
  storage_strategy: string;
  created_at: string;
  updated_at: string;
}

export interface AppResourcesParams {
  page?: number;
  size?: number;
  resource_id?: string;
  app_id?: string;
  version_id?: string;
  resource_name?: string;
  display_name?: string;
  created_at?: string;
  updated_at?: string;
}

export interface AppResourcesCreateParams {
  resource_id: string;
  app_id: string;
  version_id: string;
  resource_name: string;
  display_name: string;
  description: string;
  schema_json: Record<string, any>;
  storage_strategy: string;
}

export interface AppResourcesListResult {
  items: AppResources[];
  total: number;
}

// API functions
export async function getAppResourcesListApi(
  params: AppResourcesParams,
): Promise<AppResourcesListResult> {
  return requestClient.get<AppResourcesListResult>(
    '/api/v1/app-platform/app-resourcess',
    { params },
  );
}

export async function getAppResourcesApi(id: number): Promise<AppResources> {
  return requestClient.get<AppResources>(
    `/api/v1/app-platform/app-resourcess/${id}`,
  );
}

export async function createAppResourcesApi(data: any): Promise<AppResources> {
  return requestClient.post<AppResources>(
    '/api/v1/app-platform/app-resourcess',
    data,
  );
}

export async function updateAppResourcesApi(
  id: number,
  data: Partial<AppResourcesCreateParams>,
): Promise<AppResources> {
  return requestClient.put<AppResources>(
    `/api/v1/app-platform/app-resourcess/${id}`,
    data,
  );
}

export async function deleteAppResourcesApi(id: number): Promise<void> {
  return requestClient.delete(`/api/v1/app-platform/app-resourcess/${id}`);
}
