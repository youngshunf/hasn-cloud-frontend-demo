import { requestClient } from '#/api/request';

/**
 * App Tool 定义表 API
 */

// Types
export interface AppTools {
  id: number;
  app_id: string;
  version_id: string;
  tool_name: string;
  display_name: string;
  description: string;
  input_schema: Record<string, any>;
  output_schema: Record<string, any>;
  visibility: string;
  risk_level: string;
  required_scopes: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface AppToolsParams {
  page?: number;
  size?: number;
  tool_id?: string;
  app_id?: string;
  version_id?: string;
  tool_name?: string;
  display_name?: string;
  created_at?: string;
  updated_at?: string;
}

export interface AppToolsCreateParams {
  tool_id: string;
  app_id: string;
  version_id: string;
  tool_name: string;
  display_name: string;
  description: string;
  input_schema: Record<string, any>;
  output_schema: Record<string, any>;
  visibility: string;
  risk_level: string;
  required_scopes: Record<string, any>;
}

export interface AppToolsListResult {
  items: AppTools[];
  total: number;
}

// API functions
export async function getAppToolsListApi(
  params: AppToolsParams,
): Promise<AppToolsListResult> {
  return requestClient.get<AppToolsListResult>(
    '/api/v1/app-platform/app-toolss',
    { params },
  );
}

export async function getAppToolsApi(id: number): Promise<AppTools> {
  return requestClient.get<AppTools>(`/api/v1/app-platform/app-toolss/${id}`);
}

export async function createAppToolsApi(data: any): Promise<AppTools> {
  return requestClient.post<AppTools>('/api/v1/app-platform/app-toolss', data);
}

export async function updateAppToolsApi(
  id: number,
  data: Partial<AppToolsCreateParams>,
): Promise<AppTools> {
  return requestClient.put<AppTools>(
    `/api/v1/app-platform/app-toolss/${id}`,
    data,
  );
}

export async function deleteAppToolsApi(id: number): Promise<void> {
  return requestClient.delete(`/api/v1/app-platform/app-toolss/${id}`);
}
