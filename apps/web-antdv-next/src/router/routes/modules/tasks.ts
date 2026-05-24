import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'lucide:list-checks',
      order: 10,
      title: '任务',
    },
    name: 'Tasks',
    path: '/tasks',
    children: [
      {
        name: 'TaskManagement',
        path: '/tasks/management',
        component: () => import('#/views/hasn/hasn_task/TaskManagement.vue'),
        meta: {
          icon: 'lucide:settings',
          title: '任务管理',
        },
      },
      {
        name: 'TaskSessions',
        path: '/tasks/sessions',
        component: () => import('#/views/hasn/hasn_task/TaskSessions.vue'),
        meta: {
          icon: 'lucide:message-square',
          title: '任务会话',
        },
      },
      {
        name: 'AgentChat',
        path: '/tasks/sessions/:sessionId',
        component: () => import('#/views/hasn/hasn_task/AgentChat.vue'),
        meta: {
          hideInMenu: true,
          title: 'Agent 对话',
        },
      },
    ],
  },
];

export default routes;
