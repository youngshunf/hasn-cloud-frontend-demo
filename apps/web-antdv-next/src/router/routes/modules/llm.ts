import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    name: 'Llm',
    path: '/llm',
    meta: {
      title: 'LLM 管理',
      icon: 'carbon:machine-learning-model',
      order: 2,
    },
    children: [
      {
        name: 'LlmApiKey',
        path: '/llm/api-key',
        component: () => import('#/views/llm/api-key/index.vue'),
        meta: {
          title: 'API Key 管理',
          icon: 'carbon:password',
        },
      },
    ],
  },
];

export default routes;
