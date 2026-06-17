import { requestClient } from '#/api/request';

/**
 * App Event 定义表 API
 */

// Types
export interface AppEvents {
  id: number;
  app_id: string;
  version_id: string;
  event_type: string;
  display_name: string;
  description: string;
  payload_schema: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface AppEventsParams {
  page?: number;
  size?: number;
  event_id?: string;
  app_id?: string;
  version_id?: string;
  event_type?: string;
  display_name?: string;
  created_at?: string;
  updated_at?: string;
}

export interface AppEventsCreateParams {
  event_id: string;
  app_id: string;
  version_id: string;
  event_type: string;
  display_name: string;
  description: string;
  payload_schema: Record<string, any>;
}

export interface AppEventsListResult {
  items: AppEvents[];
  total: number;
}

// API functions
export async function getAppEventsListApi(
  params: AppEventsParams,
): Promise<AppEventsListResult> {
  return requestClient.get<AppEventsListResult>(
    '/api/v1/app-platform/app-eventss',
    { params },
  );
}

export async function getAppEventsApi(id: number): Promise<AppEvents> {
  return requestClient.get<AppEvents>(`/api/v1/app-platform/app-eventss/${id}`);
}

export async function createAppEventsApi(data: any): Promise<AppEvents> {
  return requestClient.post<AppEvents>(
    '/api/v1/app-platform/app-eventss',
    data,
  );
}

export async function updateAppEventsApi(
  id: number,
  data: Partial<AppEventsCreateParams>,
): Promise<AppEvents> {
  return requestClient.put<AppEvents>(
    `/api/v1/app-platform/app-eventss/${id}`,
    data,
  );
}

export async function deleteAppEventsApi(id: number): Promise<void> {
  return requestClient.delete(`/api/v1/app-platform/app-eventss/${id}`);
}
