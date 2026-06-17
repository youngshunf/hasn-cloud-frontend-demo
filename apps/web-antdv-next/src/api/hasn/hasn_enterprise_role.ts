import { requestClient } from '#/api/request';

/**
 * 企业自定义角色 / 部门 API
 */

// Types
export interface HasnEnterpriseRole {
  id: number;
  enterprise_id: number;
  name: string;
  kind: string;
}

export interface HasnEnterpriseRoleParams {
  page?: number;
  size?: number;
  enterprise_id?: number;
  name?: string;
}

export interface HasnEnterpriseRoleCreateParams {
  enterprise_id: number;
  name: string;
  kind: string;
}

export interface HasnEnterpriseRoleListResult {
  items: HasnEnterpriseRole[];
  total: number;
}

// API functions
export async function getHasnEnterpriseRoleListApi(
  params: HasnEnterpriseRoleParams,
): Promise<HasnEnterpriseRoleListResult> {
  return requestClient.get<HasnEnterpriseRoleListResult>(
    '/api/v1/hasn/hasn-enterprise-roles',
    { params },
  );
}

export async function getHasnEnterpriseRoleApi(
  id: number,
): Promise<HasnEnterpriseRole> {
  return requestClient.get<HasnEnterpriseRole>(
    `/api/v1/hasn/hasn-enterprise-roles/${id}`,
  );
}

export async function createHasnEnterpriseRoleApi(
  data: any,
): Promise<HasnEnterpriseRole> {
  return requestClient.post<HasnEnterpriseRole>(
    '/api/v1/hasn/hasn-enterprise-roles',
    data,
  );
}

export async function updateHasnEnterpriseRoleApi(
  id: number,
  data: Partial<HasnEnterpriseRoleCreateParams>,
): Promise<HasnEnterpriseRole> {
  return requestClient.put<HasnEnterpriseRole>(
    `/api/v1/hasn/hasn-enterprise-roles/${id}`,
    data,
  );
}

export async function deleteHasnEnterpriseRoleApi(id: number): Promise<void> {
  return requestClient.delete(`/api/v1/hasn/hasn-enterprise-roles/${id}`);
}
