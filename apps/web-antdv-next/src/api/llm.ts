import { requestClient } from '#/api/request';

// ==================== 类型定义 ====================

// API Key（D1 自建 API Key 管理，new-api 解耦后保留）
export interface LlmApiKeyResult {
  id: number;
  user_id: number;
  user_nickname: string | null;
  user_phone: string | null;
  name: string;
  key_prefix: string;
  status: string;
  expires_at: string | null;
  rate_limit_config_id: number | null;
  custom_daily_tokens: number | null;
  custom_monthly_tokens: number | null;
  custom_rpm_limit: number | null;
  allowed_models: number[] | null;
  last_used_at: string | null;
  created_time: string;
}

export interface LlmApiKeyCreateParams {
  user_id?: number;
  name: string;
  expires_at?: string;
  rate_limit_config_id?: number;
  custom_daily_tokens?: number;
  custom_monthly_tokens?: number;
  custom_rpm_limit?: number;
  allowed_models?: number[];
}

export interface LlmApiKeyCreateResponse {
  id: number;
  name: string;
  key_prefix: string;
  api_key: string;
  expires_at: string | null;
}

export interface LlmApiKeyParams {
  user_id?: number;
  name?: string;
  status?: string;
  page?: number;
  size?: number;
}

// ==================== API Key API ====================

export async function getLlmApiKeyListApi(params?: LlmApiKeyParams) {
  return requestClient.get<LlmApiKeyResult[]>('/api/v1/llm/api-keys/admin', {
    params,
  });
}

export async function getLlmApiKeyApi(pk: number) {
  return requestClient.get<LlmApiKeyResult>(`/api/v1/llm/api-keys/${pk}`);
}

export async function createLlmApiKeyApi(data: LlmApiKeyCreateParams) {
  // 如果指定了 user_id，走管理员接口
  if (data.user_id) {
    return requestClient.post<LlmApiKeyCreateResponse>(
      '/api/v1/llm/api-keys/admin',
      data,
    );
  }
  return requestClient.post<LlmApiKeyCreateResponse>(
    '/api/v1/llm/api-keys',
    data,
  );
}

export async function updateLlmApiKeyApi(
  pk: number,
  data: Partial<LlmApiKeyCreateParams & { status?: string }>,
) {
  return requestClient.put(`/api/v1/llm/api-keys/${pk}`, data);
}

export async function deleteLlmApiKeyApi(pk: number) {
  return requestClient.delete(`/api/v1/llm/api-keys/${pk}`);
}

export async function getFullApiKeyApi(pk: number) {
  return requestClient.get<{ api_key: string }>(
    `/api/v1/llm/api-keys/admin/${pk}/full-key`,
  );
}
