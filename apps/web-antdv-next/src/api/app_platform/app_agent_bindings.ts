import { requestClient } from '#/api/request';

/**
 * Installation 绑定的 Agent 列表 API
 */

// Types
export interface AppAgentBindings {
  id: number;
  installation_id: string;
  agent_id: string;
  bound_at: string;
  bound_by: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface AppAgentBindingsParams {
  page?: number;
  size?: number;
  binding_id?: string;
  installation_id?: string;
  agent_id?: string;
  bound_at?: string;
  status?: string;
  created_at?: string;
  updated_at?: string;
}

export interface AppAgentBindingsCreateParams {
  binding_id: string;
  installation_id: string;
  agent_id: string;
  bound_at: string;
  bound_by: string;
  status: string;
}

export interface AppAgentBindingsListResult {
  items: AppAgentBindings[];
  total: number;
}

// API functions
export async function getAppAgentBindingsListApi(
  params: AppAgentBindingsParams,
): Promise<AppAgentBindingsListResult> {
  return requestClient.get<AppAgentBindingsListResult>(
    '/api/v1/app-platform/app-agent-bindingss',
    { params },
  );
}

export async function getAppAgentBindingsApi(
  id: number,
): Promise<AppAgentBindings> {
  return requestClient.get<AppAgentBindings>(
    `/api/v1/app-platform/app-agent-bindingss/${id}`,
  );
}

export async function createAppAgentBindingsApi(
  data: any,
): Promise<AppAgentBindings> {
  return requestClient.post<AppAgentBindings>(
    '/api/v1/app-platform/app-agent-bindingss',
    data,
  );
}

export async function updateAppAgentBindingsApi(
  id: number,
  data: Partial<AppAgentBindingsCreateParams>,
): Promise<AppAgentBindings> {
  return requestClient.put<AppAgentBindings>(
    `/api/v1/app-platform/app-agent-bindingss/${id}`,
    data,
  );
}

export async function deleteAppAgentBindingsApi(id: number): Promise<void> {
  return requestClient.delete(`/api/v1/app-platform/app-agent-bindingss/${id}`);
}
