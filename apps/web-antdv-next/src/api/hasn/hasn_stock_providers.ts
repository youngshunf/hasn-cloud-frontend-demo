import { requestClient } from '#/api/request';

/**
 * 素材站目录 · 平台管理面 API（A-P2-0 admin，事实源 docs/Agent产物系统/01-分身资源检索与素材站工具设计 §4.5/§7）
 *
 * 平台运营在此配置素材站（pexels/pixabay/coverr/…）：注册、写 api_key、启用/停用、
 * 配 failover priority、维护下载白名单域名。api_key **明文只进不出**——写入加密落库，
 * 读回只给掩码 + 是否已配（对齐 external_mcp secret / newapi APIKey）。
 *
 * 路由前缀 `/api/v1/hasn_stock`，Admin JWT + RBAC（hasn_stock:provider:add/edit/del）。
 */

// 素材站目录项（admin 列表/详情；api_key 掩码不回显明文）
export interface StockProviderItem {
  id: number;
  provider: string;
  display_name: string;
  media_types: string[];
  /** 是否已配 api_key（不回显明文） */
  api_key_configured: boolean;
  /** api_key 掩码（如 ****abcd；仅展示尾 4 位） */
  api_key_masked?: null | string;
  download_domains: string[];
  enabled: boolean;
  priority: number;
  license_terms_url?: null | string;
  remark?: null | string;
  created_time: string;
  updated_time?: null | string;
}

/** 新增素材站请求体（api_key 明文只进不出，加密落库不回显）。 */
export interface CreateProviderParams {
  provider: string;
  display_name?: string;
  media_types?: string[];
  /** 明文 api_key（加密落库；不回显）。留空则不配。 */
  api_key?: null | string;
  download_domains?: string[];
  enabled?: boolean;
  priority?: number;
  license_terms_url?: null | string;
  remark?: null | string;
}

/**
 * 更新素材站请求体（所有字段可选）。
 * `api_key`：传空串=清空 key，传 undefined/不传=不改，传非空=加密覆盖（轮换）。
 */
export interface UpdateProviderParams {
  display_name?: string;
  media_types?: string[];
  api_key?: string;
  download_domains?: string[];
  enabled?: boolean;
  priority?: number;
  license_terms_url?: null | string;
  remark?: null | string;
}

export interface StockProviderListResult {
  items: StockProviderItem[];
  total: number;
}

/**
 * 列出素材站目录。后端返回纯列表，这里包成 {items,total} 供 vxe-table 消费。
 */
export async function getStockProviderListApi(): Promise<StockProviderListResult> {
  const rows = await requestClient.get<StockProviderItem[]>(
    '/api/v1/hasn_stock/providers',
  );
  const items = rows ?? [];
  return { items, total: items.length };
}

/** 素材站详情（api_key 仅掩码）。 */
export async function getStockProviderDetailApi(
  providerId: number,
): Promise<StockProviderItem> {
  return requestClient.get<StockProviderItem>(
    `/api/v1/hasn_stock/providers/${providerId}`,
  );
}

/** 新增素材站（api_key 加密落库，不回显）。 */
export async function createStockProviderApi(
  data: CreateProviderParams,
): Promise<StockProviderItem> {
  return requestClient.post<StockProviderItem>(
    '/api/v1/hasn_stock/providers',
    data,
  );
}

/** 更新素材站（api_key 空串清空 / 不传不改 / 非空加密覆盖）。 */
export async function updateStockProviderApi(
  providerId: number,
  data: UpdateProviderParams,
): Promise<StockProviderItem> {
  return requestClient.put<StockProviderItem>(
    `/api/v1/hasn_stock/providers/${providerId}`,
    data,
  );
}

/** 删除素材站。 */
export async function deleteStockProviderApi(
  providerId: number,
): Promise<{ deleted: boolean }> {
  return requestClient.delete<{ deleted: boolean }>(
    `/api/v1/hasn_stock/providers/${providerId}`,
  );
}
