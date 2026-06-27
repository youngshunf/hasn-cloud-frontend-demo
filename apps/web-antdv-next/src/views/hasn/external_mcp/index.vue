<script setup lang="ts">
import type {
  OnActionClickParams,
  VxeTableGridOptions,
} from '#/adapter/vxe-table';
import type {
  ExternalMcpSystemServer,
  RegisterSystemServerParams,
  SetCredentialParams,
  SetServerQuotaParams,
} from '#/api/hasn/external_mcp';

import { ref } from 'vue';

import { Page, useVbenModal, VbenButton } from '@vben/common-ui';
import { MaterialSymbolsAdd } from '@vben/icons';

import { message, Modal, Tag } from 'antdv-next';

import { useVbenForm } from '#/adapter/form';
import { useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  deleteSystemServerApi,
  getSystemServerListApi,
  introspectSystemServerApi,
  registerSystemServerApi,
  revokePlatformCredentialApi,
  setPlatformCredentialApi,
  setSystemServerQuotaApi,
  setSystemServerStatusApi,
} from '#/api/hasn/external_mcp';

import {
  credentialFormSchema,
  quotaFormSchema,
  registerFormSchema,
  useColumns,
} from './data';

defineOptions({
  name: 'ExternalMcpAdmin',
});

/** Grid configuration（无查询表单：平台 server 量小，列表直出）。 */
const gridOptions: VxeTableGridOptions<ExternalMcpSystemServer> = {
  rowConfig: { keyField: 'mcp_id' },
  height: 'auto',
  toolbarConfig: {
    refresh: { code: 'query' },
    custom: true,
    zoom: true,
  },
  columns: useColumns(onActionClick),
  proxyConfig: {
    ajax: {
      query: async () => {
        return await getSystemServerListApi();
      },
    },
  },
};

const [Grid, gridApi] = useVbenVxeGrid({ gridOptions });

function onRefresh() {
  gridApi.query();
}

/** 当前操作行（凭据/配额弹层共享）。 */
const activeRow = ref<ExternalMcpSystemServer | null>(null);

function onActionClick({
  code,
  row,
}: OnActionClickParams<ExternalMcpSystemServer>) {
  switch (code) {
    case 'credential': {
      activeRow.value = row;
      credModalApi.open();
      break;
    }
    case 'delete': {
      Modal.confirm({
        title: '删除平台 MCP server',
        content: `将连带删除其平台 key 与所有分身绑定，不可恢复。确定删除「${row.display_name || row.name}」？`,
        okType: 'danger',
        okText: '删除',
        cancelText: '取消',
        onOk: async () => {
          await deleteSystemServerApi(row.mcp_id);
          message.success('已删除平台 MCP server');
          onRefresh();
        },
      });
      break;
    }
    case 'introspect': {
      introspectSystemServerApi(row.mcp_id).then(() => {
        message.success('已自省并刷新工具清单');
        onRefresh();
      });
      break;
    }
    case 'quota': {
      activeRow.value = row;
      quotaModalApi.open();
      break;
    }
    case 'revoke': {
      Modal.confirm({
        title: '撤销平台 key',
        content:
          '撤销后，所有分身对该 MCP 的调用将因缺少凭据在解析阶段软挡（提示重配）。确定撤销？',
        okType: 'danger',
        okText: '撤销',
        cancelText: '取消',
        onOk: async () => {
          await revokePlatformCredentialApi(row.mcp_id);
          message.success('已撤销平台 key');
          onRefresh();
        },
      });
      break;
    }
    case 'toggle': {
      const next = row.status === 'active' ? 'disabled' : 'active';
      setSystemServerStatusApi(row.mcp_id, next).then(() => {
        message.success(next === 'active' ? '已启用' : '已停用');
        onRefresh();
      });
      break;
    }
  }
}

/** 注册平台 server Modal。 */
const [RegisterForm, registerFormApi] = useVbenForm({
  showDefaultActions: false,
  schema: registerFormSchema,
});

const [registerModal, registerModalApi] = useVbenModal({
  destroyOnClose: true,
  async onConfirm() {
    const { valid } = await registerFormApi.validate();
    if (!valid) return;
    registerModalApi.lock();
    const data = await registerFormApi.getValues<RegisterSystemServerParams>();
    try {
      await registerSystemServerApi(data);
      message.success('已注册平台 MCP server');
      await registerModalApi.close();
      onRefresh();
    } finally {
      registerModalApi.unlock();
    }
  },
  onOpenChange(isOpen: boolean) {
    if (isOpen) registerFormApi.resetForm();
  },
});

