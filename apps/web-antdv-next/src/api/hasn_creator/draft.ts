import { requestClient } from '#/api/request';

/**
 * 草稿箱（灵感快速捕获，轻量独立于正式流水线） API
 */

// Types
export interface Draft {
  id: number;
  project_id: number;
  user_id: number;
  owner_scope: string;
  enterprise_id?: number;
  assignee?: string;
  title?: string;
  content?: string;
  media: Record<string, any>;
  tags: Record<string, any>;
  target_platforms: Record<string, any>;
}

export interface DraftParams {
  page?: number;
  size?: number;
  project_id?: number;
  user_id?: number;
  enterprise_id?: number;
  title?: string;
}

export interface DraftCreateParams {
  project_id: number;
  user_id: number;
  owner_scope: string;
  enterprise_id?: number;
  assignee?: string;
  title?: string;
  content?: string;
  media: Record<string, any>;
  tags: Record<string, any>;
  target_platforms: Record<string, any>;
}

export interface DraftListResult {
  items: Draft[];
  total: number;
}

// API functions
export async function getDraftListApi(
  params: DraftParams,
): Promise<DraftListResult> {
  return requestClient.get<DraftListResult>('/api/v1/hasn-creator/drafts', {
    params,
  });
}

export async function getDraftApi(id: number): Promise<Draft> {
  return requestClient.get<Draft>(`/api/v1/hasn-creator/drafts/${id}`);
}

export async function createDraftApi(data: any): Promise<Draft> {
  return requestClient.post<Draft>('/api/v1/hasn-creator/drafts', data);
}

export async function updateDraftApi(
  id: number,
  data: Partial<DraftCreateParams>,
): Promise<Draft> {
  return requestClient.put<Draft>(`/api/v1/hasn-creator/drafts/${id}`, data);
}

export async function deleteDraftApi(id: number): Promise<void> {
  return requestClient.delete(`/api/v1/hasn-creator/drafts/${id}`);
}
