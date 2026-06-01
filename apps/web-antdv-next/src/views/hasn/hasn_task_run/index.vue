<script setup lang="ts">
import type { VbenFormProps } from '@vben/common-ui';

import type {
  OnActionClickParams,
  VxeTableGridOptions,
} from '#/adapter/vxe-table';
import type {
  HasnTaskRun,
  HasnTaskRunCreateParams,
} from '#/api/hasn/hasn_task_run';

import { computed, ref } from 'vue';

import {
  confirm,
  JsonViewer,
  Page,
  useVbenDrawer,
  useVbenModal,
  VbenButton,
} from '@vben/common-ui';
import { MaterialSymbolsAdd } from '@vben/icons';
import { $t } from '@vben/locales';

import { message } from 'antdv-next';

import { useVbenForm } from '#/adapter/form';
import { useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  createHasnTaskRunApi,
  deleteHasnTaskRunApi,
  getHasnTaskRunListApi,
  updateHasnTaskRunApi,
} from '#/api/hasn/hasn_task_run';

import { formSchema, querySchema, useColumns } from './data';

defineOptions({
  name: 'HasnTaskRun',
});

type HasnTaskRunFormValues = HasnTaskRunCreateParams & { id?: number };

function stringifyJsonFields<T extends Record<string, any>>(data: T): T {
  return {
    ...data,
    token_usage:
      data.token_usage === undefined
        ? undefined
        : JSON.stringify(data.token_usage, null, 2),
  };
}

function parseJsonSafe(value: unknown): unknown {
  if (!value) return null;
  if (typeof value === 'object') return value;
  try {
    return JSON.parse(String(value));
  } catch {
    return value;
  }
}

const formOptions: VbenFormProps = {
  collapsed: true,
  showCollapseButton: true,
  submitButtonOptions: {
    content: $t('common.form.query'),
  },
  schema: querySchema,
};

function onActionClick({ code, row }: OnActionClickParams<HasnTaskRun>) {
  switch (code) {
    case 'details': {
      taskRunDetails.value = row;
      drawerApi.open();
      break;
    }
    case 'delete': {
      confirm({
        icon: 'warning',
        content: '确认删除此执行记录吗？',
      }).then(async () => {
        await deleteHasnTaskRunApi(row.id);
        message.success($t('ui.actionMessage.deleteSuccess', [row.id]));
        onRefresh();
      });
      break;
    }
    case 'edit': {
      formData.value = row;
      modalApi.setData(row).open();
      break;
    }
  }
}

const gridOptions: VxeTableGridOptions<HasnTaskRun> = {
  rowConfig: {
    keyField: 'id',
  },
  checkboxConfig: {
    highlight: true,
  },
  height: 'auto',
  exportConfig: {},
  printConfig: {},
  toolbarConfig: {
    export: true,
    print: true,
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
        return await getHasnTaskRunListApi({
          page: page.currentPage,
          size: page.pageSize,
          ...formValues,
        });
      },
    },
  },
};

const [Grid, gridApi] = useVbenVxeGrid({ formOptions, gridOptions });

function onRefresh() {
  gridApi.query();
}

const [Form, formApi] = useVbenForm({
  showDefaultActions: false,
  wrapperClass: 'grid-cols-1 md:grid-cols-2',
  schema: formSchema,
});

const formData = ref<HasnTaskRunFormValues>();
const taskRunDetails = ref<HasnTaskRun>();

const [Drawer, drawerApi] = useVbenDrawer({
  destroyOnClose: true,
  footer: false,
  class: 'w-2/5',
});

const modalTitle = computed(() => {
  return formData.value?.id
    ? $t('ui.actionTitle.edit', ['执行记录'])
    : $t('ui.actionTitle.create', ['执行记录']);
});

const [Modal, modalApi] = useVbenModal({
  destroyOnClose: true,
  async onConfirm() {
    const { valid } = await formApi.validate();
    if (valid) {
      modalApi.lock();
      const data = await formApi.getValues<HasnTaskRunCreateParams>();
      try {
        await (formData.value?.id
          ? updateHasnTaskRunApi(formData.value.id, data)
          : createHasnTaskRunApi(data));
        message.success($t('ui.actionMessage.operationSuccess'));
        await modalApi.close();
        onRefresh();
      } finally {
        modalApi.unlock();
      }
    }
  },
  onOpenChange(isOpen: boolean) {
    if (isOpen) {
      formApi.resetForm();
      const data = modalApi.getData<HasnTaskRunFormValues>();
      formData.value = data;
      formApi.setValues(
        data
          ? stringifyJsonFields(data)
          : {
              status: 'pending',
            },
      );
    }
  },
});

