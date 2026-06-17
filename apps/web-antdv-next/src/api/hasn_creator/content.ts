import { requestClient } from '#/api/request';

/**
 * 内容主体（按画像创作，归 project）；状态机 + 多形态轨道 + 自主度 + 审核 API
 */

// Types
export interface Content {
  id: number;
  content_no: string;
  project_id: number;
  user_id: number;
  owner_scope: string;
  enterprise_id?: number;
  assignee?: string;
  created_by_agent_id?: string;
  title: string;
  status: string;
  content_tracks: string;
  pipeline_mode?: string;
  target_platforms: Record<string, any>;
  topic_id?: number;
  viral_pattern_id?: number;
  playbook_id?: number;
  review_status?: string;
  review_note?: string;
  reviewer_user_id?: number;
  reviewed_at?: string;
  metadata_json: Record<string, any>;
}

export interface ContentParams {
  page?: number;
  size?: number;
  project_id?: number;
  user_id?: number;
  enterprise_id?: number;
  created_by_agent_id?: string;
  title?: string;
  status?: string;
  topic_id?: number;
  viral_pattern_id?: number;
  playbook_id?: number;
  review_status?: string;
  reviewer_user_id?: number;
  reviewed_at?: string;
}

export interface ContentCreateParams {
  content_no: string;
  project_id: number;
  user_id: number;
  owner_scope: string;
  enterprise_id?: number;
  assignee?: string;
  created_by_agent_id?: string;
  title: string;
  status: string;
  content_tracks: string;
  pipeline_mode?: string;
  target_platforms: Record<string, any>;
  topic_id?: number;
  viral_pattern_id?: number;
  playbook_id?: number;
  review_status?: string;
  review_note?: string;
  reviewer_user_id?: number;
  reviewed_at?: string;
  metadata_json: Record<string, any>;
}

export interface ContentListResult {
  items: Content[];
  total: number;
}

// API functions
export async function getContentListApi(
  params: ContentParams,
): Promise<ContentListResult> {
  return requestClient.get<ContentListResult>('/api/v1/hasn-creator/contents', {
    params,
  });
}

export async function getContentApi(id: number): Promise<Content> {
  return requestClient.get<Content>(`/api/v1/hasn-creator/contents/${id}`);
}

export async function createContentApi(data: any): Promise<Content> {
  return requestClient.post<Content>('/api/v1/hasn-creator/contents', data);
}

export async function updateContentApi(
  id: number,
  data: Partial<ContentCreateParams>,
): Promise<Content> {
  return requestClient.put<Content>(
    `/api/v1/hasn-creator/contents/${id}`,
    data,
  );
}

export async function deleteContentApi(id: number): Promise<void> {
  return requestClient.delete(`/api/v1/hasn-creator/contents/${id}`);
}
