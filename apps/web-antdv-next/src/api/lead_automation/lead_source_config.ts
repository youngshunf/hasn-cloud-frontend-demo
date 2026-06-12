import { requestClient } from '#/api/request';

/**
 * AI lead automation source configuration API
 */

// Types
export interface LeadSourceConfig {
  id: number;
  source_type: string;
  name: string;
  enabled: boolean;
  firecrawl_options: Record<string, any>;
  min_contact_fields: Record<string, any>;
  persist_raw_html: boolean;
  max_html_bytes: number;
  domain_blacklist: Record<string, any>;
  country_blacklist: Record<string, any>;
  rate_limit_per_minute: number;
  concurrency: number;
  metadata: Record<string, any>;
}

export interface LeadSourceConfigParams {
  page?: number;
  size?: number;
  source_type?: string;
  name?: string;
}

export interface LeadSourceConfigCreateParams {
  source_type: string;
  name: string;
  enabled: boolean;
  firecrawl_options: Record<string, any>;
  min_contact_fields: Record<string, any>;
  persist_raw_html: boolean;
  max_html_bytes: number;
  domain_blacklist: Record<string, any>;
  country_blacklist: Record<string, any>;
  rate_limit_per_minute: number;
  concurrency: number;
  metadata: Record<string, any>;
}

export interface LeadSourceConfigListResult {
  items: LeadSourceConfig[];
  total: number;
}

// API functions
export async function getLeadSourceConfigListApi(
  params: LeadSourceConfigParams,
): Promise<LeadSourceConfigListResult> {
  return requestClient.get<LeadSourceConfigListResult>(
    '/api/v1/growth/lead-source-configs',
    { params },
  );
}

export async function getLeadSourceConfigApi(
  id: number,
): Promise<LeadSourceConfig> {
  return requestClient.get<LeadSourceConfig>(
    `/api/v1/growth/lead-source-configs/${id}`,
  );
}

export async function createLeadSourceConfigApi(
  data: any,
): Promise<LeadSourceConfig> {
  return requestClient.post<LeadSourceConfig>(
    '/api/v1/growth/lead-source-configs',
    data,
  );
}

export async function updateLeadSourceConfigApi(
  id: number,
  data: Partial<LeadSourceConfigCreateParams>,
): Promise<LeadSourceConfig> {
  return requestClient.put<LeadSourceConfig>(
    `/api/v1/growth/lead-source-configs/${id}`,
    data,
  );
}

export async function deleteLeadSourceConfigApi(id: number): Promise<void> {
  return requestClient.delete<void>(`/api/v1/growth/lead-source-configs/${id}`);
}
