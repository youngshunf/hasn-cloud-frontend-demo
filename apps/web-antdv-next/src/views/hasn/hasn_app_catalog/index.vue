<script setup lang="ts">
import type { VbenFormProps } from '@vben/common-ui';

import type {
  OnActionClickParams,
  VxeTableGridOptions,
} from '#/adapter/vxe-table';
import type {
  HasnAppCatalog,
  HasnAppCatalogParams,
} from '#/api/hasn/hasn_app_catalog';

import { ref } from 'vue';

import { CodeMirror, Page, useVbenModal, VbenButton } from '@vben/common-ui';
import { MaterialSymbolsAdd } from '@vben/icons';
import { $t } from '@vben/locales';

import { message } from 'antdv-next';

import { useVbenForm } from '#/adapter/form';
import { useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  createHasnAppCatalogApi,
  deleteHasnAppCatalogApi,
  getHasnAppCatalogListApi,
  updateHasnAppCatalogApi,
} from '#/api/hasn/hasn_app_catalog';

import {
  formSchema,
  querySchema,
  useColumns,
  withCatalogDefaults,
} from './data';

defineOptions({
  name: 'HasnAppCatalog',
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

const gridOptions: VxeTableGridOptions<HasnAppCatalog> = {
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
        return await getHasnAppCatalogListApi({
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

function onActionClick({ code, row }: OnActionClickParams<HasnAppCatalog>) {
  switch (code) {
    case 'config': {
      configModalApi.setData(row).open();
      break;
    }
    case 'delete': {
      deleteHasnAppCatalogApi(row.id).then(() => {
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
      const data = await editFormApi.getValues<HasnAppCatalogParams>();
      const payload = withCatalogDefaults(data);
      try {
        await updateHasnAppCatalogApi(editId.value, payload);
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
      const data = editModalApi.getData<HasnAppCatalog>();
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
  schema: formSchema,
});

const [addModal, addModalApi] = useVbenModal({
  destroyOnClose: true,
  async onConfirm() {
    const { valid } = await addFormApi.validate();
    if (valid) {
      addModalApi.lock();
      const data = await addFormApi.getValues<HasnAppCatalogParams>();
      const payload = withCatalogDefaults(data);
      try {
        await createHasnAppCatalogApi(payload);
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

/**
 * Config Modal —— 直接编辑应用专属配置 JSON（不走表单，保存前校验 JSON 格式）
 */
const configId = ref<number>(0);
const configAppName = ref<string>('');
const configText = ref<string>('{}');

const [ConfigModal, configModalApi] = useVbenModal({
  destroyOnClose: true,
  async onConfirm() {
    let parsed: Record<string, any>;
    try {
      parsed = JSON.parse(configText.value);
    } catch {
      message.error('JSON 格式不正确，请检查后再保存');
      return;
    }
    if (
      typeof parsed !== 'object' ||
      parsed === null ||
      Array.isArray(parsed)
    ) {
      message.error('配置必须是一个 JSON 对象（{ ... }）');
      return;
    }
    configModalApi.lock();
    try {
      await updateHasnAppCatalogApi(configId.value, { config_json: parsed });
      message.success($t('ui.actionMessage.operationSuccess'));
      await configModalApi.close();
      onRefresh();
    } finally {
      configModalApi.unlock();
    }
  },
  onOpenChange(isOpen: boolean) {
    if (isOpen) {
      const data = configModalApi.getData<HasnAppCatalog>();
      configId.value = data?.id ?? 0;
      configAppName.value = data?.name ?? '';
      configText.value = JSON.stringify(data?.config_json ?? {}, null, 2);
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
    <ConfigModal
      :title="`编辑配置${configAppName ? ` - ${configAppName}` : ''}`"
      :fullscreen-button="false"
      class="w-[800px]"
    >
      <div class="text-muted-foreground mb-2 text-sm">
        直接编辑该应用的平台级配置 JSON（如 film 视频引擎的 5 类模型与引擎包
        manifest）。保存前会校验 JSON 格式。
      </div>
      <div class="max-h-[60vh] overflow-auto rounded-md border">
        <CodeMirror v-model="configText" language="json" />
      </div>
    </ConfigModal>
  </Page>
</template>
