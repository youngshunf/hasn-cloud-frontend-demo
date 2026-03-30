<script setup lang="ts">
import type { VbenFormProps } from '@vben/common-ui';
import type {
  OnActionClickParams,
  VxeTableGridOptions,
} from '#/adapter/vxe-table';
import type { NewApiUserOverview, NewApiUserListParams, UsageSummary, UsageDetail } from '#/api/user_tier/newapi_quota';

import { ref, h } from 'vue';

import { Page, useVbenModal } from '@vben/common-ui';
import { $t } from '@vben/locales';

import { message, Table, Statistic, Row, Col } from 'antdv-next';

import { useVbenForm } from '#/adapter/form';
import { useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  getNewApiUserListApi,
  updateUserQuotaApi,
  getUserUsageSummaryApi,
  getUserUsageDetailApi,
} from '#/api/user_tier/newapi_quota';
import { querySchema, useColumns, quotaFormSchema } from './data';

defineOptions({
  name: 'NewApiQuota',
});

/**
 * Grid configuration
 */
const formOptions: VbenFormProps = {
  collapsed: true,
  showCollapseButton: true,
  submitButtonOptions: {
    content: $t('common.form.query'),
  },
  schema: querySchema,
};

const gridOptions: VxeTableGridOptions<NewApiUserOverview> = {
  rowConfig: {
    keyField: 'huanxing_user_id',
  },
  height: 'auto',
  toolbarConfig: {
    refresh: true,
    refreshOptions: {
      code: 'query',
    },
    custom: true,
    zoom: true,
  },
  columns: useColumns(onActionClick),
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues) => {
        const result = await getNewApiUserListApi({
          page: page.currentPage,
          size: page.pageSize,
          ...formValues,
        });
        return result;
      },
    },
  },
};

const [Grid, gridApi] = useVbenVxeGrid({ formOptions, gridOptions });

function onRefresh() {
  gridApi.query();
}

/**
 * Action handlers
 */
function onActionClick({ code, row }: OnActionClickParams<NewApiUserOverview>) {
  switch (code) {
    case 'copy_key': {
      copyToClipboard(row.newapi_token_key);
      break;
    }
    case 'edit_quota': {
      editUserId.value = row.huanxing_user_id;
      editModalApi.setData(row).open();
      break;
    }
    case 'view_usage': {
      usageUserId.value = row.huanxing_user_id;
      usageUserName.value = row.user_nickname || row.user_phone || `用户${row.huanxing_user_id}`;
      loadUsageData(row.huanxing_user_id);
      usageModalApi.open();
      break;
    }
  }
}

/**
 * Copy API Key
 */
async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    message.success('API Key 已复制到剪贴板');
  } catch {
    message.error('复制失败，请手动复制');
  }
}

/**
 * Edit Quota Modal
 */
const editUserId = ref<number>(0);

const [EditForm, editFormApi] = useVbenForm({
  showDefaultActions: false,
  schema: quotaFormSchema,
});

const [editModal, editModalApi] = useVbenModal({
  destroyOnClose: true,
  async onConfirm() {
    const { valid } = await editFormApi.validate();
    if (valid) {
      editModalApi.lock();
      const data = await editFormApi.getValues<{ new_quota: number }>();
      try {
        await updateUserQuotaApi(editUserId.value, data.new_quota);
        message.success('额度修改成功');
        await editModalApi.close();
        onRefresh();
      } finally {
        editModalApi.unlock();
      }
    }
  },
  onOpenChange(isOpen: boolean) {
    if (isOpen) {
      const data = editModalApi.getData<NewApiUserOverview>();
      editFormApi.resetForm();
      if (data) {
        editFormApi.setValues({ new_quota: data.total_quota });
      }
    }
  },
});

/**
 * Usage Detail Modal
 */
const usageUserId = ref<number>(0);
const usageUserName = ref<string>('');
const usageSummary = ref<UsageSummary | null>(null);
const usageDetail = ref<UsageDetail | null>(null);
const usageLoading = ref(false);

const usageColumns = [
  { title: '模型', dataIndex: 'model_name', key: 'model_name' },
  { title: '输入 tokens', dataIndex: 'prompt_tokens', key: 'prompt_tokens' },
  { title: '输出 tokens', dataIndex: 'completion_tokens', key: 'completion_tokens' },
  { title: '消耗额度', dataIndex: 'quota', key: 'quota' },
  { title: '请求次数', dataIndex: 'request_count', key: 'request_count' },
];

const [usageModal, usageModalApi] = useVbenModal({
  destroyOnClose: true,
});

async function loadUsageData(userId: number) {
  usageLoading.value = true;
  try {
    const [summary, detail] = await Promise.all([
      getUserUsageSummaryApi(userId),
      getUserUsageDetailApi(userId, { limit: 20 }),
    ]);
    usageSummary.value = summary;
    usageDetail.value = detail;
  } catch (e: any) {
    message.error(e?.msg || '加载用量数据失败');
  } finally {
    usageLoading.value = false;
  }
}
</script>

<template>
  <Page auto-content-height>
    <Grid>
      <template #toolbar-actions>
        <span class="text-sm text-gray-500">管理员可查看和编辑所有用户的 API Token 与额度</span>
      </template>
    </Grid>

    <!-- 编辑额度弹窗 -->
    <editModal :title="'编辑额度'" :fullscreen-button="false" class="w-[500px]">
      <EditForm />
    </editModal>

    <!-- 用量详情弹窗 -->
    <usageModal :title="`${usageUserName} — 用量详情（近30天）`" :fullscreen-button="false" class="w-[900px]" :footer="false">
      <div v-if="usageLoading" class="py-10 text-center text-gray-400">加载中...</div>
      <div v-else-if="usageSummary">
        <Row :gutter="16" class="mb-4">
          <Col :span="6">
            <Statistic title="总请求次数" :value="usageSummary.total_requests" />
          </Col>
          <Col :span="6">
            <Statistic title="总输入 tokens" :value="usageSummary.total_prompt_tokens" />
          </Col>
          <Col :span="6">
            <Statistic title="总输出 tokens" :value="usageSummary.total_completion_tokens" />
          </Col>
          <Col :span="6">
            <Statistic title="总消耗额度" :value="usageSummary.total_quota" />
          </Col>
        </Row>
        <h4 class="mb-2 font-medium">按模型分组</h4>
        <Table
          :columns="usageColumns"
          :dataSource="usageSummary.items"
          :pagination="false"
          size="small"
          rowKey="model_name"
        />
      </div>
      <div v-else class="py-10 text-center text-gray-400">暂无用量数据</div>
    </usageModal>
  </Page>
</template>
