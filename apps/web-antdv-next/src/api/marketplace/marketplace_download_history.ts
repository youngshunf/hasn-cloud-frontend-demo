import { requestClient } from '#/api/request';

/**
 * 技能市场下载历史表 API
 */

// Types
export interface MarketplaceDownloadHistory {
  id: number;
  skill_id: string;
  version: string;
  user_id?: number;
  ip_address?: string;
  user_agent?: string;
  downloaded_at?: string;
}

export interface MarketplaceDownloadHistoryParams {
  page?: number;
  size?: number;
  skill_id?: string;
  user_id?: number;
  downloaded_at?: string;
}

export interface MarketplaceDownloadHistoryCreateParams {
  skill_id: string;
  version: string;
  user_id?: number;
  ip_address?: string;
  user_agent?: string;
  downloaded_at?: string;
}

export interface MarketplaceDownloadHistoryListResult {
  items: MarketplaceDownloadHistory[];
  total: number;
}

// API functions
export async function getMarketplaceDownloadHistoryListApi(
  params: MarketplaceDownloadHistoryParams,
): Promise<MarketplaceDownloadHistoryListResult> {
  return requestClient.get<MarketplaceDownloadHistoryListResult>(
    '/api/v1/marketplace/marketplace-download-historys',
    { params },
  );
}

export async function getMarketplaceDownloadHistoryApi(
  id: number,
): Promise<MarketplaceDownloadHistory> {
  return requestClient.get<MarketplaceDownloadHistory>(
    `/api/v1/marketplace/marketplace-download-historys/${id}`,
  );
}

export async function createMarketplaceDownloadHistoryApi(
  data: any,
): Promise<MarketplaceDownloadHistory> {
  return requestClient.post<MarketplaceDownloadHistory>(
    '/api/v1/marketplace/marketplace-download-historys',
    data,
  );
}

export async function updateMarketplaceDownloadHistoryApi(
  id: number,
  data: Partial<MarketplaceDownloadHistoryCreateParams>,
): Promise<MarketplaceDownloadHistory> {
  return requestClient.put<MarketplaceDownloadHistory>(
    `/api/v1/marketplace/marketplace-download-historys/${id}`,
    data,
  );
}

export async function deleteMarketplaceDownloadHistoryApi(
  id: number,
): Promise<void> {
  return requestClient.delete(
    `/api/v1/marketplace/marketplace-download-historys/${id}`,
  );
}
