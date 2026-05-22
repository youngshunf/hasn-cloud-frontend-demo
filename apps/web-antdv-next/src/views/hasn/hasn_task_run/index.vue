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

import { confirm, Page, useVbenModal, VbenButton } from '@vben/common-ui';
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
  </Page>
</template>
