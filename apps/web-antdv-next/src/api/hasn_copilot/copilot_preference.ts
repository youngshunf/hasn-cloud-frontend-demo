import { requestClient } from '#/api/request';

/**
 * 会议副驾 owner 级偏好（单行 per owner，云端权威） API
 */

// Types
export interface CopilotPreference {
  id: number;
  default_agent_id?: string;
  default_response_mode: string;
  auto_summary: boolean;
}

export interface CopilotPreferenceParams {
  page?: number;
  size?: number;
  owner_hasn_id?: string;
  default_agent_id?: string;
}

export interface CopilotPreferenceCreateParams {
  owner_hasn_id: string;
  default_agent_id?: string;
  default_response_mode: string;
  auto_summary: boolean;
}

export interface CopilotPreferenceListResult {
  items: CopilotPreference[];
  total: number;
}

// API functions
export async function getCopilotPreferenceListApi(
  params: CopilotPreferenceParams,
): Promise<CopilotPreferenceListResult> {
  return requestClient.get<CopilotPreferenceListResult>(
    '/api/v1/hasn-copilot/copilot-preferences',
    { params },
  );
}

export async function getCopilotPreferenceApi(
  id: number,
): Promise<CopilotPreference> {
  return requestClient.get<CopilotPreference>(
    `/api/v1/hasn-copilot/copilot-preferences/${id}`,
  );
}

export async function createCopilotPreferenceApi(
  data: any,
): Promise<CopilotPreference> {
  return requestClient.post<CopilotPreference>(
    '/api/v1/hasn-copilot/copilot-preferences',
    data,
  );
}

export async function updateCopilotPreferenceApi(
  id: number,
  data: Partial<CopilotPreferenceCreateParams>,
): Promise<CopilotPreference> {
  return requestClient.put<CopilotPreference>(
    `/api/v1/hasn-copilot/copilot-preferences/${id}`,
    data,
  );
}

export async function deleteCopilotPreferenceApi(id: number): Promise<void> {
  return requestClient.delete(`/api/v1/hasn-copilot/copilot-preferences/${id}`);
}
