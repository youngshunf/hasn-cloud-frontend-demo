import { requestClient } from '#/api/request';

/**
 * HasnAgentCapabilities API
 */

// Types
export interface HasnAgentCapabilities {
  id: number;
  agent_hasn_id: string;
  capability_id: string;
  name: string;
  description?: string;
  input_schema: Record<string, any>;
  output_schema: Record<string, any>;
  requires_permission: Record<string, any>;
  tags?: string;
  estimated_time_ms: string;
  idempotent: boolean;
  status: string;
  created_time: string;
  updated_time?: string;
}

export interface HasnAgentCapabilitiesParams {
  page?: number;
  size?: number;
  agent_hasn_id?: string;
  capability_id?: string;
  name?: string;
  idempotent?: boolean;
  status?: string;
}

export interface HasnAgentCapabilitiesCreateParams {
  agent_hasn_id: string;
  capability_id: string;
  name: string;
  description?: string;
  input_schema: Record<string, any>;
  output_schema: Record<string, any>;
  requires_permission: Record<string, any>;
  tags?: string;
  estimated_time_ms: string;
  idempotent: boolean;
  status: string;
}

export interface HasnAgentCapabilitiesListResult {
  items: HasnAgentCapabilities[];
  total: number;
}

// API functions
export async function getHasnAgentCapabilitiesListApi(params: HasnAgentCapabilitiesParams): Promise<HasnAgentCapabilitiesListResult> {
  return requestClient.get<HasnAgentCapabilitiesListResult>('/api/v1/hasn/hasn/agent/capabilities', { params });
}

export async function getHasnAgentCapabilitiesApi(id: number): Promise<HasnAgentCapabilities> {
  return requestClient.get<HasnAgentCapabilities>(`/api/v1/hasn/hasn/agent/capabilities/${id}`);
}

export async function createHasnAgentCapabilitiesApi(data: HasnAgentCapabilitiesCreateParams): Promise<HasnAgentCapabilities> {
  return requestClient.post<HasnAgentCapabilities>('/api/v1/hasn/hasn/agent/capabilities', data);
}

export async function updateHasnAgentCapabilitiesApi(id: number, data: Partial<HasnAgentCapabilitiesCreateParams>): Promise<HasnAgentCapabilities> {
  return requestClient.put<HasnAgentCapabilities>(`/api/v1/hasn/hasn/agent/capabilities/${id}`, data);
}

export async function deleteHasnAgentCapabilitiesApi(id: number): Promise<void> {
  return requestClient.delete<void>(`/api/v1/hasn/hasn/agent/capabilities/${id}`);
}
