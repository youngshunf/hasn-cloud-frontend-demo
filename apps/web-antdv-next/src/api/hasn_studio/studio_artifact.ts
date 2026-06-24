import { requestClient } from '#/api/request';

/**
 * 视频成品（最终视频 + 元数据；与通用索引 public.hasn_artifacts 同引 hasn://asset/） API
 */

// Types
export interface StudioArtifact {
  id: number;
  project_id: number;
  render_job_id?: number;
  owner_hasn_id: string;
  agent_hasn_id?: string;
  title: string;
  pipeline_key?: string;
  video_asset_uri: string;
  thumbnail_asset_uri?: string;
  duration_sec?: number;
  resolution?: string;
  status: string;
  origin_type: string;
  active_work_session_id?: string;
  meta: Record<string, any>;
}

export interface StudioArtifactParams {
  page?: number;
  size?: number;
  project_id?: number;
  render_job_id?: number;
  owner_hasn_id?: string;
  agent_hasn_id?: string;
  title?: string;
  video_asset_uri?: string;
  status?: string;
  origin_type?: string;
  active_work_session_id?: string;
}

export interface StudioArtifactCreateParams {
  project_id: number;
  render_job_id?: number;
  owner_hasn_id: string;
  agent_hasn_id?: string;
  title: string;
  pipeline_key?: string;
  video_asset_uri: string;
  thumbnail_asset_uri?: string;
  duration_sec?: number;
  resolution?: string;
  status: string;
  origin_type: string;
  active_work_session_id?: string;
  meta: Record<string, any>;
}

export interface StudioArtifactListResult {
  items: StudioArtifact[];
  total: number;
}

// API functions
export async function getStudioArtifactListApi(
  params: StudioArtifactParams,
): Promise<StudioArtifactListResult> {
  return requestClient.get<StudioArtifactListResult>(
    '/api/v1/hasn-studio/studio-artifacts',
    { params },
  );
}

export async function getStudioArtifactApi(
  id: number,
): Promise<StudioArtifact> {
  return requestClient.get<StudioArtifact>(
    `/api/v1/hasn-studio/studio-artifacts/${id}`,
  );
}

export async function createStudioArtifactApi(
  data: any,
): Promise<StudioArtifact> {
  return requestClient.post<StudioArtifact>(
    '/api/v1/hasn-studio/studio-artifacts',
    data,
  );
}

export async function updateStudioArtifactApi(
  id: number,
  data: Partial<StudioArtifactCreateParams>,
): Promise<StudioArtifact> {
  return requestClient.put<StudioArtifact>(
    `/api/v1/hasn-studio/studio-artifacts/${id}`,
    data,
  );
}

export async function deleteStudioArtifactApi(id: number): Promise<void> {
  return requestClient.delete(`/api/v1/hasn-studio/studio-artifacts/${id}`);
}
