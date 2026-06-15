import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    name: 'UserTier',
    path: '/user_tier',
    meta: {
      title: '订阅管理',
      icon: 'carbon:currency',
      order: 3,
    },
    children: [
      {
        name: 'UserSubscription',
        path: '/user_tier/user_subscription',
        component: () => import('#/views/user_tier/user_subscription/index.vue'),
        meta: {
          title: '用户订阅',
          icon: 'carbon:user-certification',
        },
      },
      {
        name: 'NewApiQuota',
        path: '/user_tier/newapi_quota',
        component: () => import('#/views/user_tier/newapi_quota/index.vue'),
        meta: {
          title: 'Token 额度管理',
          icon: 'carbon:meter-alt',
        },
      },
      {
        name: 'SubscriptionTier',
        path: '/user_tier/subscription_tier',
        component: () => import('#/views/user_tier/subscription_tier/index.vue'),
        meta: {
          title: '订阅等级配置',
          icon: 'carbon:upgrade',
        },
      },
      {
        name: 'CreditTransaction',
        path: '/user_tier/credit_transaction',
        component: () => import('#/views/user_tier/credit_transaction/index.vue'),
        meta: {
          title: '积分交易记录',
          icon: 'carbon:receipt',
        },
      },
      {
        name: 'UserCreditBalance',
        path: '/user_tier/user_credit_balance',
        component: () => import('#/views/user_tier/user_credit_balance/index.vue'),
        meta: {
          title: '积分余额',
          icon: 'carbon:wallet',
        },
      },
      {
        name: 'CreditPackage',
        path: '/user_tier/credit_package',
        component: () => import('#/views/user_tier/credit_package/index.vue'),
        meta: {
          title: '积分包',
          icon: 'carbon:shopping-bag',
        },
      },
    ],
  },
];

export default routes;
