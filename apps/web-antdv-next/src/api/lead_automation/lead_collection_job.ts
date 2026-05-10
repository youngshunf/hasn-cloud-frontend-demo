import { requestClient } from '#/api/request';

/**
 * AI lead automation collection job API
 */

// Types
export interface LeadCollectionJob {
  id: number;
  job_no: string;
  keyword: string;
  source_types: Record<string, any>;
  lead_scope: string;
  user_id?: number;
  status: string;
  max_pages: number;
  max_results: number;
  request_config: Record<string, any>;
  total_found: number;
  raw_count: number;
  valid_count: number;
  invalid_count: number;
  duplicate_count: number;
  firecrawl_success_count: number;
  firecrawl_failed_count: number;
  started_at?: string;
  finished_at?: string;
  error_message?: string;
  metadata: Record<string, any>;
}

export interface LeadCollectionJobParams {
  page?: number;
  size?: number;
  user_id?: number;
  status?: string;
  valid_count?: number;
  invalid_count?: number;
  started_at?: string;
  finished_at?: string;
}

export interface LeadCollectionJobCreateParams {
  job_no: string;
  keyword: string;
  source_types: Record<string, any>;
  lead_scope: string;
  user_id?: number;
  status: string;
  max_pages: number;
  max_results: number;
  request_config: Record<string, any>;
  total_found: number;
  raw_count: number;
  valid_count: number;
  invalid_count: number;
  duplicate_count: number;
  firecrawl_success_count: number;
  firecrawl_failed_count: number;
  started_at?: string;
  finished_at?: string;
  error_message?: string;
  metadata: Record<string, any>;
}

export interface LeadCollectionJobListResult {
  items: LeadCollectionJob[];
  total: number;
}

// API functions
export async function getLeadCollectionJobListApi(params: LeadCollectionJobParams): Promise<LeadCollectionJobListResult> {
  return requestClient.get<LeadCollectionJobListResult>('/api/v1/lead-automation/lead/collection/jobs', { params });
}

export async function getLeadCollectionJobApi(id: number): Promise<LeadCollectionJob> {
  return requestClient.get<LeadCollectionJob>(`/api/v1/lead-automation/lead/collection/jobs/${id}`);
}

export async function createLeadCollectionJobApi(data: any): Promise<LeadCollectionJob> {
  return requestClient.post<LeadCollectionJob>('/api/v1/lead-automation/lead/collection/jobs', data);
}

export async function updateLeadCollectionJobApi(id: number, data: Partial<LeadCollectionJobCreateParams>): Promise<LeadCollectionJob> {
  return requestClient.put<LeadCollectionJob>(`/api/v1/lead-automation/lead/collection/jobs/${id}`, data);
}

export async function deleteLeadCollectionJobApi(id: number): Promise<void> {
  return requestClient.delete<void>(`/api/v1/lead-automation/lead/collection/jobs/${id}`);
}
