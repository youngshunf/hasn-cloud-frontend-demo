<script setup lang="ts">
import type { VbenFormProps } from '@vben/common-ui';

import type {
  OnActionClickParams,
  VxeTableGridOptions,
} from '#/adapter/vxe-table';
import type {
  HasnModelRegistry,
  ModelRegistrySyncReport,
  PatchModelAnnotationParams,
} from '#/api/hasn/hasn_model_registry';

import { ref } from 'vue';

import { Page, useVbenModal, VbenButton } from '@vben/common-ui';
import { $t } from '@vben/locales';

import { message } from 'antdv-next';

import { useVbenForm } from '#/adapter/form';
import { useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  getModelRegistryListApi,
  patchModelAnnotationApi,
  syncModelRegistryApi,
} from '#/api/hasn/hasn_model_registry';

import { annotationFormSchema, querySchema, useColumns } from './data';

defineOptions({
  name: 'HasnModelRegistry',
});

/** 上一轮同步的真实结果（没同步过就不显示，绝不摆一份看起来同步过的假数字）。 */
const lastReport = ref<ModelRegistrySyncReport | null>(null);
const syncing = ref(false);
/** 正在标注的那一行。 */
const editing = ref<HasnModelRegistry | null>(null);

const formOptions: VbenFormProps = {
  collapsed: false,
  showCollapseButton: false,
  submitButtonOptions: { content: $t('common.form.query') },
  schema: querySchema,
};

