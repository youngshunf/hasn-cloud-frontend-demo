import { requestClient } from '#/api/request';

/**
 * 会议副驾会话元数据（云端权威） API
 */

// Types
export interface CopilotSession {
  id: number;
  owner_hasn_id: string;
  session_id: string;
  bound_agent_id?: string;
  title: string;
  scene: string;
  response_mode: string;
  status: string;
  source_config: Record<string, any>;
  projection_conversation_id?: string;
  projection_message_id?: string;
  started_time?: string;
  ended_time?: string;
}

export interface CopilotSessionParams {
  page?: number;
  size?: number;
  owner_hasn_id?: string;
  session_id?: string;
  bound_agent_id?: string;
  title?: string;
  status?: string;
  projection_conversation_id?: string;
  projection_message_id?: string;
  started_time?: string;
  ended_time?: string;
}

export interface CopilotSessionCreateParams {
  owner_hasn_id: string;
  session_id: string;
  bound_agent_id?: string;
  title: string;
  scene: string;
  response_mode: string;
  status: string;
  source_config: Record<string, any>;
  projection_conversation_id?: string;
  projection_message_id?: string;
  started_time?: string;
  ended_time?: string;
}

export interface CopilotSessionListResult {
  items: CopilotSession[];
  total: number;
}

// API functions
export async function getCopilotSessionListApi(
  params: CopilotSessionParams,
): Promise<CopilotSessionListResult> {
  return requestClient.get<CopilotSessionListResult>(
    '/api/v1/hasn-copilot/copilot-sessions',
    { params },
  );
}

export async function getCopilotSessionApi(
  id: number,
): Promise<CopilotSession> {
  return requestClient.get<CopilotSession>(
    `/api/v1/hasn-copilot/copilot-sessions/${id}`,
  );
}

export async function createCopilotSessionApi(
  data: any,
): Promise<CopilotSession> {
  return requestClient.post<CopilotSession>(
    '/api/v1/hasn-copilot/copilot-sessions',
    data,
  );
}

export async function updateCopilotSessionApi(
  id: number,
  data: Partial<CopilotSessionCreateParams>,
): Promise<CopilotSession> {
  return requestClient.put<CopilotSession>(
    `/api/v1/hasn-copilot/copilot-sessions/${id}`,
    data,
  );
}

export async function deleteCopilotSessionApi(id: number): Promise<void> {
  return requestClient.delete(`/api/v1/hasn-copilot/copilot-sessions/${id}`);
}
