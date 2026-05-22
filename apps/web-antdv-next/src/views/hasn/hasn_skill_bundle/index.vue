<script setup lang="ts">
import type { VbenFormProps } from '@vben/common-ui';

import type {
  OnActionClickParams,
  VxeTableGridOptions,
} from '#/adapter/vxe-table';
import type {
  HasnSkillBundle,
  HasnSkillBundleCreateParams,
} from '#/api/hasn/hasn_skill_bundle';

import { computed, ref } from 'vue';

import { confirm, Page, useVbenModal, VbenButton } from '@vben/common-ui';
import { MaterialSymbolsAdd } from '@vben/icons';
import { $t } from '@vben/locales';

import { message } from 'antdv-next';

import { useVbenForm } from '#/adapter/form';
import { useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  createHasnSkillBundleApi,
  deleteHasnSkillBundleApi,
  getHasnSkillBundleListApi,
  updateHasnSkillBundleApi,
} from '#/api/hasn/hasn_skill_bundle';

import { formSchema, querySchema, useColumns } from './data';

defineOptions({
  name: 'HasnSkillBundle',
});

type HasnSkillBundleFormValues = HasnSkillBundleCreateParams & { id?: number };

function stringifyJsonFields<T extends Record<string, any>>(data: T): T {
  return {
    ...data,
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

function onActionClick({ code, row }: OnActionClickParams<HasnSkillBundle>) {
  switch (code) {
    case 'delete': {
      confirm({
        icon: 'warning',
        content: '确认删除此 Skill Bundle 吗？',
      }).then(async () => {
        await deleteHasnSkillBundleApi(row.id);
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

const gridOptions: VxeTableGridOptions<HasnSkillBundle> = {
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
        return await getHasnSkillBundleListApi({
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

const formData = ref<HasnSkillBundleFormValues>();

const modalTitle = computed(() => {
  return formData.value?.id
    ? $t('ui.actionTitle.edit', ['Skill Bundle'])
    : $t('ui.actionTitle.create', ['Skill Bundle']);
});

const [Modal, modalApi] = useVbenModal({
  destroyOnClose: true,
  async onConfirm() {
    const { valid } = await formApi.validate();
    if (valid) {
      modalApi.lock();
      const data = await formApi.getValues<HasnSkillBundleCreateParams>();
      try {
        await (formData.value?.id
          ? updateHasnSkillBundleApi(formData.value.id, data)
          : createHasnSkillBundleApi(data));
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
      const data = modalApi.getData<HasnSkillBundleFormValues>();
      formData.value = data;
      formApi.setValues(data ? stringifyJsonFields(data) : { skill_ids: '[]' });
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
    <Modal :title="modalTitle" :fullscreen-button="false" class="w-[880px]">
      <Form />
    </Modal>
  </Page>
</template>
