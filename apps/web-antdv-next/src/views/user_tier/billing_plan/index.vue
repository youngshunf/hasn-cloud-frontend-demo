<script setup lang="ts">
import type { VbenFormProps } from '@vben/common-ui';

import type { StorageQuotaUnit } from './storageQuota';

import type {
  OnActionClickParams,
  VxeTableGridOptions,
} from '#/adapter/vxe-table';
import type { BillingPlan } from '#/api/user_tier/billing_plan';

import { ref } from 'vue';

import { Page, useVbenModal, VbenButton } from '@vben/common-ui';
import { MaterialSymbolsAdd } from '@vben/icons';
import { $t } from '@vben/locales';

import { message } from 'antdv-next';

import { useVbenForm } from '#/adapter/form';
import { useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  createBillingPlanApi,
  deleteBillingPlanApi,
  getBillingPlanListApi,
  updateBillingPlanApi,
} from '#/api/user_tier/billing_plan';

import { formSchema, querySchema, useColumns } from './data';
import { bytesToStorageInput, storageInputToBytes } from './storageQuota';

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
 * 结构化字段 → 提交体：组装试用、宽限与存储权益，并清理临时字段。
 */
function assembleJsonFields(data: any): any {
  const {
    grace_days: graceDays,
    grace_remind_days: graceRemindDays,
    quota_json: rawQuota,
    storage_quota_unit: storageQuotaUnit,
    storage_quota_value: storageQuotaValue,
    trial_days: trialDays,
    trial_enabled: trialEnabled,
    trial_times: trialTimes,
    ...base
  } = data;
  const remindDays = String(graceRemindDays || '')
    .split(',')
    .map((s: string) => Number(s.trim()))
    .filter((n: number) => Number.isFinite(n) && n > 0);
  const quota = Object.fromEntries(
    Object.entries(parseQuota(rawQuota)).filter(
      ([key]) => key !== 'storage_bytes',
    ),
  );
  if (base.offering_key === 'llm:tier') {
    quota.storage_bytes = storageInputToBytes(
      Number(storageQuotaValue),
      storageQuotaUnit as StorageQuotaUnit,
    );
  }
  return {
    ...base,
    grace_json: {
      grace_days: Number(graceDays) || 0,
      remind_days: remindDays,
    },
    quota_json: quota,
    trial_json: {
      days: trialEnabled ? Number(trialDays) || 0 : 0,
      enabled: Boolean(trialEnabled),
      times: trialEnabled ? Number(trialTimes) || 1 : 0,
    },
  };
}

/**
 * 权威行 → 表单：拆解结构化字段，其他配额保留为高级 JSON。
 */
function explodeJsonFields(row: BillingPlan): Record<string, any> {
  const trial = row.trial_json || {};
  const grace = row.grace_json || {};
  const quota = row.quota_json || {};
  const otherQuota = Object.fromEntries(
    Object.entries(quota).filter(([key]) => key !== 'storage_bytes'),
  );
  let storageQuota: { unit: StorageQuotaUnit; value: null | number } = {
    unit: 'GiB',
    value: null,
  };
  if (row.offering_key === 'llm:tier') {
    try {
      storageQuota = bytesToStorageInput(Number(quota.storage_bytes));
    } catch {
      message.error('该档位的 storage_bytes 无法精确换算，请修正后再保存');
    }
  }
  const remind = Array.isArray(grace.remind_days)
    ? grace.remind_days.join(',')
    : '';
  return {
    ...row,
    trial_enabled: Boolean(trial.enabled),
    trial_days: trial.days ?? null,
    trial_times: trial.times ?? 1,
    grace_remind_days: remind,
    grace_days: grace.grace_days ?? 0,
    storage_quota_value: storageQuota.value,
    storage_quota_unit: storageQuota.unit,
    quota_json:
      Object.keys(otherQuota).length > 0
        ? JSON.stringify(otherQuota, null, 2)
        : '',
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
    <editModal title="编辑档位" :fullscreen-button="false" class="w-[800px]">
      <EditForm />
    </editModal>
    <addModal title="添加档位" :fullscreen-button="false" class="w-[800px]">
      <AddForm />
    </addModal>
  </Page>
</template>
