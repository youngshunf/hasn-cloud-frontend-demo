<script setup lang="ts">
import type { VbenFormProps } from '@vben/common-ui';

import type {
  OnActionClickParams,
  VxeTableGridOptions,
} from '#/adapter/vxe-table';
import type {
  HasnAppBetaAccess,
  InviteHasnAppBetaParams,
} from '#/api/hasn/hasn_app_beta_access';

import { Page, useVbenModal, VbenButton } from '@vben/common-ui';
import { MaterialSymbolsAdd } from '@vben/icons';
import { $t } from '@vben/locales';

import { message } from 'antdv-next';

import { useVbenForm } from '#/adapter/form';
import { useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  approveHasnAppBetaAccessApi,
  deleteHasnAppBetaAccessApi,
  getHasnAppBetaAccessListApi,
  inviteHasnAppBetaAccessApi,
  rejectHasnAppBetaAccessApi,
} from '#/api/hasn/hasn_app_beta_access';

import { inviteFormSchema, querySchema, useColumns } from './data';

defineOptions({
  name: 'HasnAppBetaAccess',
});

/**
 * Grid configuration
 */
const formOptions: VbenFormProps = {
  collapsed: false,
  showCollapseButton: false,
  submitButtonOptions: {
    content: $t('common.form.query'),
  },
  schema: querySchema,
};

const gridOptions: VxeTableGridOptions<HasnAppBetaAccess> = {
  rowConfig: {
    keyField: 'id',
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
      query: async (_params, formValues) => {
        // 后端 list 仅按 app_id / status 过滤，返回纯列表（无分页）。
        return await getHasnAppBetaAccessListApi({ ...formValues });
      },
    },
  },
};

const [Grid, gridApi] = useVbenVxeGrid({ formOptions, gridOptions });

function onRefresh() {
  gridApi.query();
}

function onActionClick({ code, row }: OnActionClickParams<HasnAppBetaAccess>) {
  switch (code) {
    case 'approve': {
      approveHasnAppBetaAccessApi(row.id).then(() => {
        message.success('已通过该内测申请');
        onRefresh();
      });
      break;
    }
    case 'delete': {
      deleteHasnAppBetaAccessApi(row.id).then(() => {
        message.success($t('ui.actionMessage.deleteSuccess', [row.subject_id]));
        onRefresh();
      });
      break;
    }
    case 'reject': {
      rejectHasnAppBetaAccessApi(row.id).then(() => {
        message.success('已拒绝该内测申请');
        onRefresh();
      });
      break;
    }
  }
}

/**
 * 邀请 Modal（直接通过，无需对方申请）
 */
const [InviteForm, inviteFormApi] = useVbenForm({
  showDefaultActions: false,
  schema: inviteFormSchema,
});

const [inviteModal, inviteModalApi] = useVbenModal({
  destroyOnClose: true,
  async onConfirm() {
    const { valid } = await inviteFormApi.validate();
    if (valid) {
      inviteModalApi.lock();
      const data = await inviteFormApi.getValues<InviteHasnAppBetaParams>();
      try {
        await inviteHasnAppBetaAccessApi(data);
        message.success('已邀请进灰度内测');
        await inviteModalApi.close();
        onRefresh();
      } finally {
        inviteModalApi.unlock();
      }
    }
  },
  onOpenChange(isOpen: boolean) {
    if (isOpen) {
      inviteFormApi.resetForm();
    }
  },
});
</script>

<template>
  <Page auto-content-height>
    <Grid>
      <template #toolbar-actions>
        <VbenButton @click="() => inviteModalApi.open()">
          <MaterialSymbolsAdd class="size-5" />
          邀请内测
        </VbenButton>
      </template>
    </Grid>
    <inviteModal
      title="邀请进灰度内测"
      :fullscreen-button="false"
      class="w-[600px]"
    >
      <InviteForm />
    </inviteModal>
  </Page>
</template>
