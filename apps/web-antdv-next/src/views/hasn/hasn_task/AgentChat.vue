<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { ArrowLeftOutlined } from '@ant-design/icons-vue';
import { message } from 'antdv-next';

interface Message {
  message_id: string;
  role: string;
  content_text: string;
  created_at: string;
}

const route = useRoute();
const router = useRouter();
const sessionId = route.params.sessionId as string;

const loading = ref(false);
const sending = ref(false);
const messages = ref<Message[]>([]);
const inputMessage = ref('');
const sessionTitle = ref('Agent 对话');
const sessionStatus = ref('active');
const streamingMessage = ref('');
const messagesContainer = ref<HTMLElement>();

let ws: null | WebSocket = null;

onMounted(() => {
  loadMessages();
  connectWebSocket();
});

onUnmounted(() => {
  disconnectWebSocket();
});

async function loadMessages() {
  loading.value = true;
  try {
    const response = await fetch(
      `/api/v1/hasn/app/sessions/${sessionId}/messages`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
    );

    const result = await response.json();
    if (result.code === 200) {
      messages.value = result.data.items || [];
      await nextTick();
      scrollToBottom();
    } else {
      message.error(result.msg || '加载消息失败');
    }
  } catch {
    message.error('加载消息失败');
  } finally {
    loading.value = false;
  }
}

function connectWebSocket() {
  const token = localStorage.getItem('token');
  const wsUrl = `ws://localhost:8021/ws?token=${token}`;

  ws = new WebSocket(wsUrl);

  ws.addEventListener('open', () => {
    console.warn('WebSocket connected');
  });

  ws.addEventListener('message', (event) => {
    try {
      const data = JSON.parse(event.data);
      handleWebSocketMessage(data);
    } catch (error) {
      console.error('Failed to parse WebSocket message:', error);
    }
  });

  ws.addEventListener('error', (error) => {
    console.error('WebSocket error:', error);
    message.error('WebSocket 连接错误');
  });

  ws.addEventListener('close', () => {
    console.warn('WebSocket disconnected');
  });
}

function disconnectWebSocket() {
  if (ws) {
    ws.close();
    ws = null;
  }
}

function handleWebSocketMessage(data: Record<string, unknown>) {
  const eventType = data.type as string;

  if (data.session_id !== sessionId) {
    return;
  }

  switch (eventType) {
    case 'session_event': {
      console.warn('Session event:', data);
      break;
    }

    case 'session_message_chunk': {
      if (data.chunk_index === 0) {
        streamingMessage.value = data.chunk_text as string;
      } else {
        streamingMessage.value += data.chunk_text as string;
      }
      nextTick(() => scrollToBottom());
      break;
    }

    case 'session_message_received': {
      messages.value.push({
        message_id: data.message_id as string,
        role: data.role as string,
        content_text: data.content_text as string,
        created_at: data.created_at as string,
      });
      streamingMessage.value = '';
      nextTick(() => scrollToBottom());
      break;
    }

    case 'session_status_changed': {
      sessionStatus.value = data.status as string;
      if (data.message) {
        message.info(data.message as string);
      }
      break;
    }
  }
}

async function sendMessage() {
  if (!inputMessage.value.trim() || sending.value) {
    return;
  }

  sending.value = true;
  const messageText = inputMessage.value;
  inputMessage.value = '';

  try {
    const response = await fetch(
      `/api/v1/hasn/app/sessions/${sessionId}/messages`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          content_text: messageText,
        }),
      },
    );

    const result = await response.json();
    if (result.code === 200) {
      messages.value.push({
        message_id: result.data.message_id,
        role: 'user',
        content_text: messageText,
        created_at: new Date().toISOString(),
      });
      await nextTick();
      scrollToBottom();
    } else {
      message.error(result.msg || '发送消息失败');
      inputMessage.value = messageText;
    }
  } catch {
    message.error('发送消息失败');
    inputMessage.value = messageText;
  } finally {
    sending.value = false;
  }
}

