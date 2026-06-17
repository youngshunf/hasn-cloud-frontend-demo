import { requestClient } from '#/api/request';

/**
 * 模板版本表 API
 */

// Types
export interface MarketplaceTemplateVersion {
  id: number;
  template_id: string;
  version: string;
  changelog?: string;
  skill_dependencies_versioned?: Record<string, any>;
  package_url?: string;
  file_hash?: string;
  file_size?: number;
  is_latest: boolean;
  published_at: string;
}

export interface MarketplaceTemplateVersionParams {
  page?: number;
  size?: number;
  template_id?: string;
  published_at?: string;
}

export interface MarketplaceTemplateVersionCreateParams {
  template_id: string;
  version: string;
  changelog?: string;
  skill_dependencies_versioned?: Record<string, any>;
  package_url?: string;
  file_hash?: string;
  file_size?: number;
  is_latest: boolean;
  published_at: string;
}

export interface MarketplaceTemplateVersionListResult {
  items: MarketplaceTemplateVersion[];
  total: number;
}

// API functions
export async function getMarketplaceTemplateVersionListApi(
  params: MarketplaceTemplateVersionParams,
): Promise<MarketplaceTemplateVersionListResult> {
  return requestClient.get<MarketplaceTemplateVersionListResult>(
    '/api/v1/marketplace/marketplace-template-versions',
    { params },
  );
}

export async function getMarketplaceTemplateVersionApi(
  id: number,
): Promise<MarketplaceTemplateVersion> {
  return requestClient.get<MarketplaceTemplateVersion>(
    `/api/v1/marketplace/marketplace-template-versions/${id}`,
  );
}

export async function createMarketplaceTemplateVersionApi(
  data: any,
): Promise<MarketplaceTemplateVersion> {
  return requestClient.post<MarketplaceTemplateVersion>(
    '/api/v1/marketplace/marketplace-template-versions',
    data,
  );
}

export async function updateMarketplaceTemplateVersionApi(
  id: number,
  data: Partial<MarketplaceTemplateVersionCreateParams>,
): Promise<MarketplaceTemplateVersion> {
  return requestClient.put<MarketplaceTemplateVersion>(
    `/api/v1/marketplace/marketplace-template-versions/${id}`,
    data,
  );
}

export async function deleteMarketplaceTemplateVersionApi(
  id: number,
): Promise<void> {
  return requestClient.delete(
    `/api/v1/marketplace/marketplace-template-versions/${id}`,
  );
}
