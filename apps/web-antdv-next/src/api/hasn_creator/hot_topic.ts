import { requestClient } from '#/api/request';

/**
 * 热榜快照（全局，去重，喂选题；可选数据源） API
 */

// Types
export interface HotTopic {
  id: number;
  platform_id: string;
  platform_name?: string;
  title: string;
  url?: string;
  rank: number;
  heat_score: number;
  fetch_source?: string;
  fetched_at?: string;
  batch_date: string;
}

export interface HotTopicParams {
  page?: number;
  size?: number;
  platform_id?: string;
  platform_name?: string;
  title?: string;
  fetched_at?: string;
}

export interface HotTopicCreateParams {
  platform_id: string;
  platform_name?: string;
  title: string;
  url?: string;
  rank: number;
  heat_score: number;
  fetch_source?: string;
  fetched_at?: string;
  batch_date: string;
}

export interface HotTopicListResult {
  items: HotTopic[];
  total: number;
}

// API functions
export async function getHotTopicListApi(
  params: HotTopicParams,
): Promise<HotTopicListResult> {
  return requestClient.get<HotTopicListResult>(
    '/api/v1/hasn-creator/hot-topics',
    { params },
  );
}

export async function getHotTopicApi(id: number): Promise<HotTopic> {
  return requestClient.get<HotTopic>(`/api/v1/hasn-creator/hot-topics/${id}`);
}

export async function createHotTopicApi(data: any): Promise<HotTopic> {
  return requestClient.post<HotTopic>('/api/v1/hasn-creator/hot-topics', data);
}

export async function updateHotTopicApi(
  id: number,
  data: Partial<HotTopicCreateParams>,
): Promise<HotTopic> {
  return requestClient.put<HotTopic>(
    `/api/v1/hasn-creator/hot-topics/${id}`,
    data,
  );
}

export async function deleteHotTopicApi(id: number): Promise<void> {
  return requestClient.delete(`/api/v1/hasn-creator/hot-topics/${id}`);
}
