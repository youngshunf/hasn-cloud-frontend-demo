<script lang="ts" setup>
import { computed, watch } from 'vue';

import { useAntdDesignTokens } from '@vben/hooks';
import { preferences, usePreferences } from '@vben/preferences';

import { App, ConfigProvider, theme } from 'antdv-next';

import { antdLocale } from '#/locales';

defineOptions({ name: 'App' });

const { isDark } = usePreferences();
const { tokens } = useAntdDesignTokens();

const tokenTheme = computed(() => {
  const algorithm = isDark.value
    ? [theme.darkAlgorithm]
    : [theme.defaultAlgorithm];

  // antd 紧凑模式算法
  if (preferences.app.compact) {
    algorithm.push(theme.compactAlgorithm);
  }

  return {
    algorithm,
    token: {
      ...tokens,
      // 唤星品牌色覆盖
      colorPrimary: '#6C5CE7', // 星紫
      colorInfo: '#6C5CE7',
      colorLink: '#00D2FF',    // 星蓝
      borderRadius: 8,
      fontFamily: "'Inter', 'PingFang SC', 'Microsoft YaHei', 'Noto Sans SC', sans-serif",
    },
  };
});

watch(
  tokenTheme,
  (themeConfig) => {
    ConfigProvider.config({ theme: themeConfig });
  },
  { immediate: true },
);
</script>

<template>
  <ConfigProvider :locale="antdLocale" :theme="tokenTheme">
    <App>
      <RouterView />
    </App>
  </ConfigProvider>
</template>
