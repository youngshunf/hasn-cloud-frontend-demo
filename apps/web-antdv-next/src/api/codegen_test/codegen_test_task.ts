import { requestClient } from '#/api/request';

/**
 * 测试任务表 API
 */

// Types
export interface CodegenTestTask {
  user_id: number;
  title: string;
  description?: string;
  status?: number;
  priority?: number;
  category?: string;
  type?: string;
  progress?: number;
  due_date?: string;
  remark?: string;
}

export interface CodegenTestTaskParams {
  page?: number;
  size?: number;
  user_id?: number;
  title?: string;
  status?: number;
  category?: string;
  type?: string;
  due_date?: string;
}

export interface CodegenTestTaskCreateParams {
  user_id: number;
  title: string;
  description?: string;
  status?: number;
  priority?: number;
  category?: string;
  type?: string;
  progress?: number;
  due_date?: string;
  remark?: string;
}

export interface CodegenTestTaskListResult {
  items: CodegenTestTask[];
  total: number;
}

// API functions
export async function getCodegenTestTaskListApi(params: CodegenTestTaskParams): Promise<CodegenTestTaskListResult> {
  return requestClient.get<CodegenTestTaskListResult>('/api/v1/codegen_test/codegen/test/tasks', { params });
}

export async function getCodegenTestTaskApi(id: number): Promise<CodegenTestTask> {
  return requestClient.get<CodegenTestTask>(`/api/v1/codegen_test/codegen/test/tasks/${id}`);
}

export async function createCodegenTestTaskApi(data: CodegenTestTaskCreateParams): Promise<CodegenTestTask> {
  return requestClient.post<CodegenTestTask>('/api/v1/codegen_test/codegen/test/tasks', data);
}

export async function updateCodegenTestTaskApi(id: number, data: Partial<CodegenTestTaskCreateParams>): Promise<CodegenTestTask> {
  return requestClient.put<CodegenTestTask>(`/api/v1/codegen_test/codegen/test/tasks/${id}`, data);
}

export async function deleteCodegenTestTaskApi(id: number): Promise<void> {
  return requestClient.delete<void>(`/api/v1/codegen_test/codegen/test/tasks/${id}`);
}
