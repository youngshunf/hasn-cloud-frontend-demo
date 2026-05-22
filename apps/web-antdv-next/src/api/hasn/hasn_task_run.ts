import { requestClient } from '#/api/request';

export type HasnTaskRunTokenUsage =
  | Record<string, any>
  | Record<string, number>;

export interface HasnTaskRun {
  id: number;
  task_id: number;
  agent_id: string;
  runtime_node_id?: string;
  status: string;
  started_at?: string;
  finished_at?: string;
  duration_ms?: number;
  prompt_snapshot?: string;
  output?: string;
  error?: string;
  model?: string;
  token_usage?: HasnTaskRunTokenUsage;
  created_time: string;
  updated_time?: string;
}

export interface HasnTaskRunParams {
  page?: number;
  size?: number;
  task_id?: number;
  agent_id?: string;
  runtime_node_id?: string;
  status?: string;
  model?: string;
}

export interface HasnTaskRunCreateParams {
  task_id: number;
  agent_id: string;
  runtime_node_id?: string;
  status: string;
  started_at?: string;
  finished_at?: string;
  duration_ms?: number;
  prompt_snapshot?: string;
  output?: string;
  error?: string;
  model?: string;
  token_usage?: HasnTaskRunTokenUsage;
}

export interface HasnTaskRunListResult {
  items: HasnTaskRun[];
  total: number;
}

const baseUrl = '/api/v1/hasn/hasn/task/runs';

export async function getHasnTaskRunListApi(
  params: HasnTaskRunParams,
): Promise<HasnTaskRunListResult> {
  return requestClient.get<HasnTaskRunListResult>(baseUrl, { params });
}

export async function getHasnTaskRunApi(id: number): Promise<HasnTaskRun> {
  return requestClient.get<HasnTaskRun>(`${baseUrl}/${id}`);
}

export async function createHasnTaskRunApi(data: HasnTaskRunCreateParams) {
  return requestClient.post(baseUrl, data);
}

export async function updateHasnTaskRunApi(
  id: number,
  data: Partial<HasnTaskRunCreateParams>,
) {
  return requestClient.put(`${baseUrl}/${id}`, data);
}

export async function deleteHasnTaskRunApi(id: number) {
  return requestClient.delete(baseUrl, { data: { pks: [id] } });
}
