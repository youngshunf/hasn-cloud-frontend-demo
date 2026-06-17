import { requestClient } from '#/api/request';

/**
 * 获客打法模板（目标画像 + 触达节奏 + 话术要点），内置 + 自定义 API
 */

// Types
export interface Playbook {
  id: number;
  user_id?: number;
  name: string;
  enabled: boolean;
  goal?: string;
  target_profile: Record<string, any>;
  cadence: Record<string, any>;
  tone_guide?: string;
  exit_rule: Record<string, any>;
  is_builtin: boolean;
}

export interface PlaybookParams {
  page?: number;
  size?: number;
  user_id?: number;
  name?: string;
}

export interface PlaybookCreateParams {
  user_id?: number;
  name: string;
  enabled: boolean;
  goal?: string;
  target_profile: Record<string, any>;
  cadence: Record<string, any>;
  tone_guide?: string;
  exit_rule: Record<string, any>;
  is_builtin: boolean;
}

export interface PlaybookListResult {
  items: Playbook[];
  total: number;
}

// API functions
export async function getPlaybookListApi(
  params: PlaybookParams,
): Promise<PlaybookListResult> {
  return requestClient.get<PlaybookListResult>(
    '/api/v1/hasn-creator/playbooks',
    { params },
  );
}

export async function getPlaybookApi(id: number): Promise<Playbook> {
  return requestClient.get<Playbook>(`/api/v1/hasn-creator/playbooks/${id}`);
}

export async function createPlaybookApi(data: any): Promise<Playbook> {
  return requestClient.post<Playbook>('/api/v1/hasn-creator/playbooks', data);
}

export async function updatePlaybookApi(
  id: number,
  data: Partial<PlaybookCreateParams>,
): Promise<Playbook> {
  return requestClient.put<Playbook>(
    `/api/v1/hasn-creator/playbooks/${id}`,
    data,
  );
}

export async function deletePlaybookApi(id: number): Promise<void> {
  return requestClient.delete(`/api/v1/hasn-creator/playbooks/${id}`);
}
