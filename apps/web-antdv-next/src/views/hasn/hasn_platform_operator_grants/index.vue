<script setup lang="ts">
import type { VbenFormProps } from '@vben/common-ui';

import type {
  OnActionClickParams,
  VxeTableGridOptions,
} from '#/adapter/vxe-table';
import type {
  HasnPlatformOperatorGrants,
  HasnPlatformOperatorGrantsBatchCreateParams,
  HasnPlatformOperatorGrantsParams,
} from '#/api/hasn/hasn_platform_operator_grants';

import { ref } from 'vue';

import { Page, useVbenModal, VbenButton } from '@vben/common-ui';
import { MaterialSymbolsAdd } from '@vben/icons';
import { $t } from '@vben/locales';

import { message } from 'antdv-next';

import { useVbenForm } from '#/adapter/form';
import { useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  createHasnPlatformOperatorGrantsBatchApi,
  deleteHasnPlatformOperatorGrantsApi,
  getHasnPlatformOperatorGrantsListApi,
  updateHasnPlatformOperatorGrantsApi,
} from '#/api/hasn/hasn_platform_operator_grants';

import { addFormSchema, formSchema, querySchema, useColumns } from './data';

defineOptions({
  name: 'HasnPlatformOperatorGrants',
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

const gridOptions: VxeTableGridOptions<HasnPlatformOperatorGrants> = {
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
        return await getHasnPlatformOperatorGrantsListApi({
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

function onActionClick({
  code,
  row,
}: OnActionClickParams<HasnPlatformOperatorGrants>) {
  switch (code) {
    case 'delete': {
      deleteHasnPlatformOperatorGrantsApi(row.id).then(() => {
        message.success($t('ui.actionMessage.deleteSuccess', [row.id]));
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
 * Edit Modal
 */
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
      const data =
        await editFormApi.getValues<HasnPlatformOperatorGrantsParams>();
      // owner_hasn_id 只是选人辅助字段，不入库；granted_by 由后端从 JWT 覆盖
      const { owner_hasn_id: _owner, ...payload } = data as Record<string, any>;
      try {
        await updateHasnPlatformOperatorGrantsApi(editId.value, payload);
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
      const data = editModalApi.getData<HasnPlatformOperatorGrants>();
      editFormApi.resetForm();
      if (data) {
        editFormApi.setValues(data);
      }
    }
  },
});

/**
 * Add Modal
 */
const [AddForm, addFormApi] = useVbenForm({
  showDefaultActions: false,
  schema: addFormSchema,
});

const [addModal, addModalApi] = useVbenModal({
  destroyOnClose: true,
  async onConfirm() {
    const { valid } = await addFormApi.validate();
    if (valid) {
      addModalApi.lock();
      const data = await addFormApi.getValues<Record<string, any>>();
      // owner_hasn_id 只是选人辅助字段，不入库；granted_by 由后端从 JWT 覆盖
      // scopes 多选 → 后端展开成多行幂等落库（已存在的跳过）
      const payload: HasnPlatformOperatorGrantsBatchCreateParams = {
        agent_hasn_id: data.agent_hasn_id,
        scopes: data.scopes ?? [],
        note: data.note,
      };
      try {
        const { created } =
          await createHasnPlatformOperatorGrantsBatchApi(payload);
        message.success(
          created > 0
            ? `已授予 ${created} 项特权`
            : '所选特权此前均已授予，无新增',
        );
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
          添加
        </VbenButton>
      </template>
    </Grid>
    <editModal title="编辑" :fullscreen-button="false" class="w-[800px]">
      <EditForm />
    </editModal>
    <addModal title="添加" :fullscreen-button="false" class="w-[800px]">
      <AddForm />
    </addModal>
  </Page>
</template>
