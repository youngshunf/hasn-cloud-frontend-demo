import { requestClient } from '#/api/request';

/**
 * Valid deduplicated lead contact API
 */

// Types
export interface LeadContact {
  id: number;
  lead_no: string;
  lead_scope: string;
  user_id?: number;
  company_name?: string;
  contact_name?: string;
  email?: string;
  email_normalized?: string;
  phone?: string;
  phone_normalized?: string;
  website?: string;
  domain?: string;
  country?: string;
  region?: string;
  city?: string;
  address?: string;
  industry?: string;
  source_type?: string;
  source_url?: string;
  keyword?: string;
  status: string;
  confidence_score: number;
  dedupe_key_email?: string;
  dedupe_key_phone?: string;
  dedupe_key_domain?: string;
  normalization_version: string;
  first_seen_at: string;
  last_seen_at: string;
  last_exported_at?: string;
  archived_at: string;
  metadata: Record<string, any>;
}

export interface LeadContactParams {
  page?: number;
  size?: number;
  user_id?: number;
  company_name?: string;
  contact_name?: string;
  email?: string;
  email_normalized?: string;
  source_type?: string;
  status?: string;
  confidence_score?: number;
  dedupe_key_email?: string;
  first_seen_at?: string;
  last_seen_at?: string;
  last_exported_at?: string;
  archived_at?: string;
}

export interface LeadContactCreateParams {
  lead_no: string;
  lead_scope: string;
  user_id?: number;
  company_name?: string;
  contact_name?: string;
  email?: string;
  email_normalized?: string;
  phone?: string;
  phone_normalized?: string;
  website?: string;
  domain?: string;
  country?: string;
  region?: string;
  city?: string;
  address?: string;
  industry?: string;
  source_type?: string;
  source_url?: string;
  keyword?: string;
  status: string;
  confidence_score: number;
  dedupe_key_email?: string;
  dedupe_key_phone?: string;
  dedupe_key_domain?: string;
  normalization_version: string;
  first_seen_at: string;
  last_seen_at: string;
  last_exported_at?: string;
  archived_at: string;
  metadata: Record<string, any>;
}

export interface LeadContactListResult {
  items: LeadContact[];
  total: number;
}

// API functions
export async function getLeadContactListApi(
  params: LeadContactParams,
): Promise<LeadContactListResult> {
  return requestClient.get<LeadContactListResult>(
    '/api/v1/growth/lead/contacts',
    { params },
  );
}

export async function getLeadContactApi(id: number): Promise<LeadContact> {
  return requestClient.get<LeadContact>(`/api/v1/growth/lead/contacts/${id}`);
}

export async function createLeadContactApi(data: any): Promise<LeadContact> {
  return requestClient.post<LeadContact>('/api/v1/growth/lead/contacts', data);
}

export async function updateLeadContactApi(
  id: number,
  data: Partial<LeadContactCreateParams>,
): Promise<LeadContact> {
  return requestClient.put<LeadContact>(
    `/api/v1/growth/lead/contacts/${id}`,
    data,
  );
}

export async function deleteLeadContactApi(id: number): Promise<void> {
  return requestClient.delete<void>(`/api/v1/growth/lead/contacts/${id}`);
}
