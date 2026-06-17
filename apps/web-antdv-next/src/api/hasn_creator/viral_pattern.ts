import { requestClient } from '#/api/request';

/**
 * 爆款模式库；钩子/结构/标题/CTA，usage + success_rate（可全局 project_id NULL） API
 */

// Types
export interface ViralPattern {
  id: number;
  project_id?: number;
  user_id?: number;
  enterprise_id?: number;
  owner_scope: string;
  name: string;
  pattern_type: string;
  template?: string;
  description?: string;
  example?: string;
  usage_count: number;
  success_rate: number;
  source: string;
  tags: Record<string, any>;
  is_builtin: boolean;
}

export interface ViralPatternParams {
  page?: number;
  size?: number;
  project_id?: number;
  user_id?: number;
  enterprise_id?: number;
  name?: string;
  pattern_type?: string;
}

export interface ViralPatternCreateParams {
  project_id?: number;
  user_id?: number;
  enterprise_id?: number;
  owner_scope: string;
  name: string;
  pattern_type: string;
  template?: string;
  description?: string;
  example?: string;
  usage_count: number;
  success_rate: number;
  source: string;
  tags: Record<string, any>;
  is_builtin: boolean;
}

export interface ViralPatternListResult {
  items: ViralPattern[];
  total: number;
}

// API functions
export async function getViralPatternListApi(
  params: ViralPatternParams,
): Promise<ViralPatternListResult> {
  return requestClient.get<ViralPatternListResult>(
    '/api/v1/hasn-creator/viral-patterns',
    { params },
  );
}

export async function getViralPatternApi(id: number): Promise<ViralPattern> {
  return requestClient.get<ViralPattern>(
    `/api/v1/hasn-creator/viral-patterns/${id}`,
  );
}

export async function createViralPatternApi(data: any): Promise<ViralPattern> {
  return requestClient.post<ViralPattern>(
    '/api/v1/hasn-creator/viral-patterns',
    data,
  );
}

export async function updateViralPatternApi(
  id: number,
  data: Partial<ViralPatternCreateParams>,
): Promise<ViralPattern> {
  return requestClient.put<ViralPattern>(
    `/api/v1/hasn-creator/viral-patterns/${id}`,
    data,
  );
}

export async function deleteViralPatternApi(id: number): Promise<void> {
  return requestClient.delete(`/api/v1/hasn-creator/viral-patterns/${id}`);
}
