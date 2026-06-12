<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import { message } from 'antdv-next';

interface Session {
  session_id: string;
  title: string;
  session_kind: string;
  session_status: string;
  last_message_at: string;
  created_time: string;
}

interface Filters {
  session_kind?: string;
  session_status?: string;
}

const router = useRouter();
const loading = ref(false);
const sessions = ref<Session[]>([]);
const selectedSessionId = ref<string>('');
const filters = ref<Filters>({});

const pagination = ref({
  current: 1,
  pageSize: 20,
  total: 0,
  onChange: (page: number) => {
    pagination.value.current = page;
    loadSessions();
  },
});

onMounted(() => {
  loadSessions();
});

async function loadSessions() {
  loading.value = true;
  try {
    const params = new URLSearchParams({
      page: String(pagination.value.current),
      page_size: String(pagination.value.pageSize),
    });

    if (filters.value.session_kind) {
      params.append('session_kind', filters.value.session_kind);
    }
    if (filters.value.session_status) {
      params.append('session_status', filters.value.session_status);
    }

    const response = await fetch(
      `/api/v1/hasn/app/sessions?${params.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
    );

    const result = await response.json();
    if (result.code === 200) {
      sessions.value = result.data.items || [];
      pagination.value.total = result.data.total || 0;
    } else {
      message.error(result.msg || '加载会话列表失败');
    }
  } catch {
    message.error('加载会话列表失败');
  } finally {
    loading.value = false;
  }
}

function selectSession(session: Session) {
  selectedSessionId.value = session.session_id;
}

function viewSession(session: Session) {
  router.push(`/tasks/sessions/${session.session_id}`);
}

function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    active: 'blue',
    completed: 'green',
    error: 'red',
    pending: 'orange',
  };
  return colors[status] || 'default';
}

function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    active: '活跃',
    completed: '完成',
    error: '错误',
    pending: '待处理',
  };
  return labels[status] || status;
}

function getKindLabel(kind: string): string {
  const labels: Record<string, string> = {
    task: '任务',
    interactive: '交互',
  };
  return labels[kind] || kind;
}

function formatTime(timestamp: string): string {
  if (!timestamp) return '-';
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now.getTime() - date.getTime();

  if (diff < 60_000) return '刚刚';
  if (diff < 3_600_000) return `${Math.floor(diff / 60_000)}分钟前`;
  if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)}小时前`;
  return date.toLocaleDateString();
}

function handlePageChange(page: number) {
  pagination.value.current = page;
  loadSessions();
}
</script>

<template>
  <div class="task-sessions">
    <div class="sessions-header">
      <h2>任务会话</h2>
      <a-space>
        <a-select
          v-model:value="filters.session_kind"
          placeholder="会话类型"
          style="width: 150px"
          allow-clear
          @change="loadSessions"
        >
          <a-select-option value="task">任务</a-select-option>
          <a-select-option value="interactive">交互</a-select-option>
        </a-select>
        <a-select
          v-model:value="filters.session_status"
          placeholder="会话状态"
          style="width: 150px"
          allow-clear
          @change="loadSessions"
        >
          <a-select-option value="active">活跃</a-select-option>
          <a-select-option value="completed">完成</a-select-option>
          <a-select-option value="error">错误</a-select-option>
        </a-select>
      </a-space>
    </div>

    <a-list
      :data-source="sessions"
      :loading="loading"
      :pagination="pagination"
      item-layout="horizontal"
      @change="handlePageChange"
    >
      <template #renderItem="{ item }">
        <a-list-item
          class="session-item"
          :class="{ active: selectedSessionId === item.session_id }"
          @click="selectSession(item)"
        >
          <a-list-item-meta>
            <template #title>
              <div class="session-title">
                {{ item.title || '未命名会话' }}
                <a-tag :color="getStatusColor(item.session_status)">
                  {{ getStatusLabel(item.session_status) }}
                </a-tag>
              </div>
            </template>
            <template #description>
              <div class="session-meta">
                <span>会话 ID: {{ item.session_id }}</span>
                <span>类型: {{ getKindLabel(item.session_kind) }}</span>
                <span>最后消息: {{ formatTime(item.last_message_at) }}</span>
              </div>
            </template>
          </a-list-item-meta>
          <template #actions>
            <a-button size="small" @click.stop="viewSession(item)">
              查看对话
            </a-button>
          </template>
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>

<style scoped>
.task-sessions {
  padding: 24px;
}

.sessions-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

.sessions-header h2 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
}

.session-item {
  cursor: pointer;
  transition: background-color 0.2s;
}

.session-item:hover {
  background-color: #f5f5f5;
}

.session-item.active {
  background-color: #e6f7ff;
}

.session-title {
  display: flex;
  gap: 8px;
  align-items: center;
}

.session-meta {
  display: flex;
  gap: 16px;
  font-size: 12px;
  color: #666;
}
</style>
