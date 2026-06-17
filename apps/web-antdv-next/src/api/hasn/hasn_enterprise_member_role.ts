import { requestClient } from '#/api/request';

/**
 * 成员与企业自定义角色 / 部门关联 API
 */

// Types
export interface HasnEnterpriseMemberRole {
  id: number;
  enterprise_id: number;
  user_id: number;
  role_id: number;
}

export interface HasnEnterpriseMemberRoleParams {
  page?: number;
  size?: number;
  enterprise_id?: number;
  user_id?: number;
  role_id?: number;
}

export interface HasnEnterpriseMemberRoleCreateParams {
  enterprise_id: number;
  user_id: number;
  role_id: number;
}

export interface HasnEnterpriseMemberRoleListResult {
  items: HasnEnterpriseMemberRole[];
  total: number;
}

// API functions
export async function getHasnEnterpriseMemberRoleListApi(
  params: HasnEnterpriseMemberRoleParams,
): Promise<HasnEnterpriseMemberRoleListResult> {
  return requestClient.get<HasnEnterpriseMemberRoleListResult>(
    '/api/v1/hasn/hasn-enterprise-member-roles',
    { params },
  );
}

export async function getHasnEnterpriseMemberRoleApi(
  id: number,
): Promise<HasnEnterpriseMemberRole> {
  return requestClient.get<HasnEnterpriseMemberRole>(
    `/api/v1/hasn/hasn-enterprise-member-roles/${id}`,
  );
}

export async function createHasnEnterpriseMemberRoleApi(
  data: any,
): Promise<HasnEnterpriseMemberRole> {
  return requestClient.post<HasnEnterpriseMemberRole>(
    '/api/v1/hasn/hasn-enterprise-member-roles',
    data,
  );
}

export async function updateHasnEnterpriseMemberRoleApi(
  id: number,
  data: Partial<HasnEnterpriseMemberRoleCreateParams>,
): Promise<HasnEnterpriseMemberRole> {
  return requestClient.put<HasnEnterpriseMemberRole>(
    `/api/v1/hasn/hasn-enterprise-member-roles/${id}`,
    data,
  );
}

export async function deleteHasnEnterpriseMemberRoleApi(
  id: number,
): Promise<void> {
  return requestClient.delete(
    `/api/v1/hasn/hasn-enterprise-member-roles/${id}`,
  );
}
