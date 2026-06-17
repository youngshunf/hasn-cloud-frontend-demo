import { requestClient } from '#/api/request';

/**
 * 竞品账号（定位/选题调研输入） API
 */

// Types
export interface Competitor {
  id: number;
  project_id: number;
  user_id: number;
  owner_scope: string;
  enterprise_id?: number;
  assignee?: string;
  name: string;
  platform?: string;
  url?: string;
  follower_count: number;
  avg_likes: number;
  content_style?: string;
  strengths: Record<string, any>;
  notes?: string;
  tags: Record<string, any>;
  last_analyzed?: string;
}

export interface CompetitorParams {
  page?: number;
  size?: number;
  project_id?: number;
  user_id?: number;
  enterprise_id?: number;
  name?: string;
  last_analyzed?: string;
}

export interface CompetitorCreateParams {
  project_id: number;
  user_id: number;
  owner_scope: string;
  enterprise_id?: number;
  assignee?: string;
  name: string;
  platform?: string;
  url?: string;
  follower_count: number;
  avg_likes: number;
  content_style?: string;
  strengths: Record<string, any>;
  notes?: string;
  tags: Record<string, any>;
  last_analyzed?: string;
}

export interface CompetitorListResult {
  items: Competitor[];
  total: number;
}

// API functions
export async function getCompetitorListApi(
  params: CompetitorParams,
): Promise<CompetitorListResult> {
  return requestClient.get<CompetitorListResult>(
    '/api/v1/hasn-creator/competitors',
    { params },
  );
}

export async function getCompetitorApi(id: number): Promise<Competitor> {
  return requestClient.get<Competitor>(
    `/api/v1/hasn-creator/competitors/${id}`,
  );
}

export async function createCompetitorApi(data: any): Promise<Competitor> {
  return requestClient.post<Competitor>(
    '/api/v1/hasn-creator/competitors',
    data,
  );
}

export async function updateCompetitorApi(
  id: number,
  data: Partial<CompetitorCreateParams>,
): Promise<Competitor> {
  return requestClient.put<Competitor>(
    `/api/v1/hasn-creator/competitors/${id}`,
    data,
  );
}

export async function deleteCompetitorApi(id: number): Promise<void> {
  return requestClient.delete(`/api/v1/hasn-creator/competitors/${id}`);
}
