import { requestClient } from '#/api/request';

export type HasnSkillIds = any[] | Record<string, any>;

export interface HasnSkillBundle {
  id: number;
  owner_id: string;
  name: string;
  display_name?: string;
  description?: string;
  skill_ids: HasnSkillIds;
  instruction?: string;
  created_time: string;
  updated_time?: string;
}

export interface HasnSkillBundleParams {
  page?: number;
  size?: number;
  owner_id?: string;
  name?: string;
  display_name?: string;
}

export interface HasnSkillBundleCreateParams {
  owner_id: string;
  name: string;
  display_name?: string;
  description?: string;
  skill_ids: HasnSkillIds;
  instruction?: string;
}

export interface HasnSkillBundleListResult {
  items: HasnSkillBundle[];
  total: number;
}

const baseUrl = '/api/v1/hasn/hasn/skill/bundles';

export async function getHasnSkillBundleListApi(
  params: HasnSkillBundleParams,
): Promise<HasnSkillBundleListResult> {
  return requestClient.get<HasnSkillBundleListResult>(baseUrl, { params });
}

export async function getHasnSkillBundleApi(
  id: number,
): Promise<HasnSkillBundle> {
  return requestClient.get<HasnSkillBundle>(`${baseUrl}/${id}`);
}

export async function createHasnSkillBundleApi(
  data: HasnSkillBundleCreateParams,
) {
  return requestClient.post(baseUrl, data);
}

export async function updateHasnSkillBundleApi(
  id: number,
  data: Partial<HasnSkillBundleCreateParams>,
) {
  return requestClient.put(`${baseUrl}/${id}`, data);
}

export async function deleteHasnSkillBundleApi(id: number) {
  return requestClient.delete(baseUrl, { data: { pks: [id] } });
}