const gridOptions: VxeTableGridOptions<HasnModelRegistry> = {
  rowConfig: { keyField: 'id' },
  height: 'auto',
  toolbarConfig: {
    custom: true,
    refresh: { code: 'query' },
    zoom: true,
  },
  columns: useColumns(onActionClick),
  // 两类需要运营处理的行高亮：待标注（不下发，漏标等于白买）与网关上已消失。
  rowClassName: ({ row }: { row: HasnModelRegistry }) => {
    if (row.upstream_status === 'missing') {
      return 'model-registry-row--missing';
    }
    return row.capability === 'unclassified'
      ? 'model-registry-row--unclassified'
      : '';
  },
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues) => {
        return await getModelRegistryListApi({
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

/** 立即从网关同步。失败如实弹错——绝不吞成「同步成功、0 个模型」。 */
async function onSync() {
  syncing.value = true;
  try {
    const report = await syncModelRegistryApi();
    lastReport.value = report;
    message.success(
      `同步完成：网关 ${report.upstream_total} 个模型，新增 ${report.created}、更新 ${report.updated}、消失 ${report.missing}`,
    );
    onRefresh();
  } finally {
    syncing.value = false;
  }
}

function onActionClick({ code, row }: OnActionClickParams<HasnModelRegistry>) {
  if (code === 'annotate') {
    editing.value = row;
    annotationModalApi.open();
  }
}

const [AnnotationForm, annotationFormApi] = useVbenForm({
  showDefaultActions: false,
  layout: 'vertical',
  wrapperClass: 'grid-cols-1 md:grid-cols-2',
  schema: annotationFormSchema,
});

/** 把 `inputs` 表拆成表单里的三个固定项 + 其余键的 JSON。 */
function splitInputs(inputs: Record<string, string> | undefined) {
  const table = inputs ?? {};
  const extra: Record<string, string> = {};
  for (const [key, value] of Object.entries(table)) {
    if (!['audio', 'image', 'last_frame'].includes(key)) {
      extra[key] = value;
    }
  }
  return {
    input_audio: table.audio ?? 'unsupported',
    input_image: table.image ?? 'unsupported',
    input_last_frame: table.last_frame ?? 'unsupported',
    inputs_extra: Object.keys(extra).length > 0 ? JSON.stringify(extra) : '',
  };
}

/** 把表单值合回 `inputs` 表；`unsupported` 不写进去（省略即不支持）。 */
function mergeInputs(values: Record<string, any>): Record<string, string> {
  const merged: Record<string, string> = {};
  const fixed: Array<[string, string]> = [
    ['image', values.input_image],
    ['audio', values.input_audio],
    ['last_frame', values.input_last_frame],
  ];
  for (const [key, requirement] of fixed) {
    if (requirement && requirement !== 'unsupported') {
      merged[key] = requirement;
    }
  }
  const extraText = String(values.inputs_extra ?? '').trim();
  if (extraText.length > 0) {
    // 解析失败就抛给调用方弹错——绝不静默丢掉运营刚填的内容。
    const parsed = JSON.parse(extraText);
    for (const [key, requirement] of Object.entries(parsed)) {
      if (typeof requirement === 'string' && requirement !== 'unsupported') {
        merged[key] = requirement;
      }
    }
  }
  return merged;
}

/** 采纳系统给的能力建议值（只是填进表单，仍要点保存才生效）。 */
function adoptSuggestion() {
  const suggested = editing.value?.suggested_capability;
  if (suggested) {
    annotationFormApi.setValues({ capability: suggested });
  }
}

const [annotationModal, annotationModalApi] = useVbenModal({
  destroyOnClose: true,
  async onConfirm() {
    const { valid } = await annotationFormApi.validate();
    if (!valid || !editing.value) {
      return;
    }
    annotationModalApi.lock();
    try {
      const values = await annotationFormApi.getValues<Record<string, any>>();
      let inputs: Record<string, string>;
      try {
        inputs = mergeInputs(values);
      } catch {
        message.error('「其它输入要求」不是合法 JSON 对象，请检查后再保存');
        return;
      }
      const payload: PatchModelAnnotationParams = {
        agent_visible: Boolean(values.agent_visible),
        capability: values.capability,
        cost_tier_override: values.cost_tier_override ?? '',
        dialect: values.dialect ?? '',
        inputs,
        quality: values.quality ?? '',
        scenario: values.scenario ?? '',
        sort_order: Number(values.sort_order ?? 0),
      };
      await patchModelAnnotationApi(editing.value.id, payload);
      message.success(`已保存 ${editing.value.model_name} 的标注`);
      await annotationModalApi.close();
      onRefresh();
    } finally {
      annotationModalApi.unlock();
    }
  },
  onOpenChange(isOpen: boolean) {
    if (!isOpen || !editing.value) {
      return;
    }
    const row = editing.value;
    annotationFormApi.setValues({
      agent_visible: row.agent_visible,
      capability: row.capability,
      cost_tier_override: row.cost_tier_override ?? undefined,
      dialect: row.dialect ?? undefined,
      quality: row.quality ?? undefined,
      scenario: row.scenario ?? '',
      sort_order: row.sort_order,
      ...splitInputs(row.inputs),
    });
  },
});
</script>

<template>
  <Page auto-content-height>
    <Grid>
      <template #toolbar-actions>
        <VbenButton :loading="syncing" @click="onSync">
          立即从网关同步
        </VbenButton>
        <span v-if="lastReport" class="text-muted-foreground ml-3 text-sm">
          上轮：网关 {{ lastReport.upstream_total }} 个 · 新增
          {{ lastReport.created }} · 更新 {{ lastReport.updated }} · 消失
          {{ lastReport.missing }} · 待标注 {{ lastReport.unclassified }}
        </span>
      </template>
    </Grid>
    <annotationModal
      :title="`标注 ${editing?.model_name ?? ''}`"
      :fullscreen-button="false"
      class="w-[860px]"
    >
      <div class="mb-3 text-sm">
        <span class="text-muted-foreground">
          系统建议能力类别：{{ editing?.suggested_capability }}
        </span>
        <VbenButton size="sm" variant="link" @click="adoptSuggestion">
          采纳
        </VbenButton>
      </div>
      <AnnotationForm />
    </annotationModal>
  </Page>
</template>

<style scoped>
/* 待标注：未标注就不下发给分身，漏标等于这个模型白买了 */
:deep(.model-registry-row--unclassified) {
  background-color: rgb(250 173 20 / 12%);
}

/* 网关上已消失：行仍保留（人工标注不丢），但不参与下发 */
:deep(.model-registry-row--missing) {
  background-color: rgb(255 77 79 / 12%);
}
</style>
