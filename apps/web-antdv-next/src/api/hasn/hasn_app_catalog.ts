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
