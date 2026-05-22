import type { RouteRecordRaw } from 'vue-router';

import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    name: 'Hasn',
    path: '/hasn',
    meta: {
      title: $t('page.menu.hasn'),
      icon: 'mdi:star-four-points-outline',
      order: 1,
    },
    children: [
      {
        name: 'HasnTask',
        path: '/hasn/tasks',
        component: () => import('#/views/hasn/hasn_task/index.vue'),
        meta: {
          title: $t('page.menu.hasnTask'),
          icon: 'mdi:clipboard-text-clock-outline',
        },
      },
      {
        name: 'HasnTaskRun',
        path: '/hasn/task-runs',
        component: () => import('#/views/hasn/hasn_task_run/index.vue'),
        meta: {
          title: $t('page.menu.hasnTaskRun'),
          icon: 'mdi:progress-clock',
        },
      },
      {
        name: 'HasnSkillBundle',
        path: '/hasn/skill-bundles',
        component: () => import('#/views/hasn/hasn_skill_bundle/index.vue'),
        meta: {
          title: $t('page.menu.hasnSkillBundle'),
          icon: 'mdi:package-variant-closed',
        },
      },
    ],
  },
];

export default routes;