/** 写入/轮换平台 key Modal。 */
const [CredForm, credFormApi] = useVbenForm({
  showDefaultActions: false,
  schema: credentialFormSchema,
});

const [credModal, credModalApi] = useVbenModal({
  destroyOnClose: true,
  async onConfirm() {
    const { valid } = await credFormApi.validate();
    if (!valid || !activeRow.value) return;
    credModalApi.lock();
    const data = await credFormApi.getValues<SetCredentialParams>();
    try {
      await setPlatformCredentialApi(activeRow.value.mcp_id, data);
      message.success('已写入 / 轮换平台 key');
      await credModalApi.close();
      onRefresh();
    } finally {
      credModalApi.unlock();
    }
  },
  onOpenChange(isOpen: boolean) {
    if (isOpen) credFormApi.resetForm();
  },
});

/** 配额/限流 Modal。 */
const [QuotaForm, quotaFormApi] = useVbenForm({
  showDefaultActions: false,
  schema: quotaFormSchema,
});

const [quotaModal, quotaModalApi] = useVbenModal({
  destroyOnClose: true,
  async onConfirm() {
    const { valid } = await quotaFormApi.validate();
    if (!valid || !activeRow.value) return;
    quotaModalApi.lock();
    const data = await quotaFormApi.getValues<SetServerQuotaParams>();
    try {
      await setSystemServerQuotaApi(activeRow.value.mcp_id, data);
      message.success('已更新 per-owner 配额 / 限流');
      await quotaModalApi.close();
      onRefresh();
    } finally {
      quotaModalApi.unlock();
    }
  },
  onOpenChange(isOpen: boolean) {
    if (isOpen && activeRow.value) {
      quotaFormApi.setValues({
        per_owner_daily_quota: activeRow.value.per_owner_daily_quota ?? 0,
        rate_limit_per_min: activeRow.value.rate_limit_per_min ?? 0,
      });
    }
  },
});

function toolsCount(row: ExternalMcpSystemServer): number {
  const cache = row.advertised_tools_cache;
  return Array.isArray(cache) ? cache.length : 0;
}
</script>

<template>
  <Page auto-content-height>
    <Grid>
      <template #toolbar-actions>
        <VbenButton @click="() => registerModalApi.open()">
          <MaterialSymbolsAdd class="size-5" />
          注册平台 MCP
        </VbenButton>
      </template>

      <!-- 展示名 + 不可达原因 -->
      <template #display_name="{ row }">
        <div class="flex flex-col">
          <span class="font-medium">{{ row.display_name || row.name }}</span>
          <span v-if="row.health_detail" class="text-xs text-red-500">
            {{ row.health_detail }}
          </span>
        </div>
      </template>

      <!-- 命名空间 hasn.ext.{name}.* -->
      <template #namespace="{ row }">
        <Tag color="purple">hasn.ext.{{ row.name }}.*</Tag>
      </template>

      <!-- 工具数 -->
      <template #tools_count="{ row }">
        {{ toolsCount(row) }}
      </template>

      <!-- per-owner 配额/限流 -->
      <template #quota="{ row }">
        <span
          v-if="row.per_owner_daily_quota > 0 || row.rate_limit_per_min > 0"
        >
          <template v-if="row.per_owner_daily_quota > 0">每日 {{ row.per_owner_daily_quota }}</template>
          <template v-if="row.rate_limit_per_min > 0">
            · 每分 {{ row.rate_limit_per_min }}</template>
        </span>
        <span v-else class="text-gray-400">不限</span>
      </template>
    </Grid>

    <registerModal
      title="注册 system-origin 平台 MCP server"
      :fullscreen-button="false"
      class="w-[640px]"
    >
      <RegisterForm />
    </registerModal>

    <credModal
      :title="`写入 / 轮换平台 key · ${activeRow?.display_name || activeRow?.name || ''}`"
      :fullscreen-button="false"
      class="w-[560px]"
    >
      <CredForm />
    </credModal>

    <quotaModal
      :title="`per-owner 配额 / 限流 · ${activeRow?.display_name || activeRow?.name || ''}`"
      :fullscreen-button="false"
      class="w-[560px]"
    >
      <QuotaForm />
    </quotaModal>
  </Page>
</template>
