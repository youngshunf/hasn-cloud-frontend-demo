import { requestClient } from '#/api/request';

/**
 * 唤星用户与 new-api 用户映射表 API
 */

// Types
export interface LlmNewapiUserMapping {
  huanxing_user_id: number;
  newapi_user_id: number;
  newapi_token_key: string;
  newapi_token_id: number;
  app_code: string;
  status: string;
}

export interface LlmNewapiUserMappingParams {
  page?: number;
  size?: number;
  huanxing_user_id?: number;
  newapi_user_id?: number;
  newapi_token_id?: number;
  app_code?: string;
  status?: string;
}

export interface LlmNewapiUserMappingCreateParams {
  huanxing_user_id: number;
  newapi_user_id: number;
  newapi_token_key: string;
  newapi_token_id: number;
  app_code: string;
  status: string;
}

export interface LlmNewapiUserMappingListResult {
  items: LlmNewapiUserMapping[];
  total: number;
}

// API functions
export async function getLlmNewapiUserMappingListApi(params: LlmNewapiUserMappingParams): Promise<LlmNewapiUserMappingListResult> {
  return requestClient.get<LlmNewapiUserMappingListResult>('/api/v1/llm/llm/newapi/user/mappings', { params });
}

export async function getLlmNewapiUserMappingApi(id: number): Promise<LlmNewapiUserMapping> {
  return requestClient.get<LlmNewapiUserMapping>(`/api/v1/llm/llm/newapi/user/mappings/${id}`);
}

export async function createLlmNewapiUserMappingApi(data: LlmNewapiUserMappingCreateParams): Promise<LlmNewapiUserMapping> {
  return requestClient.post<LlmNewapiUserMapping>('/api/v1/llm/llm/newapi/user/mappings', data);
}

export async function updateLlmNewapiUserMappingApi(id: number, data: Partial<LlmNewapiUserMappingCreateParams>): Promise<LlmNewapiUserMapping> {
  return requestClient.put<LlmNewapiUserMapping>(`/api/v1/llm/llm/newapi/user/mappings/${id}`, data);
}

export async function deleteLlmNewapiUserMappingApi(id: number): Promise<void> {
  return requestClient.delete<void>(`/api/v1/llm/llm/newapi/user/mappings/${id}`);
}
