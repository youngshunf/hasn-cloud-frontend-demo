import { requestClient } from '#/api/request';

/**
 * 商品档位（billing_plan）API —— 统一商业化内核·价格+配额快照+试用/宽限策略
 * 后端管理面：/api/v1/user_tier/plans
 * 改价只影响新购续费（已购周期固化配额快照，不受此表改动影响）。
 */

// 商品档位记录
export interface BillingPlan {
  id: number;
  offering_key: string;
  plan_key: string;
  price_amount: number;
  price_unit: string;
  cycle: string;
  quota_json: Record<string, any>;
  trial_json: Record<string, any>;
  grace_json: Record<string, any>;
  status: string;
  sort_order: number;
  created_time?: string;
  updated_time?: string;
}

// 列表检索参数（后端 admin 端点支持 offering_key 精确 + status 精确过滤）
export interface BillingPlanParams {
  page?: number;
  size?: number;
  offering_key?: string;
  status?: string;
}

// 创建/更新入参（新增无 id）
export interface BillingPlanCreateParams {
  offering_key: string;
  plan_key: string;
  price_amount: number;
  price_unit: string;
  cycle: string;
  quota_json: Record<string, any>;
  trial_json: Record<string, any>;
  grace_json: Record<string, any>;
  status: string;
  sort_order: number;
}

export interface BillingPlanListResult {
  items: BillingPlan[];
  total: number;
}

export async function getBillingPlanListApi(params: BillingPlanParams): Promise<BillingPlanListResult> {
  return requestClient.get<BillingPlanListResult>('/api/v1/user_tier/plans', { params });
}

export async function getBillingPlanApi(id: number): Promise<BillingPlan> {
  return requestClient.get<BillingPlan>(`/api/v1/user_tier/plans/${id}`);
}

export async function createBillingPlanApi(data: BillingPlanCreateParams): Promise<BillingPlan> {
  return requestClient.post<BillingPlan>('/api/v1/user_tier/plans', data);
}

export async function updateBillingPlanApi(
  id: number,
  data: Partial<BillingPlanCreateParams>,
): Promise<BillingPlan> {
  return requestClient.put<BillingPlan>(`/api/v1/user_tier/plans/${id}`, data);
}

export async function deleteBillingPlanApi(id: number): Promise<void> {
  // 后端批量删除端点，入参 pks 数组
  return requestClient.delete<void>('/api/v1/user_tier/plans', { data: { pks: [id] } });
}
