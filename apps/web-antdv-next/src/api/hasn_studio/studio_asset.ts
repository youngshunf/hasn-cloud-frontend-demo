import { requestClient } from '#/api/request';

/**
 * 视频素材库（项目的输入素材：脚本/图/音/视频/字幕/配音/配乐/字体） API
 */

// Types
export interface StudioAsset {
  id: number;
  project_id: number;
  owner_hasn_id: string;
  kind: string;
  asset_uri: string;
  source: string;
  title?: string;
  meta: Record<string, any>;
}

export interface StudioAssetParams {
  page?: number;
  size?: number;
  project_id?: number;
  owner_hasn_id?: string;
  title?: string;
}

export interface StudioAssetCreateParams {
  project_id: number;
  owner_hasn_id: string;
  kind: string;
  asset_uri: string;
  source: string;
  title?: string;
  meta: Record<string, any>;
}

export interface StudioAssetListResult {
  items: StudioAsset[];
  total: number;
}

// API functions
export async function getStudioAssetListApi(
  params: StudioAssetParams,
): Promise<StudioAssetListResult> {
  return requestClient.get<StudioAssetListResult>(
    '/api/v1/hasn-studio/studio-assets',
    { params },
  );
}

export async function getStudioAssetApi(id: number): Promise<StudioAsset> {
  return requestClient.get<StudioAsset>(
    `/api/v1/hasn-studio/studio-assets/${id}`,
  );
}

export async function createStudioAssetApi(data: any): Promise<StudioAsset> {
  return requestClient.post<StudioAsset>(
    '/api/v1/hasn-studio/studio-assets',
    data,
  );
}

export async function updateStudioAssetApi(
  id: number,
  data: Partial<StudioAssetCreateParams>,
): Promise<StudioAsset> {
  return requestClient.put<StudioAsset>(
    `/api/v1/hasn-studio/studio-assets/${id}`,
    data,
  );
}

export async function deleteStudioAssetApi(id: number): Promise<void> {
  return requestClient.delete(`/api/v1/hasn-studio/studio-assets/${id}`);
}
