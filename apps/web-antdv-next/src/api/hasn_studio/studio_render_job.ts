import { requestClient } from '#/api/request';

/**
 * 视频渲染任务（运行态镜像 + 进度/成本 + 审计；引擎权威态经云端轮询/webhook 同步落库） API
 */

// Types
export interface StudioRenderJob {
  id: number;
  project_id: number;
  owner_hasn_id: string;
  agent_hasn_id?: string;
  pipeline_key: string;
  input: Record<string, any>;
  engine_job_id?: string;
  status: string;
  progress: number;
  stage?: string;
  cost?: Record<string, any>;
  work_session_id?: string;
  error?: string;
  started_at?: string;
  finished_at?: string;
}

export interface StudioRenderJobParams {
  page?: number;
  size?: number;
  project_id?: number;
  owner_hasn_id?: string;
  agent_hasn_id?: string;
  engine_job_id?: string;
  status?: string;
  work_session_id?: string;
  started_at?: string;
  finished_at?: string;
}

export interface StudioRenderJobCreateParams {
  project_id: number;
  owner_hasn_id: string;
  agent_hasn_id?: string;
  pipeline_key: string;
  input: Record<string, any>;
  engine_job_id?: string;
  status: string;
  progress: number;
  stage?: string;
  cost?: Record<string, any>;
  work_session_id?: string;
  error?: string;
  started_at?: string;
  finished_at?: string;
}

export interface StudioRenderJobListResult {
  items: StudioRenderJob[];
  total: number;
}

// API functions
export async function getStudioRenderJobListApi(
  params: StudioRenderJobParams,
): Promise<StudioRenderJobListResult> {
  return requestClient.get<StudioRenderJobListResult>(
    '/api/v1/hasn-studio/studio-render-jobs',
    { params },
  );
}

export async function getStudioRenderJobApi(
  id: number,
): Promise<StudioRenderJob> {
  return requestClient.get<StudioRenderJob>(
    `/api/v1/hasn-studio/studio-render-jobs/${id}`,
  );
}

export async function createStudioRenderJobApi(
  data: any,
): Promise<StudioRenderJob> {
  return requestClient.post<StudioRenderJob>(
    '/api/v1/hasn-studio/studio-render-jobs',
    data,
  );
}

export async function updateStudioRenderJobApi(
  id: number,
  data: Partial<StudioRenderJobCreateParams>,
): Promise<StudioRenderJob> {
  return requestClient.put<StudioRenderJob>(
    `/api/v1/hasn-studio/studio-render-jobs/${id}`,
    data,
  );
}

export async function deleteStudioRenderJobApi(id: number): Promise<void> {
  return requestClient.delete(`/api/v1/hasn-studio/studio-render-jobs/${id}`);
}
