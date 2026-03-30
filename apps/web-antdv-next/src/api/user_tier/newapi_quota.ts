import { requestClient } from '#/api/request';

/**
 * 管理端 — new-api Token/额度/用量 API
 */

// ========== Types ==========

export interface NewApiUserOverview {
  huanxing_user_id: number;
  user_nickname: string | null;
  user_phone: string | null;
  subscription_tier: string | null;
  subscription_status: string | null;
  newapi_user_id: number;
  newapi_token_key_masked: string;
  newapi_token_key: string;
  newapi_token_id: number;
  app_code: string;
  mapping_status: string;
  total_quota: number;
  used_quota: number;
  remain_quota: number;
  request_count: number;
}

export interface NewApiUserListResult {
  items: NewApiUserOverview[];
  total: number;
}

export interface NewApiUserListParams {
  page?: number;
  size?: number;
  user_keyword?: string;
  app_code?: string;
  mapping_status?: string;
}

export interface QuotaInfo {
  huanxing_user_id: number;
  newapi_user_id: number;
  total_quota: number;
  used_quota: number;
  remain_quota: number;
  request_count: number;
}

export interface UsageSummaryItem {
  model_name: string;
  prompt_tokens: number;
  completion_tokens: number;
  quota: number;
  request_count: number;
}

export interface UsageSummary {
  items: UsageSummaryItem[];
  total_prompt_tokens: number;
  total_completion_tokens: number;
  total_quota: number;
  total_requests: number;
  period_start: number;
  period_end: number;
}

export interface UsageDetailItem {
  id: number;
  created_at: number;
  model_name: string | null;
  prompt_tokens: number;
  completion_tokens: number;
  quota: number;
  use_time: number;
  is_stream: boolean;
  request_id: string | null;
  token_name: string | null;
}

export interface UsageDetail {
  items: UsageDetailItem[];
  total: number;
}

// ========== API functions ==========

const BASE = '/api/v1/user_tier/newapi-quota';

/** 分页查询所有用户的 Token/额度概览 */
export async function getNewApiUserListApi(params: NewApiUserListParams): Promise<NewApiUserListResult> {
  return requestClient.get<NewApiUserListResult>(BASE, { params });
}

/** 查询指定用户的详细额度信息 */
export async function getUserQuotaApi(userId: number, appCode = 'huanxing'): Promise<QuotaInfo> {
  return requestClient.get<QuotaInfo>(`${BASE}/${userId}/quota`, { params: { app_code: appCode } });
}

/** 修改用户额度 */
export async function updateUserQuotaApi(userId: number, newQuota: number, appCode = 'huanxing'): Promise<void> {
  return requestClient.put<void>(`${BASE}/${userId}/quota`, { new_quota: newQuota }, { params: { app_code: appCode } });
}

/** 查询指定用户的用量统计 */
export async function getUserUsageSummaryApi(
  userId: number,
  params?: { start_time?: number; end_time?: number; app_code?: string },
): Promise<UsageSummary> {
  return requestClient.get<UsageSummary>(`${BASE}/${userId}/usage/summary`, { params });
}

/** 查询指定用户的用量明细 */
export async function getUserUsageDetailApi(
  userId: number,
  params?: { start_time?: number; end_time?: number; model_name?: string; limit?: number; offset?: number; app_code?: string },
): Promise<UsageDetail> {
  return requestClient.get<UsageDetail>(`${BASE}/${userId}/usage/detail`, { params });
}
