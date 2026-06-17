import { requestClient } from '#/api/request';

/**
 * 选题池；按画像 + 热点 + 竞品推荐选题 + 采纳/跳过 API
 */

// Types
export interface Topic {
  id: number;
  project_id: number;
  user_id: number;
  owner_scope: string;
  enterprise_id?: number;
  assignee?: string;
  title: string;
  potential_score: number;
  heat_index: number;
  reason?: string;
  keywords: Record<string, any>;
  creative_angles: Record<string, any>;
  status: number;
  content_id?: number;
  batch_date?: string;
  source_uid?: string;
}

export interface TopicParams {
  page?: number;
  size?: number;
  project_id?: number;
  user_id?: number;
  enterprise_id?: number;
  title?: string;
  status?: number;
  content_id?: number;
  source_uid?: string;
}

export interface TopicCreateParams {
  project_id: number;
  user_id: number;
  owner_scope: string;
  enterprise_id?: number;
  assignee?: string;
  title: string;
  potential_score: number;
  heat_index: number;
  reason?: string;
  keywords: Record<string, any>;
  creative_angles: Record<string, any>;
  status: number;
  content_id?: number;
  batch_date?: string;
  source_uid?: string;
}

export interface TopicListResult {
  items: Topic[];
  total: number;
}

// API functions
export async function getTopicListApi(
  params: TopicParams,
): Promise<TopicListResult> {
  return requestClient.get<TopicListResult>('/api/v1/hasn-creator/topics', {
    params,
  });
}

export async function getTopicApi(id: number): Promise<Topic> {
  return requestClient.get<Topic>(`/api/v1/hasn-creator/topics/${id}`);
}

export async function createTopicApi(data: any): Promise<Topic> {
  return requestClient.post<Topic>('/api/v1/hasn-creator/topics', data);
}

export async function updateTopicApi(
  id: number,
  data: Partial<TopicCreateParams>,
): Promise<Topic> {
  return requestClient.put<Topic>(`/api/v1/hasn-creator/topics/${id}`, data);
}

export async function deleteTopicApi(id: number): Promise<void> {
  return requestClient.delete(`/api/v1/hasn-creator/topics/${id}`);
}
