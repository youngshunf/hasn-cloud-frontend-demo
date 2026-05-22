<script setup lang="ts">
import type { VbenFormProps } from '@vben/common-ui';

import type {
  OnActionClickParams,
  VxeTableGridOptions,
} from '#/adapter/vxe-table';
import type { HasnTask, HasnTaskCreateParams } from '#/api/hasn/hasn_task';

import { computed, ref } from 'vue';

import { confirm, Page, useVbenModal, VbenButton } from '@vben/common-ui';
import { MaterialSymbolsAdd } from '@vben/icons';
import { $t } from '@vben/locales';

import { message } from 'antdv-next';

import { useVbenForm } from '#/adapter/form';
import { useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  createHasnTaskApi,
  deleteHasnTaskApi,
  getHasnTaskListApi,
  updateHasnTaskApi,
} from '#/api/hasn/hasn_task';

import { formSchema, querySchema, useColumns } from './data';

defineOptions({
  name: 'HasnTask',
});

type HasnTaskFormValues = HasnTaskCreateParams & { id?: number };

function stringifyJsonFields<T extends Record<string, any>>(data: T): T {
  return {
    ...data,
    enabled_toolsets:
      data.enabled_toolsets === undefined
        ? undefined
        : JSON.stringify(data.enabled_toolsets, null, 2),
    schedule_config: JSON.stringify(data.schedule_config ?? {}, null, 2),
    skill_bundle_ids: JSON.stringify(data.skill_bundle_ids ?? [], null, 2),
    skill_ids: JSON.stringify(data.skill_ids ?? [], null, 2),
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

function onActionClick({ code, row }: OnActionClickParams<HasnTask>) {
  switch (code) {
    case 'delete': {
      confirm({
        icon: 'warning',
        content: '确认删除此任务定义吗？',
      }).then(async () => {
        await deleteHasnTaskApi(row.id);
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

const gridOptions: VxeTableGridOptions<HasnTask> = {
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
        return await getHasnTaskListApi({
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

const formData = ref<HasnTaskFormValues>();

const modalTitle = computed(() => {
  return formData.value?.id
    ? $t('ui.actionTitle.edit', ['任务定义'])
    : $t('ui.actionTitle.create', ['任务定义']);
});

const [Modal, modalApi] = useVbenModal({
  destroyOnClose: true,
  async onConfirm() {
    const { valid } = await formApi.validate();
    if (valid) {
      modalApi.lock();
      const data = await formApi.getValues<HasnTaskCreateParams>();
      try {
        await (formData.value?.id
          ? updateHasnTaskApi(formData.value.id, data)
          : createHasnTaskApi(data));
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
      const data = modalApi.getData<HasnTaskFormValues>();
      formData.value = data;
      formApi.setValues(
        data
          ? stringifyJsonFields(data)
          : {
              enabled: true,
              repeat_completed: 0,
              run_count: 0,
              schedule_config: '{}',
              schedule_type: 'once',
              skill_bundle_ids: '[]',
              skill_ids: '[]',
              state: 'scheduled',
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
