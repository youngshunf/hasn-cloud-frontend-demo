import { requestClient } from '#/api/request';

/**
 * Lead CSV export item snapshot API
 */

// Types
export interface LeadExportItem {
  id: number;
  batch_id: number;
  lead_contact_id: number;
  lead_no: string;
  snapshot: Record<string, any>;
}

export interface LeadExportItemParams {
  page?: number;
  size?: number;
  batch_id?: number;
  lead_contact_id?: number;
}

export interface LeadExportItemCreateParams {
  batch_id: number;
  lead_contact_id: number;
  lead_no: string;
  snapshot: Record<string, any>;
}

export interface LeadExportItemListResult {
  items: LeadExportItem[];
  total: number;
}

// API functions
export async function getLeadExportItemListApi(params: LeadExportItemParams): Promise<LeadExportItemListResult> {
  return requestClient.get<LeadExportItemListResult>('/api/v1/lead-automation/lead/export/items', { params });
}

export async function getLeadExportItemApi(id: number): Promise<LeadExportItem> {
  return requestClient.get<LeadExportItem>(`/api/v1/lead-automation/lead/export/items/${id}`);
}

export async function createLeadExportItemApi(data: any): Promise<LeadExportItem> {
  return requestClient.post<LeadExportItem>('/api/v1/lead-automation/lead/export/items', data);
}

export async function updateLeadExportItemApi(id: number, data: Partial<LeadExportItemCreateParams>): Promise<LeadExportItem> {
  return requestClient.put<LeadExportItem>(`/api/v1/lead-automation/lead/export/items/${id}`, data);
}

export async function deleteLeadExportItemApi(id: number): Promise<void> {
  return requestClient.delete<void>(`/api/v1/lead-automation/lead/export/items/${id}`);
}
