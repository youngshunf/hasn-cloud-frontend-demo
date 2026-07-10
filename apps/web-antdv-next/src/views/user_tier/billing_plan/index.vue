<script setup lang="ts">
import type { VbenFormProps } from '@vben/common-ui';
import type { OnActionClickParams, VxeTableGridOptions } from '#/adapter/vxe-table';
import type { BillingPlan } from '#/api/user_tier/billing_plan';

import { ref } from 'vue';

import { Page, useVbenModal, VbenButton } from '@vben/common-ui';
import { MaterialSymbolsAdd } from '@vben/icons';
import { $t } from '@vben/locales';

import { message } from 'antdv-next';

import { useVbenForm } from '#/adapter/form';
import { useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  getBillingPlanListApi,
  createBillingPlanApi,
  updateBillingPlanApi,
  deleteBillingPlanApi,
} from '#/api/user_tier/billing_plan';

import { querySchema, useColumns, formSchema } from './data';

defineOptions({
  name: 'BillingPlan',
});

const formOptions: VbenFormProps = {
  collapsed: true,
  showCollapseButton: true,
  submitButtonOptions: {
    content: $t('common.form.query'),
  },
  schema: querySchema,
};

const gridOptions: VxeTableGridOptions<BillingPlan> = {
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
        return await getBillingPlanListApi({
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

function onActionClick({ code, row }: OnActionClickParams<BillingPlan>) {
  switch (code) {
    case 'delete': {
      deleteBillingPlanApi(row.id).then(() => {
        message.success($t('ui.actionMessage.deleteSuccess', [row.plan_key]));
        onRefresh();
      });
      break;
    }
    case 'edit': {
      editId.value = row.id;
      editModalApi.setData(row).open();
      break;
    }
  }
}

/**
 * 结构化字段 → 提交体：组装 trial_json / grace_json / quota_json，并清理临时字段。
 */
function assembleJsonFields(data: any): any {
  const out = { ...data };
  out.trial_json = {
    enabled: Boolean(data.trial_enabled),
    days: data.trial_enabled ? Number(data.trial_days) || 0 : 0,
    times: data.trial_enabled ? (Number(data.trial_times) ?? 1) : 0,
  };
  const remindDays = String(data.grace_remind_days || '')
    .split(',')
    .map((s: string) => Number(s.trim()))
    .filter((n: number) => Number.isFinite(n) && n > 0);
  out.grace_json = {
    remind_days: remindDays,
    grace_days: Number(data.grace_days) || 0,
  };
  out.quota_json = parseQuota(data.quota_json);
  delete out.trial_enabled;
  delete out.trial_days;
  delete out.trial_times;
  delete out.grace_remind_days;
  delete out.grace_days;
  return out;
}

/**
 * 权威行 → 表单：拆解 trial_json / grace_json 为结构化字段，quota_json 转字符串。
 */
function explodeJsonFields(row: BillingPlan): Record<string, any> {
  const trial = row.trial_json || {};
  const grace = row.grace_json || {};
  const quota = row.quota_json || {};
  const remind = Array.isArray(grace.remind_days) ? grace.remind_days.join(',') : '';
  return {
    ...row,
    trial_enabled: Boolean(trial.enabled),
    trial_days: trial.days ?? null,
    trial_times: trial.times ?? 1,
    grace_remind_days: remind,
    grace_days: grace.grace_days ?? 0,
    quota_json: Object.keys(quota).length > 0 ? JSON.stringify(quota, null, 2) : '',
  };
}

function parseQuota(quotaStr: any): Record<string, any> {
  if (typeof quotaStr === 'object' && quotaStr) return quotaStr;
  if (typeof quotaStr === 'string' && quotaStr.trim()) {
    try {
      return JSON.parse(quotaStr);
    } catch {
      message.error('配额包快照 JSON 格式不正确');
      throw new Error('Invalid quota JSON');
    }
  }
  return {};
}

const editId = ref<number>(0);

const [EditForm, editFormApi] = useVbenForm({
  showDefaultActions: false,
  schema: formSchema,
});

const [editModal, editModalApi] = useVbenModal({
  destroyOnClose: true,
  async onConfirm() {
    const { valid } = await editFormApi.validate();
    if (valid) {
      editModalApi.lock();
      const raw = await editFormApi.getValues<any>();
      try {
        await updateBillingPlanApi(editId.value, assembleJsonFields(raw));
        message.success($t('ui.actionMessage.operationSuccess'));
        await editModalApi.close();
        onRefresh();
      } finally {
        editModalApi.unlock();
      }
    }
  },
  onOpenChange(isOpen: boolean) {
    if (isOpen) {
      const data = editModalApi.getData<BillingPlan>();
      editFormApi.resetForm();
      if (data) {
        editFormApi.setValues(explodeJsonFields(data));
      }
    }
  },
});

const [AddForm, addFormApi] = useVbenForm({
  showDefaultActions: false,
  schema: formSchema,
});

const [addModal, addModalApi] = useVbenModal({
  destroyOnClose: true,
  async onConfirm() {
    const { valid } = await addFormApi.validate();
    if (valid) {
      addModalApi.lock();
      const raw = await addFormApi.getValues<any>();
      try {
        await createBillingPlanApi(assembleJsonFields(raw));
        message.success($t('ui.actionMessage.operationSuccess'));
        await addModalApi.close();
        onRefresh();
      } finally {
        addModalApi.unlock();
      }
    }
  },
  onOpenChange(isOpen: boolean) {
    if (isOpen) {
      addFormApi.resetForm();
    }
  },
});
</script>

<template>
  <Page auto-content-height>
    <Grid>
      <template #toolbar-actions>
        <VbenButton @click="() => addModalApi.setData(null).open()">
          <MaterialSymbolsAdd class="size-5" />
          添加档位
        </VbenButton>
      </template>
    </Grid>
    <editModal :title="'编辑档位'" :fullscreen-button="false" class="w-[800px]">
      <EditForm />
    </editModal>
    <addModal :title="'添加档位'" :fullscreen-button="false" class="w-[800px]">
      <AddForm />
    </addModal>
  </Page>
</template>
