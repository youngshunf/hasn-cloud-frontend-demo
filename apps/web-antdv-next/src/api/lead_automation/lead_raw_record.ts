import { requestClient } from '#/api/request';

/**
 * Raw crawled lead page record API
 */

// Types
export interface LeadRawRecord {
  id: number;
  job_id: number;
  source_config_id?: number;
  firecrawl_request_id?: number;
  source_type: string;
  source_url?: string;
  domain?: string;
  title?: string;
  markdown?: string;
  raw_text?: string;
  raw_html?: string;
  raw_payload?: Record<string, any>;
  structured_payload?: Record<string, any>;
  llm_confidence?: number;
  system_score?: number;
  content_hash: string;
  normalization_version: string;
  status: string;
  error_message?: string;
  metadata: Record<string, any>;
}

export interface LeadRawRecordParams {
  page?: number;
  size?: number;
  job_id?: number;
  source_config_id?: number;
  firecrawl_request_id?: number;
  source_type?: string;
  title?: string;
  llm_confidence?: number;
  status?: string;
}

export interface LeadRawRecordCreateParams {
  job_id: number;
  source_config_id?: number;
  firecrawl_request_id?: number;
  source_type: string;
  source_url?: string;
  domain?: string;
  title?: string;
  markdown?: string;
  raw_text?: string;
  raw_html?: string;
  raw_payload?: Record<string, any>;
  structured_payload?: Record<string, any>;
  llm_confidence?: number;
  system_score?: number;
  content_hash: string;
  normalization_version: string;
  status: string;
  error_message?: string;
  metadata: Record<string, any>;
}

export interface LeadRawRecordListResult {
  items: LeadRawRecord[];
  total: number;
}

// API functions
export async function getLeadRawRecordListApi(params: LeadRawRecordParams): Promise<LeadRawRecordListResult> {
  return requestClient.get<LeadRawRecordListResult>('/api/v1/lead-automation/lead/raw/records', { params });
}

export async function getLeadRawRecordApi(id: number): Promise<LeadRawRecord> {
  return requestClient.get<LeadRawRecord>(`/api/v1/lead-automation/lead/raw/records/${id}`);
}

export async function createLeadRawRecordApi(data: any): Promise<LeadRawRecord> {
  return requestClient.post<LeadRawRecord>('/api/v1/lead-automation/lead/raw/records', data);
}

export async function updateLeadRawRecordApi(id: number, data: Partial<LeadRawRecordCreateParams>): Promise<LeadRawRecord> {
  return requestClient.put<LeadRawRecord>(`/api/v1/lead-automation/lead/raw/records/${id}`, data);
}

export async function deleteLeadRawRecordApi(id: number): Promise<void> {
  return requestClient.delete<void>(`/api/v1/lead-automation/lead/raw/records/${id}`);
}
