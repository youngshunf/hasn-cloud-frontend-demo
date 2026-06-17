import { requestClient } from '#/api/request';

/**
 * 应用市场列表表 API
 */

// Types
export interface AppListings {
  id: number;
  app_id: string;
  version_id: string;
  visibility: string;
  title: string;
  description_long: string;
  pricing_model: string;
  price_amount?: number;
  install_count: number;
  rating_average?: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface AppListingsParams {
  page?: number;
  size?: number;
  listing_id?: string;
  app_id?: string;
  version_id?: string;
  title?: string;
  status?: string;
  created_at?: string;
  updated_at?: string;
}

export interface AppListingsCreateParams {
  listing_id: string;
  app_id: string;
  version_id: string;
  visibility: string;
  title: string;
  description_long: string;
  pricing_model: string;
  price_amount?: number;
  install_count: number;
  rating_average?: number;
  status: string;
}

export interface AppListingsListResult {
  items: AppListings[];
  total: number;
}

// API functions
export async function getAppListingsListApi(
  params: AppListingsParams,
): Promise<AppListingsListResult> {
  return requestClient.get<AppListingsListResult>(
    '/api/v1/app-platform/app-listingss',
    { params },
  );
}

export async function getAppListingsApi(id: number): Promise<AppListings> {
  return requestClient.get<AppListings>(
    `/api/v1/app-platform/app-listingss/${id}`,
  );
}

export async function createAppListingsApi(data: any): Promise<AppListings> {
  return requestClient.post<AppListings>(
    '/api/v1/app-platform/app-listingss',
    data,
  );
}

export async function updateAppListingsApi(
  id: number,
  data: Partial<AppListingsCreateParams>,
): Promise<AppListings> {
  return requestClient.put<AppListings>(
    `/api/v1/app-platform/app-listingss/${id}`,
    data,
  );
}

export async function deleteAppListingsApi(id: number): Promise<void> {
  return requestClient.delete(`/api/v1/app-platform/app-listingss/${id}`);
}
