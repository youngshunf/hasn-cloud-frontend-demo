import { requestClient } from '#/api/request';

/**
 * 应用数据记录表（JSONB 存储） API
 */

// Types
export interface AppDataRecords {
  id: number;
  owner_id: string;
  app_id: string;
  installation_id: string;
  install_target_type?: string;
  install_target_id?: string;
  resource_id: string;
  record_key: string;
  data_json: Record<string, any>;
  created_at: string;
  updated_at: string;
  created_by?: string;
  updated_by?: string;
  version: number;
}

export interface AppDataRecordsParams {
  page?: number;
  size?: number;
  owner_id?: string;
  app_id?: string;
  installation_id?: string;
  install_target_type?: string;
  install_target_id?: string;
  resource_id?: string;
  created_at?: string;
  updated_at?: string;
}

export interface AppDataRecordsCreateParams {
  owner_id: string;
  app_id: string;
  installation_id: string;
  install_target_type?: string;
  install_target_id?: string;
  resource_id: string;
  record_key: string;
  data_json: Record<string, any>;
  created_by?: string;
  updated_by?: string;
  version: number;
}

export interface AppDataRecordsListResult {
  items: AppDataRecords[];
  total: number;
}

// API functions
export async function getAppDataRecordsListApi(
  params: AppDataRecordsParams,
): Promise<AppDataRecordsListResult> {
  return requestClient.get<AppDataRecordsListResult>(
    '/api/v1/app-platform/app-data-recordss',
    { params },
  );
}

export async function getAppDataRecordsApi(
  id: number,
): Promise<AppDataRecords> {
  return requestClient.get<AppDataRecords>(
    `/api/v1/app-platform/app-data-recordss/${id}`,
  );
}

export async function createAppDataRecordsApi(
  data: any,
): Promise<AppDataRecords> {
  return requestClient.post<AppDataRecords>(
    '/api/v1/app-platform/app-data-recordss',
    data,
  );
}

export async function updateAppDataRecordsApi(
  id: number,
  data: Partial<AppDataRecordsCreateParams>,
): Promise<AppDataRecords> {
  return requestClient.put<AppDataRecords>(
    `/api/v1/app-platform/app-data-recordss/${id}`,
    data,
  );
}

export async function deleteAppDataRecordsApi(id: number): Promise<void> {
  return requestClient.delete(`/api/v1/app-platform/app-data-recordss/${id}`);
}
