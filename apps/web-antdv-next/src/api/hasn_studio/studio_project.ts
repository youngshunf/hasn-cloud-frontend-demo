import { requestClient } from '#/api/request';

/**
 * 视频项目（统一视频引擎 studio：管线/素材/成品的容器） API
 */

// Types
export interface StudioProject {
  id: number;
  owner_hasn_id: string;
  agent_hasn_id?: string;
  title: string;
  description?: string;
  default_pipeline_key?: string;
  settings: Record<string, any>;
  cover_asset_uri?: string;
  bound_agent_id?: string;
  status: string;
}

export interface StudioProjectParams {
  page?: number;
  size?: number;
  owner_hasn_id?: string;
  agent_hasn_id?: string;
  title?: string;
  bound_agent_id?: string;
  status?: string;
}

export interface StudioProjectCreateParams {
  owner_hasn_id: string;
  agent_hasn_id?: string;
  title: string;
  description?: string;
  default_pipeline_key?: string;
  settings: Record<string, any>;
  cover_asset_uri?: string;
  bound_agent_id?: string;
  status: string;
}

export interface StudioProjectListResult {
  items: StudioProject[];
  total: number;
}

// API functions
export async function getStudioProjectListApi(
  params: StudioProjectParams,
): Promise<StudioProjectListResult> {
  return requestClient.get<StudioProjectListResult>(
    '/api/v1/hasn-studio/studio-projects',
    { params },
  );
}

export async function getStudioProjectApi(id: number): Promise<StudioProject> {
  return requestClient.get<StudioProject>(
    `/api/v1/hasn-studio/studio-projects/${id}`,
  );
}

export async function createStudioProjectApi(
  data: any,
): Promise<StudioProject> {
  return requestClient.post<StudioProject>(
    '/api/v1/hasn-studio/studio-projects',
    data,
  );
}

export async function updateStudioProjectApi(
  id: number,
  data: Partial<StudioProjectCreateParams>,
): Promise<StudioProject> {
  return requestClient.put<StudioProject>(
    `/api/v1/hasn-studio/studio-projects/${id}`,
    data,
  );
}

export async function deleteStudioProjectApi(id: number): Promise<void> {
  return requestClient.delete(`/api/v1/hasn-studio/studio-projects/${id}`);
}
