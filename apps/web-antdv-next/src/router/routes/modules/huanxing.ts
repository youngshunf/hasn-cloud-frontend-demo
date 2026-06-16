import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    name: 'Huanxing',
    path: '/huanxing',
    meta: {
      title: '唤星管理',
      icon: 'mdi:star-shooting-outline',
      order: 0,
    },
    children: [
      // HuanxingServer / HuanxingUser 两页随云端 huanxing_server/huanxing_user
      // 两表（旧 sidecar 服务器/用户登记机制）于 2026-06-16 整体退役而删除。
      {
        name: 'HuanxingDocument',
        path: '/huanxing/document',
        component: () => import('#/views/huanxing/document/index.vue'),
        meta: {
          title: '文档管理',
          icon: 'mdi:file-document-outline',
        },
      },
      {
        name: 'HuanxingDocumentVersion',
        path: '/huanxing/document-version',
        component: () => import('#/views/huanxing/document-version/index.vue'),
        meta: {
          title: '文档版本',
          icon: 'mdi:source-branch',
        },
      },
      {
        name: 'HuanxingDocumentAutosave',
        path: '/huanxing/document-autosave',
        component: () => import('#/views/huanxing/document-autosave/index.vue'),
        meta: {
          title: '自动保存',
          icon: 'mdi:content-save-outline',
        },
      },
    ],
  },
];

export default routes;
