import { requestClient } from '#/api/request';

/**
 * 技能市场同步日志表 API
 */

// Types
export interface MarketplaceSyncLog {
  id: number;
  sync_type: string;
  status: string;
  items_synced?: number;
  items_failed?: number;
  error_message?: string;
  git_commit_before?: string;
  git_commit_after?: string;
  started_at: string;
  completed_at?: string;
}

export interface MarketplaceSyncLogParams {
  page?: number;
  size?: number;
  sync_type?: string;
  status?: string;
  started_at?: string;
  completed_at?: string;
}

export interface MarketplaceSyncLogCreateParams {
  sync_type: string;
  status: string;
  items_synced?: number;
  items_failed?: number;
  error_message?: string;
  git_commit_before?: string;
  git_commit_after?: string;
  started_at: string;
  completed_at?: string;
}

export interface MarketplaceSyncLogListResult {
  items: MarketplaceSyncLog[];
  total: number;
}

// API functions
export async function getMarketplaceSyncLogListApi(
  params: MarketplaceSyncLogParams,
): Promise<MarketplaceSyncLogListResult> {
  return requestClient.get<MarketplaceSyncLogListResult>(
    '/api/v1/marketplace/marketplace-sync-logs',
    { params },
  );
}

export async function getMarketplaceSyncLogApi(
  id: number,
): Promise<MarketplaceSyncLog> {
  return requestClient.get<MarketplaceSyncLog>(
    `/api/v1/marketplace/marketplace-sync-logs/${id}`,
  );
}

export async function createMarketplaceSyncLogApi(
  data: any,
): Promise<MarketplaceSyncLog> {
  return requestClient.post<MarketplaceSyncLog>(
    '/api/v1/marketplace/marketplace-sync-logs',
    data,
  );
}

export async function updateMarketplaceSyncLogApi(
  id: number,
  data: Partial<MarketplaceSyncLogCreateParams>,
): Promise<MarketplaceSyncLog> {
  return requestClient.put<MarketplaceSyncLog>(
    `/api/v1/marketplace/marketplace-sync-logs/${id}`,
    data,
  );
}

export async function deleteMarketplaceSyncLogApi(id: number): Promise<void> {
  return requestClient.delete(
    `/api/v1/marketplace/marketplace-sync-logs/${id}`,
  );
}
