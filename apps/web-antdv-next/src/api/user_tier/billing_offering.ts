import { requestClient } from '#/api/request';

/**
 * 商品目录（billing_offering）API —— 统一商业化内核·一切可售卖物
 * 后端管理面：/api/v1/user_tier/offerings
 */

// 商品目录记录
export interface BillingOffering {
  id: number;
  key: string;
  kind: string;
  feature_key: string;
  display_name: string;
  status: string;
  source: string;
  sort_order: number;
  created_time?: string;
  updated_time?: string;
}

// 列表检索参数（后端 admin 端点支持 kind 精确 + key 子串过滤）
export interface BillingOfferingParams {
  page?: number;
  size?: number;
  kind?: string;
  key?: string;
}

// 创建/更新入参（新增无 id）
export interface BillingOfferingCreateParams {
  key: string;
  kind: string;
  feature_key: string;
  display_name: string;
  status: string;
  source: string;
  sort_order: number;
}

export interface BillingOfferingListResult {
  items: BillingOffering[];
  total: number;
}

export async function getBillingOfferingListApi(
  params: BillingOfferingParams,
): Promise<BillingOfferingListResult> {
  return requestClient.get<BillingOfferingListResult>('/api/v1/user_tier/offerings', { params });
}

export async function getBillingOfferingApi(id: number): Promise<BillingOffering> {
  return requestClient.get<BillingOffering>(`/api/v1/user_tier/offerings/${id}`);
}

export async function createBillingOfferingApi(
  data: BillingOfferingCreateParams,
): Promise<BillingOffering> {
  return requestClient.post<BillingOffering>('/api/v1/user_tier/offerings', data);
}

export async function updateBillingOfferingApi(
  id: number,
  data: Partial<BillingOfferingCreateParams>,
): Promise<BillingOffering> {
  return requestClient.put<BillingOffering>(`/api/v1/user_tier/offerings/${id}`, data);
}

export async function deleteBillingOfferingApi(id: number): Promise<void> {
  // 后端批量删除端点，入参 pks 数组
  return requestClient.delete<void>('/api/v1/user_tier/offerings', { data: { pks: [id] } });
}
