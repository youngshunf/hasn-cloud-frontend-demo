import { requestClient } from '#/api/request';

/**
 * 素材库；配图/封面/视频/模板（私有桶引用） API
 */

// Types
export interface Media {
  id: number;
  project_id: number;
  user_id: number;
  owner_scope: string;
  enterprise_id?: number;
  assignee?: string;
  type: string;
  asset_uri: string;
  filename?: string;
  file_size?: number;
  width?: number;
  height?: number;
  duration?: number;
  thumbnail_uri?: string;
  tags: Record<string, any>;
  description?: string;
}

export interface MediaParams {
  page?: number;
  size?: number;
  project_id?: number;
  user_id?: number;
  enterprise_id?: number;
  type?: string;
  filename?: string;
  width?: number;
}

export interface MediaCreateParams {
  project_id: number;
  user_id: number;
  owner_scope: string;
  enterprise_id?: number;
  assignee?: string;
  type: string;
  asset_uri: string;
  filename?: string;
  file_size?: number;
  width?: number;
  height?: number;
  duration?: number;
  thumbnail_uri?: string;
  tags: Record<string, any>;
  description?: string;
}

export interface MediaListResult {
  items: Media[];
  total: number;
}

// API functions
export async function getMediaListApi(
  params: MediaParams,
): Promise<MediaListResult> {
  return requestClient.get<MediaListResult>('/api/v1/hasn-creator/medias', {
    params,
  });
}

export async function getMediaApi(id: number): Promise<Media> {
  return requestClient.get<Media>(`/api/v1/hasn-creator/medias/${id}`);
}

export async function createMediaApi(data: any): Promise<Media> {
  return requestClient.post<Media>('/api/v1/hasn-creator/medias', data);
}

export async function updateMediaApi(
  id: number,
  data: Partial<MediaCreateParams>,
): Promise<Media> {
  return requestClient.put<Media>(`/api/v1/hasn-creator/medias/${id}`, data);
}

export async function deleteMediaApi(id: number): Promise<void> {
  return requestClient.delete(`/api/v1/hasn-creator/medias/${id}`);
}
