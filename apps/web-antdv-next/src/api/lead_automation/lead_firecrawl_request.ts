import { requestClient } from '#/api/request';

/**
 * Firecrawl request audit for AI lead automation API
 */

// Types
export interface LeadFirecrawlRequest {
  id: number;
  job_id: number;
  source_config_id?: number;
  source_type: string;
  endpoint: string;
  target_url?: string;
  query?: string;
  request_payload: Record<string, any>;
  extract_mode: string;
  llm_schema_version?: string;
  llm_prompt_version?: string;
  response_status?: number;
  status: string;
  attempt_count: number;
  duration_ms?: number;
  result_count?: number;
  error_message?: string;
  response_excerpt?: string;
  metadata: Record<string, any>;
}

export interface LeadFirecrawlRequestParams {
  page?: number;
  size?: number;
  job_id?: number;
  source_config_id?: number;
  source_type?: string;
  response_status?: number;
  status?: string;
}

export interface LeadFirecrawlRequestCreateParams {
  job_id: number;
  source_config_id?: number;
  source_type: string;
  endpoint: string;
  target_url?: string;
  query?: string;
  request_payload: Record<string, any>;
  extract_mode: string;
  llm_schema_version?: string;
  llm_prompt_version?: string;
  response_status?: number;
  status: string;
  attempt_count: number;
  duration_ms?: number;
  result_count?: number;
  error_message?: string;
  response_excerpt?: string;
  metadata: Record<string, any>;
}

export interface LeadFirecrawlRequestListResult {
  items: LeadFirecrawlRequest[];
  total: number;
}

// API functions
export async function getLeadFirecrawlRequestListApi(params: LeadFirecrawlRequestParams): Promise<LeadFirecrawlRequestListResult> {
  return requestClient.get<LeadFirecrawlRequestListResult>('/api/v1/lead-automation/lead/firecrawl/requests', { params });
}

export async function getLeadFirecrawlRequestApi(id: number): Promise<LeadFirecrawlRequest> {
  return requestClient.get<LeadFirecrawlRequest>(`/api/v1/lead-automation/lead/firecrawl/requests/${id}`);
}

export async function createLeadFirecrawlRequestApi(data: any): Promise<LeadFirecrawlRequest> {
  return requestClient.post<LeadFirecrawlRequest>('/api/v1/lead-automation/lead/firecrawl/requests', data);
}

export async function updateLeadFirecrawlRequestApi(id: number, data: Partial<LeadFirecrawlRequestCreateParams>): Promise<LeadFirecrawlRequest> {
  return requestClient.put<LeadFirecrawlRequest>(`/api/v1/lead-automation/lead/firecrawl/requests/${id}`, data);
}

export async function deleteLeadFirecrawlRequestApi(id: number): Promise<void> {
  return requestClient.delete<void>(`/api/v1/lead-automation/lead/firecrawl/requests/${id}`);
}
