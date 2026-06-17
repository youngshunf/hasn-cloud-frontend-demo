import { requestClient } from '#/api/request';

/**
 * 发布记录（= content × account：发到某平台账号 + 数据指标） API
 */

// Types
export interface Publish {
  id: number;
  content_id: number;
  account_id: number;
  project_id: number;
  user_id: number;
  owner_scope: string;
  enterprise_id?: number;
  assignee?: string;
  platform: string;
  method: string;
  status: string;
  publish_url?: string;
  publish_note?: string;
  approval_user_id?: number;
  approved_at?: string;
  error_message?: string;
  published_at?: string;
  views: number;
  likes: number;
  comments: number;
  shares: number;
  favorites: number;
  new_followers: number;
  metrics_json: Record<string, any>;
  metrics_updated_at?: string;
}

export interface PublishParams {
  page?: number;
  size?: number;
  content_id?: number;
  account_id?: number;
  project_id?: number;
  user_id?: number;
  enterprise_id?: number;
  status?: string;
  approval_user_id?: number;
  approved_at?: string;
  published_at?: string;
  metrics_updated_at?: string;
}

export interface PublishCreateParams {
  content_id: number;
  account_id: number;
  project_id: number;
  user_id: number;
  owner_scope: string;
  enterprise_id?: number;
  assignee?: string;
  platform: string;
  method: string;
  status: string;
  publish_url?: string;
  publish_note?: string;
  approval_user_id?: number;
  approved_at?: string;
  error_message?: string;
  published_at?: string;
  views: number;
  likes: number;
  comments: number;
  shares: number;
  favorites: number;
  new_followers: number;
  metrics_json: Record<string, any>;
  metrics_updated_at?: string;
}

export interface PublishListResult {
  items: Publish[];
  total: number;
}

// API functions
export async function getPublishListApi(
  params: PublishParams,
): Promise<PublishListResult> {
  return requestClient.get<PublishListResult>('/api/v1/hasn-creator/publishs', {
    params,
  });
}

export async function getPublishApi(id: number): Promise<Publish> {
  return requestClient.get<Publish>(`/api/v1/hasn-creator/publishs/${id}`);
}

export async function createPublishApi(data: any): Promise<Publish> {
  return requestClient.post<Publish>('/api/v1/hasn-creator/publishs', data);
}

export async function updatePublishApi(
  id: number,
  data: Partial<PublishCreateParams>,
): Promise<Publish> {
  return requestClient.put<Publish>(
    `/api/v1/hasn-creator/publishs/${id}`,
    data,
  );
}

export async function deletePublishApi(id: number): Promise<void> {
  return requestClient.delete(`/api/v1/hasn-creator/publishs/${id}`);
}
