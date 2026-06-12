import { requestClient } from '#/api/request';

/**
 * Lead CSV export batch API
 */

// Types
export interface LeadExportBatch {
  id: number;
  batch_no: string;
  user_id: number;
  lead_scope: string;
  filter_payload: Record<string, any>;
  format: string;
  total_count: number;
  file_path?: string;
  file_sha256?: string;
  status: string;
  error_message?: string;
  started_at?: string;
  finished_at?: string;
}

export interface LeadExportBatchParams {
  page?: number;
  size?: number;
  user_id?: number;
  status?: string;
  started_at?: string;
  finished_at?: string;
}

export interface LeadExportBatchCreateParams {
  batch_no: string;
  user_id: number;
  lead_scope: string;
  filter_payload: Record<string, any>;
  format: string;
  total_count: number;
  file_path?: string;
  file_sha256?: string;
  status: string;
  error_message?: string;
  started_at?: string;
  finished_at?: string;
}

export interface LeadExportBatchListResult {
  items: LeadExportBatch[];
  total: number;
}

// API functions
export async function getLeadExportBatchListApi(
  params: LeadExportBatchParams,
): Promise<LeadExportBatchListResult> {
  return requestClient.get<LeadExportBatchListResult>(
    '/api/v1/growth/lead/export/batchs',
    { params },
  );
}

export async function getLeadExportBatchApi(
  id: number,
): Promise<LeadExportBatch> {
  return requestClient.get<LeadExportBatch>(
    `/api/v1/growth/lead/export/batchs/${id}`,
  );
}

export async function createLeadExportBatchApi(
  data: any,
): Promise<LeadExportBatch> {
  return requestClient.post<LeadExportBatch>(
    '/api/v1/growth/lead/export/batchs',
    data,
  );
}

export async function updateLeadExportBatchApi(
  id: number,
  data: Partial<LeadExportBatchCreateParams>,
): Promise<LeadExportBatch> {
  return requestClient.put<LeadExportBatch>(
    `/api/v1/growth/lead/export/batchs/${id}`,
    data,
  );
}

export async function deleteLeadExportBatchApi(id: number): Promise<void> {
  return requestClient.delete<void>(`/api/v1/growth/lead/export/batchs/${id}`);
}
