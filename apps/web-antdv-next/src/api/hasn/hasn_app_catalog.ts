import { requestClient } from '#/api/request';

/**
 * HasnAppCatalog API
 */

// Types
export interface HasnAppCatalog {
  id: number;
  app_id: string;
  name: string;
  icon: string;
  icon_asset_uri?: string;
  description: string;
  source: string;
  status: string;
  execution_mode: string;
  scope: Record<string, any>;
  collaboration_mode: string;
  entry_route: string;
  sort_order: number;
  default_mount: boolean;
  requires_role?: string;
  access_type: string;
  min_tier?: string;
  price_amount?: number;
  price_unit: string;
  billing_cycle: string;
  trial_days: number;
  sku_ref?: string;
  manifest_present: boolean;
  /** 发布阶段（内测）：ga=正式 / beta_full=全量内测 / beta_gray=灰度内测。与 status 上架/下架正交。 */
  release_phase?: string;
  /** 自定义角标文案（如 热门/推荐/限免），留空则不展示角标。 */
  badge_text?: string;
  /** 角标颜色（hex，如 #6D28D9），留空回落品牌紫。 */
  badge_color?: string;
  /** 应用专属平台级配置（如 film 视频引擎 5 类模型 + 引擎包 manifest）。直接编辑 JSON，权威在 catalog */
  config_json?: Record<string, any>;
  created_time: string;
  updated_time?: string;
}

export interface HasnAppCatalogParams {
  page?: number;
  size?: number;
  app_id?: string;
  name?: string;
  status?: string;
  access_type?: string;
}

export interface HasnAppCatalogCreateParams {
  app_id: string;
  name: string;
  icon: string;
  icon_asset_uri?: string;
  description: string;
  source: string;
  status: string;
  execution_mode: string;
  scope: Record<string, any>;
  collaboration_mode: string;
  entry_route: string;
  sort_order: number;
  default_mount: boolean;
  requires_role?: string;
  access_type: string;
  min_tier?: string;
  price_amount?: number;
  price_unit: string;
  billing_cycle: string;
  trial_days: number;
  sku_ref?: string;
  manifest_present: boolean;
  /** 发布阶段（内测）：ga / beta_full / beta_gray。 */
  release_phase?: string;
  /** 自定义角标文案。 */
  badge_text?: string;
  /** 角标颜色（hex）。 */
  badge_color?: string;
  /** 应用专属平台级配置（直接编辑 JSON，部分更新）。 */
  config_json?: Record<string, any>;
}

export interface HasnAppCatalogListResult {
  items: HasnAppCatalog[];
  total: number;
}

// API functions
export async function getHasnAppCatalogListApi(
  params: HasnAppCatalogParams,
): Promise<HasnAppCatalogListResult> {
  return requestClient.get<HasnAppCatalogListResult>(
    '/api/v1/hasn/app-catalogs',
    { params },
  );
}

export async function getHasnAppCatalogApi(
  id: number,
): Promise<HasnAppCatalog> {
  return requestClient.get<HasnAppCatalog>(`/api/v1/hasn/app-catalogs/${id}`);
}

export async function createHasnAppCatalogApi(
  data: any,
): Promise<HasnAppCatalog> {
  return requestClient.post<HasnAppCatalog>('/api/v1/hasn/app-catalogs', data);
}

export async function updateHasnAppCatalogApi(
  id: number,
  data: Partial<HasnAppCatalogCreateParams>,
): Promise<HasnAppCatalog> {
  return requestClient.put<HasnAppCatalog>(
    `/api/v1/hasn/app-catalogs/${id}`,
    data,
  );
}

/**
 * 仅更新应用专属平台级配置 JSON（管理端「编辑配置」专用）。
 * 后端走独立 partial 端点 PUT /{id}/config，只校验 config_json，
 * 不要求回填整行字段——否则会撞全字段必填校验报「app_id 字段为必填项」。
 */
export async function updateHasnAppCatalogConfigApi(
  id: number,
  config_json: Record<string, any>,
): Promise<void> {
  return requestClient.put(`/api/v1/hasn/app-catalogs/${id}/config`, {
    config_json,
  });
}

export async function deleteHasnAppCatalogApi(id: number): Promise<void> {
  return requestClient.delete('/api/v1/hasn/app-catalogs', {
    data: { pks: [id] },
  });
}
