import { requestClient } from '#/api/request';

/**
 * 平台运维授予源（Admin-only·G1 特权门） API
 *
 * 后端真实路由前缀：/api/v1/hasn/platform-operator-grants
 * （codegen 生成的旧文件误拼成 hasn-platform-operator-grantss，已修正）
 */

// Types
export interface HasnPlatformOperatorGrants {
  id: number;
  agent_hasn_id: string;
  scope: string;
  granted_by: string;
  note?: string;
}

export interface HasnPlatformOperatorGrantsParams {
  page?: number;
  size?: number;
  agent_hasn_id?: string;
}

export interface HasnPlatformOperatorGrantsCreateParams {
  agent_hasn_id: string;
  scope: string;
  note?: string;
}

export interface HasnPlatformOperatorGrantsListResult {
  items: HasnPlatformOperatorGrants[];
  total: number;
}

/** 级联下拉：用户（主人）选项 */
export interface OperatorGrantOwnerOption {
  hasn_id: string;
  nickname: string;
}

/** 级联下拉：某主人名下分身选项 */
export interface OperatorGrantAgentOption {
  hasn_id: string;
  display_name: string;
  agent_name: string;
  profession?: null | string;
}

/** 声明驱动的特权 scope 只读目录项 */
export interface OperatorGrantScopeOption {
  scope: string;
  label_zh: string;
  risk: string;
  description: string;
}

const BASE = '/api/v1/hasn/platform-operator-grants';

// API functions
export async function getHasnPlatformOperatorGrantsListApi(
  params: HasnPlatformOperatorGrantsParams,
): Promise<HasnPlatformOperatorGrantsListResult> {
  return requestClient.get<HasnPlatformOperatorGrantsListResult>(BASE, {
    params,
  });
}

export async function getHasnPlatformOperatorGrantsApi(
  id: number,
): Promise<HasnPlatformOperatorGrants> {
  return requestClient.get<HasnPlatformOperatorGrants>(`${BASE}/${id}`);
}

export async function createHasnPlatformOperatorGrantsApi(
  data: HasnPlatformOperatorGrantsCreateParams,
): Promise<HasnPlatformOperatorGrants> {
  return requestClient.post<HasnPlatformOperatorGrants>(BASE, data);
}

export async function updateHasnPlatformOperatorGrantsApi(
  id: number,
  data: Partial<HasnPlatformOperatorGrantsCreateParams>,
): Promise<HasnPlatformOperatorGrants> {
  return requestClient.put<HasnPlatformOperatorGrants>(`${BASE}/${id}`, data);
}

export async function deleteHasnPlatformOperatorGrantsApi(
  id: number,
): Promise<void> {
  return requestClient.delete(`${BASE}/${id}`);
}

/** 级联下拉·第一级：列出用户（主人），可按昵称/hasn_id 关键字过滤 */
export async function getOperatorGrantOwnerOptionsApi(
  keyword?: string,
): Promise<OperatorGrantOwnerOption[]> {
  return requestClient.get<OperatorGrantOwnerOption[]>(
    `${BASE}/options/owners`,
    {
      params: keyword ? { keyword } : {},
    },
  );
}

/** 级联下拉·第二级：列出指定主人名下的分身 */
export async function getOperatorGrantAgentOptionsApi(
  ownerHasnId: string,
): Promise<OperatorGrantAgentOption[]> {
  return requestClient.get<OperatorGrantAgentOption[]>(
    `${BASE}/options/agents`,
    {
      params: { owner_hasn_id: ownerHasnId },
    },
  );
}

/** 声明驱动·只读：列出可授予的特权 scope（由工具声明 + PRIVILEGED_SCOPES 权威确定，非人工维护） */
export async function getOperatorGrantScopeOptionsApi(): Promise<
  OperatorGrantScopeOption[]
> {
  return requestClient.get<OperatorGrantScopeOption[]>(
    `${BASE}/options/scopes`,
  );
}