function scrollToBottom() {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
  }
}

function goBack() {
  router.back();
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

function getRoleLabel(role: string): string {
  const labels: Record<string, string> = {
    user: '用户',
    assistant: 'Agent',
    system: '系统',
  };
  return labels[role] || role;
}

function formatTime(timestamp: string): string {
  if (!timestamp) return '';
  const date = new Date(timestamp);
  return date.toLocaleTimeString('zh-CN', {
    hour: '2-digit',
    minute: '2-digit',
  });
}
</script>

<template>
  <div class="agent-chat">
    <div class="chat-header">
      <a-button type="text" @click="goBack">
        <template #icon>
          <ArrowLeftOutlined />
        </template>
      </a-button>
      <div class="header-info">
        <h3>{{ sessionTitle }}</h3>
        <a-tag :color="getStatusColor(sessionStatus)">
          {{ getStatusLabel(sessionStatus) }}
        </a-tag>
      </div>
    </div>

    <div ref="messagesContainer" class="messages-container">
      <div v-for="msg in messages" :key="msg.message_id" class="message-item">
        <div class="message-bubble" :class="[msg.role]">
          <div class="message-role">{{ getRoleLabel(msg.role) }}</div>
          <div class="message-content">{{ msg.content_text }}</div>
          <div class="message-time">{{ formatTime(msg.created_at) }}</div>
        </div>
      </div>

      <div v-if="streamingMessage" class="message-item">
        <div class="message-bubble assistant streaming">
          <div class="message-role">Agent</div>
          <div class="message-content">{{ streamingMessage }}</div>
          <div class="message-time">正在输入...</div>
        </div>
      </div>

      <div v-if="loading && messages.length === 0" class="loading-placeholder">
        <a-spin />
        <span>加载消息中...</span>
      </div>
    </div>

    <div class="input-container">
      <a-textarea
        v-model:value="inputMessage"
        :rows="3"
        placeholder="输入消息..."
        :disabled="sending || sessionStatus !== 'active'"
        @keydown.enter.ctrl="sendMessage"
      />
      <a-button
        type="primary"
        :loading="sending"
        :disabled="!inputMessage.trim() || sessionStatus !== 'active'"
        @click="sendMessage"
      >
        发送 (Ctrl+Enter)
      </a-button>
    </div>
  </div>
</template>

<style scoped>
.agent-chat {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f5f5f5;
}

.chat-header {
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 16px 24px;
  background-color: #fff;
  border-bottom: 1px solid #e8e8e8;
}

.header-info {
  display: flex;
  gap: 12px;
  align-items: center;
}

.header-info h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
}

.messages-container {
  flex: 1;
  padding: 24px;
  overflow-y: auto;
}

.message-item {
  margin-bottom: 16px;
}

.message-bubble {
  max-width: 70%;
  padding: 12px 16px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgb(0 0 0 / 10%);
}

.message-bubble.user {
  margin-left: auto;
  color: #fff;
  background-color: #1890ff;
}

.message-bubble.assistant {
  margin-right: auto;
}

.message-bubble.streaming {
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.8;
  }
}

.message-role {
  margin-bottom: 4px;
  font-size: 12px;
  font-weight: 600;
  opacity: 0.8;
}

.message-content {
  font-size: 14px;
  line-height: 1.6;
  overflow-wrap: break-word;
  white-space: pre-wrap;
}

.message-time {
  margin-top: 4px;
  font-size: 11px;
  opacity: 0.6;
}

.loading-placeholder {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  justify-content: center;
  padding: 48px;
  color: #999;
}

.input-container {
  display: flex;
  gap: 12px;
  padding: 16px 24px;
  background-color: #fff;
  border-top: 1px solid #e8e8e8;
}

.input-container :deep(.ant-input) {
  resize: none;
}
</style>
