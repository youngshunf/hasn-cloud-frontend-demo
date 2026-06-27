import { requestClient } from '#/api/request';

/**
 * AI-Native 应用灰度内测访问（云端权威） API
 *
 * 注意：后端不是标准 CRUD，而是「审批/邀请」管理面（业务在 app_catalog_service），
 * 路由前缀 `/api/v1/app-beta-access`。这里对接自定义端点，不要用 codegen 的标准 CRUD 路径。
 */

// Types
export interface HasnAppBetaAccess {
  id: number;
  app_id: string;
  /** 访问主体类型：owner（用户）/ enterprise（企业空间）。 */
  subject_type: string;
  /** 主体 ID：owner=hasn_id / enterprise=enterprise_id。 */
  subject_id: string;
  /** 来源：apply（用户申请）/ invite（管理员邀请）。 */
  source: string;
  /** 审批状态：pending / approved / rejected。 */
  status: string;
  note?: string;
  decided_by?: string;
  decided_at?: string;
}

/** 列表过滤参数（后端仅支持 app_id / status；page/size 等会被后端忽略）。 */
export interface HasnAppBetaAccessParams {
  page?: number;
  size?: number;
  app_id?: string;
  status?: string;
}

/** 邀请进灰度内测（直接 approved，无需对方申请）。 */
export interface InviteHasnAppBetaParams {
  app_id: string;
  subject_id: string;
  subject_type?: string;
  note?: string;
}

export interface HasnAppBetaAccessListResult {
  items: HasnAppBetaAccess[];
  total: number;
}

// API functions

/**
 * 列灰度内测访问/申请。后端返回纯列表（无分页），这里包成 {items,total} 供 vxe-table 消费。
 */
export async function getHasnAppBetaAccessListApi(
  params: HasnAppBetaAccessParams,
): Promise<HasnAppBetaAccessListResult> {
  const rows = await requestClient.get<HasnAppBetaAccess[]>(
    '/api/v1/app-beta-access',
    { params },
  );
  const items = rows ?? [];
  return { items, total: items.length };
}

/** 邀请某主体进灰度内测（直接通过）。 */
export async function inviteHasnAppBetaAccessApi(
  data: InviteHasnAppBetaParams,
): Promise<HasnAppBetaAccess> {
  return requestClient.post<HasnAppBetaAccess>(
    '/api/v1/app-beta-access/invite',
    data,
  );
}

/** 通过一条灰度内测申请。 */
export async function approveHasnAppBetaAccessApi(
  id: number,
  note?: string,
): Promise<HasnAppBetaAccess> {
  return requestClient.post<HasnAppBetaAccess>(
    `/api/v1/app-beta-access/${id}/approve`,
    { note },
  );
}

/** 拒绝一条灰度内测申请。 */
export async function rejectHasnAppBetaAccessApi(
  id: number,
  note?: string,
): Promise<HasnAppBetaAccess> {
  return requestClient.post<HasnAppBetaAccess>(
    `/api/v1/app-beta-access/${id}/reject`,
    { note },
  );
}

/** 撤销/清理灰度内测访问行（删除后用户可重新申请）。 */
export async function deleteHasnAppBetaAccessApi(id: number): Promise<void> {
  return requestClient.delete('/api/v1/app-beta-access', {
    data: { pks: [id] },
  });
}
