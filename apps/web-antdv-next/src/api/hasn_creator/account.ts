import { requestClient } from '#/api/request';

/**
 * 平台账号（1:N project）；同一项目多平台真实账号 API
 */

// Types
export interface Account {
  id: number;
  project_id: number;
  user_id: number;
  owner_scope: string;
  enterprise_id?: number;
  assignee?: string;
  platform: string;
  platform_uid?: string;
  nickname?: string;
  avatar_url?: string;
  bio?: string;
  home_url?: string;
  followers: number;
  following: number;
  total_likes: number;
  total_favorites: number;
  total_comments: number;
  total_posts: number;
  metrics_json: Record<string, any>;
  metrics_updated_at?: string;
  auth_status: string;
  is_primary: boolean;
  notes?: string;
}

export interface AccountParams {
  page?: number;
  size?: number;
  project_id?: number;
  user_id?: number;
  enterprise_id?: number;
  platform_uid?: string;
  nickname?: string;
  metrics_updated_at?: string;
  auth_status?: string;
}

export interface AccountCreateParams {
  project_id: number;
  user_id: number;
  owner_scope: string;
  enterprise_id?: number;
  assignee?: string;
  platform: string;
  platform_uid?: string;
  nickname?: string;
  avatar_url?: string;
  bio?: string;
  home_url?: string;
  followers: number;
  following: number;
  total_likes: number;
  total_favorites: number;
  total_comments: number;
  total_posts: number;
  metrics_json: Record<string, any>;
  metrics_updated_at?: string;
  auth_status: string;
  is_primary: boolean;
  notes?: string;
}

export interface AccountListResult {
  items: Account[];
  total: number;
}

// API functions
export async function getAccountListApi(
  params: AccountParams,
): Promise<AccountListResult> {
  return requestClient.get<AccountListResult>('/api/v1/hasn-creator/accounts', {
    params,
  });
}

export async function getAccountApi(id: number): Promise<Account> {
  return requestClient.get<Account>(`/api/v1/hasn-creator/accounts/${id}`);
}

export async function createAccountApi(data: any): Promise<Account> {
  return requestClient.post<Account>('/api/v1/hasn-creator/accounts', data);
}

export async function updateAccountApi(
  id: number,
  data: Partial<AccountCreateParams>,
): Promise<Account> {
  return requestClient.put<Account>(
    `/api/v1/hasn-creator/accounts/${id}`,
    data,
  );
}

export async function deleteAccountApi(id: number): Promise<void> {
  return requestClient.delete(`/api/v1/hasn-creator/accounts/${id}`);
}
