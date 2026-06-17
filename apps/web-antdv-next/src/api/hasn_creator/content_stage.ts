import { requestClient } from '#/api/request';

/**
 * 阶段产出；调研/大纲/初稿/终稿/封面/分镜/口播 API
 */

// Types
export interface ContentStage {
  id: number;
  content_id: number;
  project_id: number;
  user_id: number;
  owner_scope: string;
  enterprise_id?: number;
  assignee?: string;
  stage: string;
  content_text?: string;
  asset_refs: Record<string, any>;
  status: string;
  version: number;
  source_type: string;
}

export interface ContentStageParams {
  page?: number;
  size?: number;
  content_id?: number;
  project_id?: number;
  user_id?: number;
  enterprise_id?: number;
  status?: string;
  source_type?: string;
}

export interface ContentStageCreateParams {
  content_id: number;
  project_id: number;
  user_id: number;
  owner_scope: string;
  enterprise_id?: number;
  assignee?: string;
  stage: string;
  content_text?: string;
  asset_refs: Record<string, any>;
  status: string;
  version: number;
  source_type: string;
}

export interface ContentStageListResult {
  items: ContentStage[];
  total: number;
}

// API functions
export async function getContentStageListApi(
  params: ContentStageParams,
): Promise<ContentStageListResult> {
  return requestClient.get<ContentStageListResult>(
    '/api/v1/hasn-creator/content-stages',
    { params },
  );
}

export async function getContentStageApi(id: number): Promise<ContentStage> {
  return requestClient.get<ContentStage>(
    `/api/v1/hasn-creator/content-stages/${id}`,
  );
}

export async function createContentStageApi(data: any): Promise<ContentStage> {
  return requestClient.post<ContentStage>(
    '/api/v1/hasn-creator/content-stages',
    data,
  );
}

export async function updateContentStageApi(
  id: number,
  data: Partial<ContentStageCreateParams>,
): Promise<ContentStage> {
  return requestClient.put<ContentStage>(
    `/api/v1/hasn-creator/content-stages/${id}`,
    data,
  );
}

export async function deleteContentStageApi(id: number): Promise<void> {
  return requestClient.delete(`/api/v1/hasn-creator/content-stages/${id}`);
}