const taskRunDescItems = computed(() => {
  const d = taskRunDetails.value;
  return [
    { key: 'id', label: '执行记录 ID', content: d?.id },
    { key: 'task_id', label: '任务 ID', content: d?.task_id },
    { key: 'agent_id', label: '执行 Agent', content: d?.agent_id, span: 2 },
    {
      key: 'runtime_node_id',
      label: '运行节点',
      content: d?.runtime_node_id || 'N/A',
      span: 2,
    },
    { key: 'status', label: '状态' },
    { key: 'started_at', label: '开始时间', content: d?.started_at || 'N/A' },
    { key: 'finished_at', label: '完成时间', content: d?.finished_at || 'N/A' },
    { key: 'duration_ms', label: '耗时' },
    { key: 'model', label: '模型', content: d?.model || 'N/A' },
    { key: 'prompt_snapshot', label: 'Prompt 快照', span: 2 },
    { key: 'output', label: '最终输出', span: 2 },
    { key: 'error', label: '错误信息', span: 2 },
    { key: 'token_usage', label: 'Token 消耗', span: 2 },
    { key: 'created_time', label: '创建时间', content: d?.created_time },
    {
      key: 'updated_time',
      label: '更新时间',
      content: d?.updated_time || 'N/A',
    },
  ];
});
</script>

<template>
  <Page auto-content-height>
    <Grid>
      <template #toolbar-actions>
        <VbenButton @click="() => modalApi.setData(null).open()">
          <MaterialSymbolsAdd class="size-5" />
          添加
        </VbenButton>
      </template>
    </Grid>
    <Modal :title="modalTitle" :fullscreen-button="false" class="w-[960px]">
      <Form />
    </Modal>
    <Drawer title="任务执行记录详情">
      <a-descriptions
        :styles="{ label: { color: '#6b7280' } }"
        class="ml-1"
        :column="2"
        :items="taskRunDescItems"
      >
        <template #contentRender="{ item }">
          <template v-if="item.key === 'status'">
            <a-tag v-if="taskRunDetails?.status === 'success'" color="success">
              成功
            </a-tag>
            <a-tag v-else-if="taskRunDetails?.status === 'error'" color="error">
              失败
            </a-tag>
            <a-tag
              v-else-if="taskRunDetails?.status === 'pending'"
              color="processing"
            >
              待执行
            </a-tag>
            <a-tag
              v-else-if="taskRunDetails?.status === 'running'"
              color="processing"
            >
              执行中
            </a-tag>
            <a-tag
              v-else-if="taskRunDetails?.status === 'timeout'"
              color="warning"
            >
              超时
            </a-tag>
            <a-tag v-else color="default">
              {{ taskRunDetails?.status || 'N/A' }}
            </a-tag>
          </template>
          <template v-else-if="item.key === 'duration_ms'">
            <span v-if="taskRunDetails?.duration_ms !== undefined">
              {{ taskRunDetails.duration_ms }} ms
            </span>
            <span v-else>N/A</span>
          </template>
          <template v-else-if="item.key === 'prompt_snapshot'">
            <div
              v-if="taskRunDetails?.prompt_snapshot"
              class="whitespace-pre-wrap"
            >
              {{ taskRunDetails.prompt_snapshot }}
            </div>
            <span v-else>无</span>
          </template>
          <template v-else-if="item.key === 'output'">
            <div v-if="taskRunDetails?.output" class="whitespace-pre-wrap">
              {{ taskRunDetails.output }}
            </div>
            <span v-else>无</span>
          </template>
          <template v-else-if="item.key === 'error'">
            <div
              v-if="taskRunDetails?.error"
              class="whitespace-pre-wrap text-red-500"
            >
              {{ taskRunDetails.error }}
            </div>
            <span v-else>无</span>
          </template>
          <template v-else-if="item.key === 'token_usage'">
            <JsonViewer
              v-if="taskRunDetails?.token_usage"
              class="mr-8 w-full"
              :value="parseJsonSafe(taskRunDetails.token_usage)"
              :copyable="!!taskRunDetails?.token_usage"
              boxed
              expanded
              :expand-depth="3"
              :show-array-index="false"
              @copied="message.success('已复制 Token 消耗')"
            />
            <span v-else>无</span>
          </template>
        </template>
      </a-descriptions>
    </Drawer>
  </Page>
</template>
