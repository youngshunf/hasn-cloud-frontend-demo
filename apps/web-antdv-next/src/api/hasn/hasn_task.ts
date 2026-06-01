import { requestClient } from '#/api/request';

export type HasnJsonValue = any[] | Record<string, any>;

export interface HasnTask {
  id: number;
  owner_id: string;
  agent_id: string;
  name: string;
  description?: string;
  prompt: string;
  skill_bundle_ids: HasnJsonValue;
  skill_ids: HasnJsonValue;
  workflow_id?: number;
  enabled_toolsets?: HasnJsonValue;
  context_from_task_id?: number;
  schedule_type: string;
  schedule_config: HasnJsonValue;
  schedule_display?: string;
  enabled: boolean;
  state: string;
  next_run_at?: string;
  last_run_at?: string;
  last_status?: string;
  last_error?: string;
  run_count: number;
  repeat_times?: number;
  repeat_completed: number;
  created_by?: string;
  created_time: string;
  updated_time?: string;
}

export interface HasnTaskParams {
  page?: number;
  size?: number;
  owner_id?: string;
  agent_id?: string;
  name?: string;
  schedule_type?: string;
  state?: string;
  enabled?: boolean;
}

export interface HasnTaskCreateParams {
  owner_id: string;
  agent_id: string;
  name: string;
  description?: string;
  prompt: string;
  skill_bundle_ids: HasnJsonValue;
  skill_ids: HasnJsonValue;
  workflow_id?: number;
  enabled_toolsets?: HasnJsonValue;
  context_from_task_id?: number;
  schedule_type: string;
  schedule_config: HasnJsonValue;
  schedule_display?: string;
  enabled: boolean;
  state: string;
  next_run_at?: string;
  last_run_at?: string;
  last_status?: string;
  last_error?: string;
  run_count: number;
  repeat_times?: number;
  repeat_completed: number;
  created_by?: string;
}

export interface HasnTaskListResult {
  items: HasnTask[];
  total: number;
}

const baseUrl = '/api/v1/hasn/hasn/tasks';

export async function getHasnTaskListApi(
  params: HasnTaskParams,
): Promise<HasnTaskListResult> {
  return requestClient.get<HasnTaskListResult>(baseUrl, { params });
}

export async function getHasnTaskApi(id: number): Promise<HasnTask> {
  return requestClient.get<HasnTask>(`${baseUrl}/${id}`);
}

export async function createHasnTaskApi(data: HasnTaskCreateParams) {
  return requestClient.post(baseUrl, data);
}

export async function updateHasnTaskApi(
  id: number,
  data: Partial<HasnTaskCreateParams>,
) {
  return requestClient.put(`${baseUrl}/${id}`, data);
}

export async function deleteHasnTaskApi(id: number) {
  return requestClient.delete(baseUrl, { data: { pks: [id] } });
}
