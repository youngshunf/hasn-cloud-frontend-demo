import { requestClient } from '#/api/request';

/**
 * 技能市场模板表（Agent模板/技能包/SOP包） API
 */

// Types
export interface MarketplaceTemplate {
  id: number;
  template_id: string;
  namespace?: string;
  slug?: string;
  template_type: string;
  name: string;
  name_en?: string;
  name_zh?: string;
  description?: string;
  description_en?: string;
  description_zh?: string;
  source_language?: string;
  icon_url?: string;
  emoji?: string;
  author_id?: number;
  author_name?: string;
  pricing_type: string;
  price: number;
  is_private: boolean;
  is_official: boolean;
  download_count: number;
  category?: string;
  tags?: string;
  source_type?: string;
  source_repo_url?: string;
  source_repo_path?: string;
  skill_dependencies?: string;
  sop_dependencies?: string;
}

export interface MarketplaceTemplateParams {
  page?: number;
  size?: number;
  template_id?: string;
  namespace?: string;
  template_type?: string;
  name?: string;
  name_en?: string;
  name_zh?: string;
  author_id?: number;
  author_name?: string;
  pricing_type?: string;
  category?: string;
  source_type?: string;
}

export interface MarketplaceTemplateCreateParams {
  template_id: string;
  namespace?: string;
  slug?: string;
  template_type: string;
  name: string;
  name_en?: string;
  name_zh?: string;
  description?: string;
  description_en?: string;
  description_zh?: string;
  source_language?: string;
  icon_url?: string;
  emoji?: string;
  author_id?: number;
  author_name?: string;
  pricing_type: string;
  price: number;
  is_private: boolean;
  is_official: boolean;
  download_count: number;
  category?: string;
  tags?: string;
  source_type?: string;
  source_repo_url?: string;
  source_repo_path?: string;
  skill_dependencies?: string;
  sop_dependencies?: string;
}

export interface MarketplaceTemplateListResult {
  items: MarketplaceTemplate[];
  total: number;
}

// API functions
export async function getMarketplaceTemplateListApi(
  params: MarketplaceTemplateParams,
): Promise<MarketplaceTemplateListResult> {
  return requestClient.get<MarketplaceTemplateListResult>(
    '/api/v1/marketplace/marketplace-templates',
    { params },
  );
}

export async function getMarketplaceTemplateApi(
  id: number,
): Promise<MarketplaceTemplate> {
  return requestClient.get<MarketplaceTemplate>(
    `/api/v1/marketplace/marketplace-templates/${id}`,
  );
}

export async function createMarketplaceTemplateApi(
  data: any,
): Promise<MarketplaceTemplate> {
  return requestClient.post<MarketplaceTemplate>(
    '/api/v1/marketplace/marketplace-templates',
    data,
  );
}

export async function updateMarketplaceTemplateApi(
  id: number,
  data: Partial<MarketplaceTemplateCreateParams>,
): Promise<MarketplaceTemplate> {
  return requestClient.put<MarketplaceTemplate>(
    `/api/v1/marketplace/marketplace-templates/${id}`,
    data,
  );
}

export async function deleteMarketplaceTemplateApi(id: number): Promise<void> {
  return requestClient.delete(
    `/api/v1/marketplace/marketplace-templates/${id}`,
  );
}
