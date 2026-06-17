import { requestClient } from '#/api/request';

/**
 * App 购买凭证表 API
 */

// Types
export interface AppEntitlements {
  id: number;
  owner_id: string;
  listing_id: string;
  installation_id?: string;
  pricing_model: string;
  amount_paid?: number;
  status: string;
  purchased_at: string;
  expires_at?: string;
  created_at: string;
  updated_at: string;
}

export interface AppEntitlementsParams {
  page?: number;
  size?: number;
  entitlement_id?: string;
  owner_id?: string;
  listing_id?: string;
  installation_id?: string;
  amount_paid?: number;
  status?: string;
  purchased_at?: string;
  expires_at?: string;
  created_at?: string;
  updated_at?: string;
}

export interface AppEntitlementsCreateParams {
  entitlement_id: string;
  owner_id: string;
  listing_id: string;
  installation_id?: string;
  pricing_model: string;
  amount_paid?: number;
  status: string;
  purchased_at: string;
  expires_at?: string;
}

export interface AppEntitlementsListResult {
  items: AppEntitlements[];
  total: number;
}

// API functions
export async function getAppEntitlementsListApi(
  params: AppEntitlementsParams,
): Promise<AppEntitlementsListResult> {
  return requestClient.get<AppEntitlementsListResult>(
    '/api/v1/app-platform/app-entitlementss',
    { params },
  );
}

export async function getAppEntitlementsApi(
  id: number,
): Promise<AppEntitlements> {
  return requestClient.get<AppEntitlements>(
    `/api/v1/app-platform/app-entitlementss/${id}`,
  );
}

export async function createAppEntitlementsApi(
  data: any,
): Promise<AppEntitlements> {
  return requestClient.post<AppEntitlements>(
    '/api/v1/app-platform/app-entitlementss',
    data,
  );
}

export async function updateAppEntitlementsApi(
  id: number,
  data: Partial<AppEntitlementsCreateParams>,
): Promise<AppEntitlements> {
  return requestClient.put<AppEntitlements>(
    `/api/v1/app-platform/app-entitlementss/${id}`,
    data,
  );
}

export async function deleteAppEntitlementsApi(id: number): Promise<void> {
  return requestClient.delete(`/api/v1/app-platform/app-entitlementss/${id}`);
}
