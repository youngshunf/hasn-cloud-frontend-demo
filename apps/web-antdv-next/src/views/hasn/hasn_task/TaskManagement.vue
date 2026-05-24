<template>
  <div class="task-management">
    <div class="task-header">
      <h2>任务管理</h2>
      <a-button type="primary" @click="showCreateModal">
        <template #icon>
          <PlusOutlined />
        </template>
        创建任务
      </a-button>
    </div>

    <a-table
      :columns="columns"
      :data-source="tasks"
      :loading="loading"
      :pagination="pagination"
      row-key="task_id"
      @change="handleTableChange"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'enabled'">
          <a-tag :color="record.enabled ? 'green' : 'red'">
            {{ record.enabled ? '启用' : '禁用' }}
          </a-tag>
        </template>
        <template v-else-if="column.key === 'schedule_type'">
          <a-tag>{{ getScheduleTypeLabel(record.schedule_type) }}</a-tag>
        </template>
        <template v-else-if="column.key === 'actions'">
          <a-space>
            <a-button size="small" @click="viewTask(record)">查看</a-button>
            <a-button size="small" @click="editTask(record)">编辑</a-button>
            <a-button
              size="small"
              :type="record.enabled ? 'default' : 'primary'"
              @click="toggleTask(record)"
            >
              {{ record.enabled ? '禁用' : '启用' }}
            </a-button>
            <a-popconfirm
              title="确定删除此任务吗？"
              @confirm="deleteTask(record.task_id)"
            >
              <a-button size="small" danger>删除</a-button>
            </a-popconfirm>
          </a-space>
        </template>
      </template>
    </a-table>

    <a-modal
      v-model:open="createModalVisible"
      title="创建任务"
      width="600px"
      @ok="handleCreateTask"
    >
      <a-form :model="taskForm" layout="vertical">
        <a-form-item label="任务名称" required>
          <a-input v-model:value="taskForm.name" placeholder="请输入任务名称" />
        </a-form-item>
        <a-form-item label="Agent ID" required>
          <a-input v-model:value="taskForm.agent_id" placeholder="请输入 Agent ID" />
        </a-form-item>
        <a-form-item label="提示词" required>
          <a-textarea
            v-model:value="taskForm.prompt"
            :rows="4"
            placeholder="请输入任务提示词"
          />
        </a-form-item>
        <a-form-item label="调度类型" required>
          <a-select v-model:value="taskForm.schedule_type">
            <a-select-option value="once">单次执行</a-select-option>
            <a-select-option value="interval">定时执行</a-select-option>
            <a-select-option value="cron">Cron 表达式</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item v-if="taskForm.schedule_type === 'interval'" label="执行间隔（秒）">
          <a-input-number
            v-model:value="taskForm.interval_seconds"
            :min="60"
            style="width: 100%"
          />
        </a-form-item>
        <a-form-item v-if="taskForm.schedule_type === 'cron'" label="Cron 表达式">
          <a-input
            v-model:value="taskForm.cron_expression"
            placeholder="例如: 0 0 * * *"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { message } from 'ant-design-vue';
import { PlusOutlined } from '@ant-design/icons-vue';
import type { TableProps } from 'ant-design-vue';

interface Task {
  task_id: number;
  name: string;
  agent_id: string;
  prompt: string;
  schedule_type: string;
  enabled: boolean;
  created_time: string;
}

interface TaskForm {
  name: string;
  agent_id: string;
  prompt: string;
  schedule_type: string;
  interval_seconds?: number;
  cron_expression?: string;
}

const loading = ref(false);
const tasks = ref<Task[]>([]);
const createModalVisible = ref(false);
const taskForm = ref<TaskForm>({
  name: '',
  agent_id: '',
  prompt: '',
  schedule_type: 'once',
});

const pagination = ref({
  current: 1,
  pageSize: 20,
  total: 0,
});

const columns = [
  {
    title: 'ID',
    dataIndex: 'task_id',
    key: 'task_id',
    width: 80,
  },
  {
    title: '任务名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Agent ID',
    dataIndex: 'agent_id',
    key: 'agent_id',
  },
  {
    title: '调度类型',
    dataIndex: 'schedule_type',
    key: 'schedule_type',
    width: 120,
  },
  {
    title: '状态',
    dataIndex: 'enabled',
    key: 'enabled',
    width: 100,
  },
  {
    title: '创建时间',
    dataIndex: 'created_time',
    key: 'created_time',
    width: 180,
  },
  {
    title: '操作',
    key: 'actions',
    width: 280,
  },
];

onMounted(() => {
  loadTasks();
});

async function loadTasks() {
  loading.value = true;
  try {
    const response = await fetch(
      `/api/v1/hasn/app/tasks?page=${pagination.value.current}&page_size=${pagination.value.pageSize}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
    const result = await response.json();
    if (result.code === 200) {
      tasks.value = result.data.items || [];
      pagination.value.total = result.data.total || 0;
    }
  } catch (error) {
    message.error('加载任务列表失败');
  } finally {
    loading.value = false;
  }
}

function showCreateModal() {
  createModalVisible.value = true;
  taskForm.value = {
    name: '',
    agent_id: '',
    prompt: '',
    schedule_type: 'once',
  };
}

async function handleCreateTask() {
  try {
    const scheduleConfig: Record<string, unknown> = {};
    if (taskForm.value.schedule_type === 'interval') {
      scheduleConfig.interval_seconds = taskForm.value.interval_seconds;
    } else if (taskForm.value.schedule_type === 'cron') {
      scheduleConfig.cron_expression = taskForm.value.cron_expression;
    }

    const response = await fetch('/api/v1/hasn/app/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        name: taskForm.value.name,
        agent_id: taskForm.value.agent_id,
        prompt: taskForm.value.prompt,
        schedule_type: taskForm.value.schedule_type,
        schedule_config: scheduleConfig,
        enabled: true,
      }),
    });

    const result = await response.json();
    if (result.code === 200) {
      message.success('任务创建成功');
      createModalVisible.value = false;
      await loadTasks();
    } else {
      message.error(result.msg || '任务创建失败');
    }
  } catch (error) {
    message.error('任务创建失败');
  }
}

async function toggleTask(task: Task) {
  try {
    const endpoint = task.enabled ? 'disable' : 'enable';
    const response = await fetch(`/api/v1/hasn/app/tasks/${task.task_id}/${endpoint}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    const result = await response.json();
    if (result.code === 200) {
      message.success(`任务已${task.enabled ? '禁用' : '启用'}`);
      await loadTasks();
    } else {
      message.error(result.msg || '操作失败');
    }
  } catch (error) {
    message.error('操作失败');
  }
}

async function deleteTask(taskId: number) {
  try {
    const response = await fetch(`/api/v1/hasn/app/tasks/${taskId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    const result = await response.json();
    if (result.code === 200) {
      message.success('任务删除成功');
      await loadTasks();
    } else {
      message.error(result.msg || '删除失败');
    }
  } catch (error) {
    message.error('删除失败');
  }
}

function viewTask(task: Task) {
  message.info('查看任务详情功能待实现');
}

function editTask(task: Task) {
  message.info('编辑任务功能待实现');
}

function getScheduleTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    once: '单次',
    interval: '定时',
    cron: 'Cron',
  };
  return labels[type] || type;
}

function handleTableChange(pag: TableProps['pagination']) {
  if (pag) {
    pagination.value.current = pag.current || 1;
    pagination.value.pageSize = pag.pageSize || 20;
    loadTasks();
  }
}
</script>

<style scoped>
.task-management {
  padding: 24px;
}

.task-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.task-header h2 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
}
</style>
