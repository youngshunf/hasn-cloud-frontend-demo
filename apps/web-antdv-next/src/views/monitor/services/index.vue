<script lang="ts" setup>
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { ServiceHealthResult } from '#/api';

import { computed, ref } from 'vue';

import { Page } from '@vben/common-ui';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { getServicesHealthApi } from '#/api';

import { useColumns } from './data';

const rows = ref<ServiceHealthResult[]>([]);

const summary = computed(() => {
  const up = rows.value.filter((r) => r.status === 'up').length;
  const down = rows.value.filter((r) => r.status === 'down').length;
  const unconfigured = rows.value.filter(
    (r) => r.status === 'unconfigured',
  ).length;
  return { up, down, unconfigured, total: rows.value.length };
});

const gridOptions: VxeTableGridOptions<ServiceHealthResult> = {
  rowConfig: {
    keyField: 'name',
  },
  height: 'auto',
  exportConfig: {},
  toolbarConfig: {
    export: true,
    refresh: {
      code: 'query',
    },
    custom: true,
    zoom: true,
  },
  pagerConfig: {
    enabled: false,
  },
  columns: useColumns(),
  proxyConfig: {
    ajax: {
      query: async () => {
        const res = await getServicesHealthApi();
        rows.value = res;
        return res;
      },
    },
  },
};

const [Grid] = useVbenVxeGrid({ gridOptions });
</script>

<template>
  <Page auto-content-height>
    <Grid>
      <template #toolbar-actions>
        <div class="mr-1 flex items-center gap-4 pl-1 text-[1rem]">
          <span>
            运行中
            <span class="font-bold text-green-600">{{ summary.up }}</span>
          </span>
          <span>
            不可达
            <span class="font-bold text-red-600">{{ summary.down }}</span>
          </span>
          <span>
            未配置
            <span class="font-bold text-gray-500">{{
              summary.unconfigured
            }}</span>
          </span>
          <span class="text-gray-400">共 {{ summary.total }} 个内部服务</span>
        </div>
      </template>
    </Grid>
  </Page>
</template>
