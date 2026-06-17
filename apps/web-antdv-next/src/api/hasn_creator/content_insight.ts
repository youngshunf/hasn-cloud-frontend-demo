import { requestClient } from '#/api/request';

/**
 * 内容洞察（复盘结构化结论，进化沉淀核心） API
 */

// Types
export interface ContentInsight {
  id: number;
  project_id: number;
  user_id: number;
  owner_scope: string;
  enterprise_id?: number;
  assignee?: string;
  created_by_agent_id?: string;
  period?: string;
  insight_type: string;
  summary: string;
  evidence_json: Record<string, any>;
  action_taken: Record<string, any>;
  confidence: number;
}

export interface ContentInsightParams {
  page?: number;
  size?: number;
  project_id?: number;
  user_id?: number;
  enterprise_id?: number;
  created_by_agent_id?: string;
  insight_type?: string;
  confidence?: number;
}

export interface ContentInsightCreateParams {
  project_id: number;
  user_id: number;
  owner_scope: string;
  enterprise_id?: number;
  assignee?: string;
  created_by_agent_id?: string;
  period?: string;
  insight_type: string;
  summary: string;
  evidence_json: Record<string, any>;
  action_taken: Record<string, any>;
  confidence: number;
}

export interface ContentInsightListResult {
  items: ContentInsight[];
  total: number;
}

// API functions
export async function getContentInsightListApi(
  params: ContentInsightParams,
): Promise<ContentInsightListResult> {
  return requestClient.get<ContentInsightListResult>(
    '/api/v1/hasn-creator/content-insights',
    { params },
  );
}

export async function getContentInsightApi(
  id: number,
): Promise<ContentInsight> {
  return requestClient.get<ContentInsight>(
    `/api/v1/hasn-creator/content-insights/${id}`,
  );
}

export async function createContentInsightApi(
  data: any,
): Promise<ContentInsight> {
  return requestClient.post<ContentInsight>(
    '/api/v1/hasn-creator/content-insights',
    data,
  );
}

export async function updateContentInsightApi(
  id: number,
  data: Partial<ContentInsightCreateParams>,
): Promise<ContentInsight> {
  return requestClient.put<ContentInsight>(
    `/api/v1/hasn-creator/content-insights/${id}`,
    data,
  );
}

export async function deleteContentInsightApi(id: number): Promise<void> {
  return requestClient.delete(`/api/v1/hasn-creator/content-insights/${id}`);
}
