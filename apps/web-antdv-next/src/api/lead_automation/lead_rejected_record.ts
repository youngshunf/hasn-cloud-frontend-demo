import { requestClient } from '#/api/request';

/**
 * Rejected, invalid, duplicate, or failed lead record API
 */

// Types
export interface LeadRejectedRecord {
  id: number;
  job_id: number;
  raw_record_id?: number;
  firecrawl_request_id?: number;
  source_type?: string;
  source_url?: string;
  reason: string;
  email?: string;
  phone?: string;
  raw_excerpt?: string;
  duplicate_contact_id?: number;
  error_message?: string;
  metadata: Record<string, any>;
}

export interface LeadRejectedRecordParams {
  page?: number;
  size?: number;
  job_id?: number;
  raw_record_id?: number;
  firecrawl_request_id?: number;
  source_type?: string;
  email?: string;
  duplicate_contact_id?: number;
}

export interface LeadRejectedRecordCreateParams {
  job_id: number;
  raw_record_id?: number;
  firecrawl_request_id?: number;
  source_type?: string;
  source_url?: string;
  reason: string;
  email?: string;
  phone?: string;
  raw_excerpt?: string;
  duplicate_contact_id?: number;
  error_message?: string;
  metadata: Record<string, any>;
}

export interface LeadRejectedRecordListResult {
  items: LeadRejectedRecord[];
  total: number;
}

// API functions
export async function getLeadRejectedRecordListApi(
  params: LeadRejectedRecordParams,
): Promise<LeadRejectedRecordListResult> {
  return requestClient.get<LeadRejectedRecordListResult>(
    '/api/v1/growth/lead/rejected/records',
    { params },
  );
}

export async function getLeadRejectedRecordApi(
  id: number,
): Promise<LeadRejectedRecord> {
  return requestClient.get<LeadRejectedRecord>(
    `/api/v1/growth/lead/rejected/records/${id}`,
  );
}

export async function createLeadRejectedRecordApi(
  data: any,
): Promise<LeadRejectedRecord> {
  return requestClient.post<LeadRejectedRecord>(
    '/api/v1/growth/lead/rejected/records',
    data,
  );
}

export async function updateLeadRejectedRecordApi(
  id: number,
  data: Partial<LeadRejectedRecordCreateParams>,
): Promise<LeadRejectedRecord> {
  return requestClient.put<LeadRejectedRecord>(
    `/api/v1/growth/lead/rejected/records/${id}`,
    data,
  );
}

export async function deleteLeadRejectedRecordApi(id: number): Promise<void> {
  return requestClient.delete<void>(
    `/api/v1/growth/lead/rejected/records/${id}`,
  );
}
