import { requestClient } from '#/api/request';

/**
 * App 审核记录表 API
 */

// Types
export interface AppReviews {
  id: number;
  app_id: string;
  version_id: string;
  review_type: string;
  reviewer_id: string;
  review_status: string;
  review_notes?: string;
  created_at: string;
  updated_at: string;
}

export interface AppReviewsParams {
  page?: number;
  size?: number;
  review_id?: string;
  app_id?: string;
  version_id?: string;
  review_type?: string;
  reviewer_id?: string;
  review_status?: string;
  created_at?: string;
  updated_at?: string;
}

export interface AppReviewsCreateParams {
  review_id: string;
  app_id: string;
  version_id: string;
  review_type: string;
  reviewer_id: string;
  review_status: string;
  review_notes?: string;
}

export interface AppReviewsListResult {
  items: AppReviews[];
  total: number;
}

// API functions
export async function getAppReviewsListApi(
  params: AppReviewsParams,
): Promise<AppReviewsListResult> {
  return requestClient.get<AppReviewsListResult>(
    '/api/v1/app-platform/app-reviewss',
    { params },
  );
}

export async function getAppReviewsApi(id: number): Promise<AppReviews> {
  return requestClient.get<AppReviews>(
    `/api/v1/app-platform/app-reviewss/${id}`,
  );
}

export async function createAppReviewsApi(data: any): Promise<AppReviews> {
  return requestClient.post<AppReviews>(
    '/api/v1/app-platform/app-reviewss',
    data,
  );
}

export async function updateAppReviewsApi(
  id: number,
  data: Partial<AppReviewsCreateParams>,
): Promise<AppReviews> {
  return requestClient.put<AppReviews>(
    `/api/v1/app-platform/app-reviewss/${id}`,
    data,
  );
}

export async function deleteAppReviewsApi(id: number): Promise<void> {
  return requestClient.delete(`/api/v1/app-platform/app-reviewss/${id}`);
}
