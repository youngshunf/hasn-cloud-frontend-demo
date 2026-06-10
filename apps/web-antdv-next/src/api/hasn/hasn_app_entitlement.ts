import { requestClient } from '#/api/request';

/**
 * HasnAppEntitlement API
 */

// Types
export interface HasnAppEntitlement {
  id: number;
  app_id: string;
  subject_type: string;
  subject_id: string;
  source: string;
  status: string;
  order_ref?: string;
  granted_at: string;
  expires_at?: string;
  created_time: string;
  updated_time?: string;
}

export interface HasnAppEntitlementParams {
  page?: number;
  size?: number;
  app_id?: string;
  subject_type?: string;
  subject_id?: string;
  status?: string;
}

export interface HasnAppEntitlementCreateParams {
  app_id: string;
  subject_type: string;
  subject_id: string;
  source: string;
  status: string;
  order_ref?: string;
  granted_at: string;
  expires_at?: string;
}

export interface HasnAppEntitlementListResult {
  items: HasnAppEntitlement[];
  total: number;
}

// API functions
export async function getHasnAppEntitlementListApi(params: HasnAppEntitlementParams): Promise<HasnAppEntitlementListResult> {
  return requestClient.get<HasnAppEntitlementListResult>('/api/v1/hasn/app-entitlements', { params });
}

export async function getHasnAppEntitlementApi(id: number): Promise<HasnAppEntitlement> {
  return requestClient.get<HasnAppEntitlement>(`/api/v1/hasn/app-entitlements/${id}`);
}

export async function createHasnAppEntitlementApi(data: any): Promise<HasnAppEntitlement> {
  return requestClient.post<HasnAppEntitlement>('/api/v1/hasn/app-entitlements', data);
}

export async function updateHasnAppEntitlementApi(id: number, data: Partial<HasnAppEntitlementCreateParams>): Promise<HasnAppEntitlement> {
  return requestClient.put<HasnAppEntitlement>(`/api/v1/hasn/app-entitlements/${id}`, data);
}

export async function deleteHasnAppEntitlementApi(id: number): Promise<void> {
  return requestClient.delete<void>('/api/v1/hasn/app-entitlements', { data: { pks: [id] } });
}
