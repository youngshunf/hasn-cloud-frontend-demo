<script setup lang="ts">
import type {
  OnActionClickParams,
  VxeTableGridOptions,
} from '#/adapter/vxe-table';
import type {
  CreateProviderParams,
  StockProviderItem,
  UpdateProviderParams,
} from '#/api/hasn/hasn_stock_providers';

import { ref } from 'vue';

import { Page, useVbenModal, VbenButton } from '@vben/common-ui';
import { MaterialSymbolsAdd } from '@vben/icons';
import { $t } from '@vben/locales';

import { message } from 'antdv-next';

import { useVbenForm } from '#/adapter/form';
import { useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  createStockProviderApi,
  deleteStockProviderApi,
  getStockProviderListApi,
  updateStockProviderApi,
} from '#/api/hasn/hasn_stock_providers';

import { createFormSchema, editFormSchema, useColumns } from './data';

defineOptions({
  name: 'HasnStockProviders',
});

/**
 * 表格：直接列全部素材站（后端返回纯列表，无分页/查询参数）。
 */
const gridOptions: VxeTableGridOptions<StockProviderItem> = {
  rowConfig: {
    keyField: 'id',
  },
  height: 'auto',
  toolbarConfig: {
    refresh: {
      code: 'query',
    },
    custom: true,
    zoom: true,
  },
  columns: useColumns(onActionClick),
  proxyConfig: {
    ajax: {
      query: async () => await getStockProviderListApi(),
    },
  },
};

const [Grid, gridApi] = useVbenVxeGrid({ gridOptions });

function onRefresh() {
  gridApi.query();
}

function onActionClick({ code, row }: OnActionClickParams<StockProviderItem>) {
  switch (code) {
    case 'delete': {
      deleteStockProviderApi(row.id).then(() => {
        message.success($t('ui.actionMessage.deleteSuccess', [row.provider]));
        onRefresh();
      });
      break;
    }
    case 'edit': {
      editId.value = row.id;
      editProvider.value = row.provider;
      editModalApi.setData(row).open();
      break;
    }
  }
}

/**
 * 新增
 */
const [AddForm, addFormApi] = useVbenForm({
  showDefaultActions: false,
  schema: createFormSchema,
});

const [addModal, addModalApi] = useVbenModal({
  destroyOnClose: true,
  async onConfirm() {
    const { valid } = await addFormApi.validate();
    if (!valid) return;
    addModalApi.lock();
    try {
      const data = await addFormApi.getValues<CreateProviderParams>();
      const payload = { ...data };
      // 明文 api_key 留空则不下发（避免以空串配置一个空 key）。
      if (!payload.api_key) {
        delete payload.api_key;
      }
      await createStockProviderApi(payload);
      message.success($t('ui.actionMessage.operationSuccess'));
      await addModalApi.close();
      onRefresh();
    } finally {
      addModalApi.unlock();
    }
  },
  onOpenChange(isOpen: boolean) {
    if (isOpen) {
      addFormApi.resetForm();
    }
  },
});

/**
 * 编辑
 */
const editId = ref<number>(0);
const editProvider = ref<string>('');

const [EditForm, editFormApi] = useVbenForm({
  showDefaultActions: false,
  schema: editFormSchema,
});

const [editModal, editModalApi] = useVbenModal({
  destroyOnClose: true,
  async onConfirm() {
    const { valid } = await editFormApi.validate();
    if (!valid) return;
    editModalApi.lock();
    try {
      const data = await editFormApi.getValues();
      // 拆出 api_key/clear_api_key，据三态组装 payload：
      //   勾选清空 → api_key=''（清空）；填写非空 → 覆盖轮换；留空 → 不下发（不改）。
      const { api_key: rawKey, clear_api_key: clearKey, ...rest } = data;
      const payload: UpdateProviderParams = { ...rest };
      if (clearKey === true) {
        payload.api_key = '';
      } else if (rawKey) {
        payload.api_key = rawKey;
      }
      await updateStockProviderApi(editId.value, payload);
      message.success($t('ui.actionMessage.operationSuccess'));
      await editModalApi.close();
      onRefresh();
    } finally {
      editModalApi.unlock();
    }
  },
  onOpenChange(isOpen: boolean) {
    if (isOpen) {
      const row = editModalApi.getData<StockProviderItem>();
      editFormApi.resetForm();
      if (row) {
        // 只回填非敏感字段；api_key 明文永不回显（row 也不含明文）。
        editFormApi.setValues({
          display_name: row.display_name,
          media_types: row.media_types,
          download_domains: row.download_domains,
          enabled: row.enabled,
          priority: row.priority,
          license_terms_url: row.license_terms_url,
          remark: row.remark,
          clear_api_key: false,
        });
      }
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
          新增素材站
        </VbenButton>
      </template>
    </Grid>
    <addModal title="新增素材站" :fullscreen-button="false" class="w-[720px]">
      <AddForm />
    </addModal>
    <editModal
      :title="`编辑素材站${editProvider ? ` - ${editProvider}` : ''}`"
      :fullscreen-button="false"
      class="w-[720px]"
    >
      <EditForm />
    </editModal>
  </Page>
</template>
