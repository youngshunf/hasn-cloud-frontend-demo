import { requestClient } from '#/api/request';

/**
 * HasnNotifications API
 */

// Types
export interface HasnNotifications {
  id: number;
  target_id: string;
  type: string;
  title: string;
  body?: string;
  data: Record<string, any>;
  read: boolean;
  created_time: string;
  updated_time?: string;
}

export interface HasnNotificationsParams {
  page?: number;
  size?: number;
  target_id?: string;
  type?: string;
  title?: string;
}

export interface HasnNotificationsCreateParams {
  target_id: string;
  type: string;
  title: string;
  body?: string;
  data: Record<string, any>;
  read: boolean;
}

export interface HasnNotificationsListResult {
  items: HasnNotifications[];
  total: number;
}

// API functions
export async function getHasnNotificationsListApi(params: HasnNotificationsParams): Promise<HasnNotificationsListResult> {
  return requestClient.get<HasnNotificationsListResult>('/api/v1/hasn/hasn/notifications', { params });
}

export async function getHasnNotificationsApi(id: number): Promise<HasnNotifications> {
  return requestClient.get<HasnNotifications>(`/api/v1/hasn/hasn/notifications/${id}`);
}

export async function createHasnNotificationsApi(data: HasnNotificationsCreateParams): Promise<HasnNotifications> {
  return requestClient.post<HasnNotifications>('/api/v1/hasn/hasn/notifications', data);
}

export async function updateHasnNotificationsApi(id: number, data: Partial<HasnNotificationsCreateParams>): Promise<HasnNotifications> {
  return requestClient.put<HasnNotifications>(`/api/v1/hasn/hasn/notifications/${id}`, data);
}

export async function deleteHasnNotificationsApi(id: number): Promise<void> {
  return requestClient.delete<void>(`/api/v1/hasn/hasn/notifications/${id}`);
}
