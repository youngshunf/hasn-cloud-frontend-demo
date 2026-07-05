import { requestClient } from '#/api/request';

/**
 * 桌面端发布管理（控制台）API
 *
 * 全部打云端自定义管理端路由 `/api/v1/release/admin/*`（对齐后端
 * `backend/app/hasn_release/api/v1/admin/release.py`），非 codegen 的裸表 CRUD。
 * RBAC 权限点：release:publish / release:edit / release:del / release:build。
 */

const BASE = '/api/v1/release/admin';

// ---------- 出参类型（对齐 schema/release.py 的 *Detail）----------

/** 平台目标枚举 */
export const PLATFORM_TARGETS = [
  'darwin-aarch64',
  'darwin-x86_64',
  'windows-x86_64',
  'linux-x86_64',
] as const;
export type PlatformTarget = (typeof PLATFORM_TARGETS)[number];

/** 包类型：installer=下载页安装包(dmg)，updater=热更新包(app.tar.gz) */
export type AssetKind = 'installer' | 'updater';

/** 发布渠道 */
export type ReleaseChannel = 'beta' | 'stable';

/** 版本状态 */
export type ReleaseStatus = 'deprecated' | 'draft' | 'published';

export interface ReleaseAssetDetail {
  id: number;
  platform_target: string;
  asset_kind: string;
  download_url: string;
  file_name: string;
  file_size: number;
  sha256?: null | string;
  signature?: null | string;
  download_count: number;
}

export interface ReleaseDetail {
  id: number;
  version: string;
  channel: string;
  release_notes_md?: null | string;
  release_notes_en_md?: null | string;
  status: string;
  is_latest: boolean;
  source: string;
  github_run_id?: null | string;
  published_time?: null | string;
  created_time: string;
  assets: ReleaseAssetDetail[];
}

export interface BuildDetail {
  id: number;
  ref: string;
  channel: string;
  status: string;
  version?: null | string;
  github_run_id?: null | string;
  github_run_url?: null | string;
  triggered_by?: null | string;
  error_message?: null | string;
  created_time: string;
}

// ---------- 入参类型（对齐 *Request）----------

export interface ReleaseAssetInput {
  platform_target: string;
  asset_kind: AssetKind;
  download_url: string;
  file_name: string;
  file_size?: number;
  sha256?: null | string;
  signature?: null | string;
}

export interface PublishReleaseRequest {
  version: string;
  channel: string;
  release_notes_md?: null | string;
  release_notes_en_md?: null | string;
  source?: string;
  set_latest?: boolean;
  assets: ReleaseAssetInput[];
}

export interface UpdateReleaseMetaRequest {
  release_notes_md?: null | string;
  release_notes_en_md?: null | string;
  status?: null | string;
}

export interface GithubBuildRequest {
  ref: string;
  channel: string;
}

// ---------- API ----------

/** 版本列表（channel 空=全部；后端返回扁平数组，非分页） */
export async function listReleasesApi(params?: {
  channel?: string;
  limit?: number;
}): Promise<ReleaseDetail[]> {
  return requestClient.get<ReleaseDetail[]>(`${BASE}/list`, { params });
}

/** 版本详情（含资产） */
export async function getReleaseApi(pk: number): Promise<ReleaseDetail> {
  return requestClient.get<ReleaseDetail>(`${BASE}/${pk}`);
}

/** 手动发布 / 登记新版本（release:publish） */
export async function publishReleaseApi(
  data: PublishReleaseRequest,
): Promise<ReleaseDetail> {
  return requestClient.post<ReleaseDetail>(`${BASE}/publish`, data);
}

/** 编辑 changelog / 状态（release:edit） */
export async function updateReleaseApi(
  pk: number,
  data: UpdateReleaseMetaRequest,
): Promise<ReleaseDetail> {
  return requestClient.put<ReleaseDetail>(`${BASE}/${pk}`, data);
}

/** 置为当前 channel 最新 / 回滚（release:edit） */
export async function setLatestReleaseApi(
  pk: number,
  channel: string,
): Promise<ReleaseDetail> {
  return requestClient.post<ReleaseDetail>(`${BASE}/${pk}/set-latest`, {
    channel,
  });
}

/** 删除版本（级联删资产，release:del） */
export async function deleteReleaseApi(pk: number): Promise<void> {
  await requestClient.delete(`${BASE}/${pk}`);
}

/** 从 GitHub 触发构建（release:build） */
export async function triggerGithubBuildApi(
  data: GithubBuildRequest,
): Promise<BuildDetail> {
  return requestClient.post<BuildDetail>(`${BASE}/builds/github`, data);
}

/** 构建任务列表（GitHub Actions 进度） */
export async function listBuildsApi(params?: {
  limit?: number;
}): Promise<BuildDetail[]> {
  return requestClient.get<BuildDetail[]>(`${BASE}/builds/list`, { params });
}
