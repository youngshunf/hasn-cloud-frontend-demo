import { requestClient } from '#/api/request';

/**
 * Hermes Agent 级 LLM token 隔离记录 API
 */

// Types
export interface HermesAgentLlmToken {
  agent_id: string;
  user_id: number;
  newapi_user_id: number;
  newapi_token_id: number;
  token_key_prefix: string;
  token_key_sha256: string;
  model_allowlist?: Record<string, any>;
  rate_limit_rps?: number;
  per_token_quota_remaining?: number;
  issued_at: string;
  revoked_at?: string;
  runtime_node_id?: string;
}

export interface HermesAgentLlmTokenParams {
  page?: number;
  size?: number;
  agent_id?: string;
  user_id?: number;
  newapi_user_id?: number;
  newapi_token_id?: number;
  issued_at?: string;
  revoked_at?: string;
  runtime_node_id?: string;
}

export interface HermesAgentLlmTokenCreateParams {
  agent_id: string;
  user_id: number;
  newapi_user_id: number;
  newapi_token_id: number;
  token_key_prefix: string;
  token_key_sha256: string;
  model_allowlist?: Record<string, any>;
  rate_limit_rps?: number;
  per_token_quota_remaining?: number;
  issued_at: string;
  revoked_at?: string;
  runtime_node_id?: string;
}

export interface HermesAgentLlmTokenListResult {
  items: HermesAgentLlmToken[];
  total: number;
}

// API functions
export async function getHermesAgentLlmTokenListApi(
  params: HermesAgentLlmTokenParams,
): Promise<HermesAgentLlmTokenListResult> {
  return requestClient.get<HermesAgentLlmTokenListResult>(
    '/api/v1/hermes/hermes/agent/llm/tokens',
    { params },
  );
}

export async function getHermesAgentLlmTokenApi(
  id: number,
): Promise<HermesAgentLlmToken> {
  return requestClient.get<HermesAgentLlmToken>(
    `/api/v1/hermes/hermes/agent/llm/tokens/${id}`,
  );
}

export async function createHermesAgentLlmTokenApi(
  data: HermesAgentLlmTokenCreateParams,
): Promise<HermesAgentLlmToken> {
  return requestClient.post<HermesAgentLlmToken>(
    '/api/v1/hermes/hermes/agent/llm/tokens',
    data,
  );
}

export async function updateHermesAgentLlmTokenApi(
  id: number,
  data: Partial<HermesAgentLlmTokenCreateParams>,
): Promise<HermesAgentLlmToken> {
  return requestClient.put<HermesAgentLlmToken>(
    `/api/v1/hermes/hermes/agent/llm/tokens/${id}`,
    data,
  );
}

export async function deleteHermesAgentLlmTokenApi(id: number): Promise<void> {
  return requestClient.delete(`/api/v1/hermes/hermes/agent/llm/tokens/${id}`);
}
