import { requestClient } from '#/api/request';

/**
 * Lead multi-source evidence API
 */

// Types
export interface LeadContactSource {
  id: number;
  lead_contact_id: number;
  raw_record_id?: number;
  firecrawl_request_id?: number;
  source_type: string;
  source_url?: string;
  match_dimension: string;
  seen_at: string;
  metadata: Record<string, any>;
}

export interface LeadContactSourceParams {
  page?: number;
  size?: number;
  lead_contact_id?: number;
  raw_record_id?: number;
  firecrawl_request_id?: number;
  source_type?: string;
  seen_at?: string;
}

export interface LeadContactSourceCreateParams {
  lead_contact_id: number;
  raw_record_id?: number;
  firecrawl_request_id?: number;
  source_type: string;
  source_url?: string;
  match_dimension: string;
  seen_at: string;
  metadata: Record<string, any>;
}

export interface LeadContactSourceListResult {
  items: LeadContactSource[];
  total: number;
}

// API functions
export async function getLeadContactSourceListApi(
  params: LeadContactSourceParams,
): Promise<LeadContactSourceListResult> {
  return requestClient.get<LeadContactSourceListResult>(
    '/api/v1/growth/lead/contact/sources',
    { params },
  );
}

export async function getLeadContactSourceApi(
  id: number,
): Promise<LeadContactSource> {
  return requestClient.get<LeadContactSource>(
    `/api/v1/growth/lead/contact/sources/${id}`,
  );
}

export async function createLeadContactSourceApi(
  data: any,
): Promise<LeadContactSource> {
  return requestClient.post<LeadContactSource>(
    '/api/v1/growth/lead/contact/sources',
    data,
  );
}

export async function updateLeadContactSourceApi(
  id: number,
  data: Partial<LeadContactSourceCreateParams>,
): Promise<LeadContactSource> {
  return requestClient.put<LeadContactSource>(
    `/api/v1/growth/lead/contact/sources/${id}`,
    data,
  );
}

export async function deleteLeadContactSourceApi(id: number): Promise<void> {
  return requestClient.delete<void>(
    `/api/v1/growth/lead/contact/sources/${id}`,
  );
}
