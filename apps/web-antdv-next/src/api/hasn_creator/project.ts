import { requestClient } from '#/api/request';

/**
 * 运营单元根（一个「号」的定位与运营单元）；双模归属 + 负责人 + 打法 + 自主度 API
 */

// Types
export interface Project {
  id: number;
  project_no: string;
  user_id: number;
  owner_scope: string;
  enterprise_id?: number;
  assignee?: string;
  assignee_agent_id?: string;
  name: string;
  description?: string;
  primary_platform?: string;
  pipeline_mode: string;
  playbook_id?: number;
  status: string;
}

export interface ProjectParams {
  page?: number;
  size?: number;
  user_id?: number;
  enterprise_id?: number;
  assignee_agent_id?: string;
  name?: string;
  playbook_id?: number;
  status?: string;
}

export interface ProjectCreateParams {
  project_no: string;
  user_id: number;
  owner_scope: string;
  enterprise_id?: number;
  assignee?: string;
  assignee_agent_id?: string;
  name: string;
  description?: string;
  primary_platform?: string;
  pipeline_mode: string;
  playbook_id?: number;
  status: string;
}

export interface ProjectListResult {
  items: Project[];
  total: number;
}

// API functions
export async function getProjectListApi(
  params: ProjectParams,
): Promise<ProjectListResult> {
  return requestClient.get<ProjectListResult>('/api/v1/hasn-creator/projects', {
    params,
  });
}

export async function getProjectApi(id: number): Promise<Project> {
  return requestClient.get<Project>(`/api/v1/hasn-creator/projects/${id}`);
}

export async function createProjectApi(data: any): Promise<Project> {
  return requestClient.post<Project>('/api/v1/hasn-creator/projects', data);
}

export async function updateProjectApi(
  id: number,
  data: Partial<ProjectCreateParams>,
): Promise<Project> {
  return requestClient.put<Project>(
    `/api/v1/hasn-creator/projects/${id}`,
    data,
  );
}

export async function deleteProjectApi(id: number): Promise<void> {
  return requestClient.delete(`/api/v1/hasn-creator/projects/${id}`);
}
