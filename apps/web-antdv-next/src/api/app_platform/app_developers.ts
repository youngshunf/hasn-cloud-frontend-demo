import { requestClient } from '#/api/request';

/**
 * 应用开发者表 API
 */

// Types
export interface AppDevelopers {
  id: number;
  owner_id: string;
  display_name: string;
  email: string;
  company_name?: string;
  website_url?: string;
  verification_status: string;
  verified_at?: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface AppDevelopersParams {
  page?: number;
  size?: number;
  developer_id?: string;
  owner_id?: string;
  display_name?: string;
  email?: string;
  company_name?: string;
  verification_status?: string;
  verified_at?: string;
  status?: string;
  created_at?: string;
  updated_at?: string;
}

export interface AppDevelopersCreateParams {
  developer_id: string;
  owner_id: string;
  display_name: string;
  email: string;
  company_name?: string;
  website_url?: string;
  verification_status: string;
  verified_at?: string;
  status: string;
}

export interface AppDevelopersListResult {
  items: AppDevelopers[];
  total: number;
}

// API functions
export async function getAppDevelopersListApi(
  params: AppDevelopersParams,
): Promise<AppDevelopersListResult> {
  return requestClient.get<AppDevelopersListResult>(
    '/api/v1/app-platform/app-developerss',
    { params },
  );
}

export async function getAppDevelopersApi(id: number): Promise<AppDevelopers> {
  return requestClient.get<AppDevelopers>(
    `/api/v1/app-platform/app-developerss/${id}`,
  );
}

export async function createAppDevelopersApi(
  data: any,
): Promise<AppDevelopers> {
  return requestClient.post<AppDevelopers>(
    '/api/v1/app-platform/app-developerss',
    data,
  );
}

export async function updateAppDevelopersApi(
  id: number,
  data: Partial<AppDevelopersCreateParams>,
): Promise<AppDevelopers> {
  return requestClient.put<AppDevelopers>(
    `/api/v1/app-platform/app-developerss/${id}`,
    data,
  );
}

export async function deleteAppDevelopersApi(id: number): Promise<void> {
  return requestClient.delete(`/api/v1/app-platform/app-developerss/${id}`);
}
