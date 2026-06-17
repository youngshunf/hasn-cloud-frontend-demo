import { requestClient } from '#/api/request';

/**
 * 项目画像（1:1 project）；定位参数 + 内容支柱权重（进化核心） API
 */

// Types
export interface Profile {
  id: number;
  project_id: number;
  user_id: number;
  owner_scope: string;
  enterprise_id?: number;
  assignee?: string;
  niche?: string;
  sub_niche?: string;
  persona?: string;
  target_audience?: string;
  tone?: string;
  keywords: Record<string, any>;
  content_pillars: Record<string, any>;
  posting_frequency?: string;
  best_posting_time?: string;
  style_references: Record<string, any>;
  taboo_topics: Record<string, any>;
  bio?: string;
  pillar_weights: Record<string, any>;
  pillar_weights_updated_at?: string;
}

export interface ProfileParams {
  page?: number;
  size?: number;
  project_id?: number;
  user_id?: number;
  enterprise_id?: number;
  pillar_weights_updated_at?: string;
}

export interface ProfileCreateParams {
  project_id: number;
  user_id: number;
  owner_scope: string;
  enterprise_id?: number;
  assignee?: string;
  niche?: string;
  sub_niche?: string;
  persona?: string;
  target_audience?: string;
  tone?: string;
  keywords: Record<string, any>;
  content_pillars: Record<string, any>;
  posting_frequency?: string;
  best_posting_time?: string;
  style_references: Record<string, any>;
  taboo_topics: Record<string, any>;
  bio?: string;
  pillar_weights: Record<string, any>;
  pillar_weights_updated_at?: string;
}

export interface ProfileListResult {
  items: Profile[];
  total: number;
}

// API functions
export async function getProfileListApi(
  params: ProfileParams,
): Promise<ProfileListResult> {
  return requestClient.get<ProfileListResult>('/api/v1/hasn-creator/profiles', {
    params,
  });
}

export async function getProfileApi(id: number): Promise<Profile> {
  return requestClient.get<Profile>(`/api/v1/hasn-creator/profiles/${id}`);
}

export async function createProfileApi(data: any): Promise<Profile> {
  return requestClient.post<Profile>('/api/v1/hasn-creator/profiles', data);
}

export async function updateProfileApi(
  id: number,
  data: Partial<ProfileCreateParams>,
): Promise<Profile> {
  return requestClient.put<Profile>(
    `/api/v1/hasn-creator/profiles/${id}`,
    data,
  );
}

export async function deleteProfileApi(id: number): Promise<void> {
  return requestClient.delete(`/api/v1/hasn-creator/profiles/${id}`);
}
