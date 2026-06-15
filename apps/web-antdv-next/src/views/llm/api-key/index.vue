<!--
  API Key管理页面
  @author Ysf
-->
<script setup lang="ts">
import type { VbenFormProps } from '@vben/common-ui';
import type { VxeTableGridOptions, OnActionClickParams } from '#/adapter/vxe-table';
import type { LlmApiKeyResult, LlmApiKeyCreateParams } from '#/api';

import { ref } from 'vue';
import { Page, useVbenModal, VbenButton } from '@vben/common-ui';
import { MaterialSymbolsAdd } from '@vben/icons';
import { $t } from '@vben/locales';
import { message, Modal, Typography } from 'antdv-next';

import { useVbenForm } from '#/adapter/form';
import { useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  getLlmApiKeyListApi,
  createLlmApiKeyApi,
  updateLlmApiKeyApi,
  deleteLlmApiKeyApi,
  getFullApiKeyApi,
} from '#/api';
import { querySchema, useColumns, useFormSchema, useEditFormSchema } from './data';

const formOptions: VbenFormProps = {
  collapsed: true,
  showCollapseButton: true,
  submitButtonOptions: { content: '查询' },
  schema: querySchema,
};

const gridOptions: VxeTableGridOptions<LlmApiKeyResult> = {
  rowConfig: { keyField: 'id' },
  height: 'auto',
  exportConfig: {},
  toolbarConfig: {
    export: true,
    refresh: true,
    custom: true,
    zoom: true,
  },
  columns: useColumns(onActionClick),
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues) => {
        return await getLlmApiKeyListApi({
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

const editId = ref<number>(0);

function onActionClick({ code, row }: OnActionClickParams<LlmApiKeyResult>) {
  switch (code) {
    case 'delete': {
      deleteLlmApiKeyApi(row.id).then(() => {
        message.success($t('ui.actionMessage.deleteSuccess', [row.name]));
        onRefresh();
      });
      break;
    }
    case 'edit': {
      editId.value = row.id;
      editModalApi.setData(row).open();
      break;
    }
    case 'copy': {
      getFullApiKeyApi(row.id).then((res: any) => {
        const key = res?.data?.api_key || res?.api_key;
        if (key) {
          navigator.clipboard.writeText(key).then(() => {
            message.success('API Key 已复制到剪贴板');
          }).catch(() => {
            // fallback
            Modal.info({ title: 'API Key', content: key, width: 500 });
          });
        } else {
          message.error('获取 API Key 失败');
        }
      }).catch((err: any) => {
        message.error(`获取失败：${err?.message || '未知错误'}`);
      });
      break;
    }
  }
}

const [EditForm, editFormApi] = useVbenForm({
  showDefaultActions: false,
  schema: useEditFormSchema(),
});

const [editModal, editModalApi] = useVbenModal({
  destroyOnClose: true,
  async onConfirm() {
    const { valid } = await editFormApi.validate();
    if (valid) {
      editModalApi.lock();
      const data = await editFormApi.getValues<LlmApiKeyCreateParams & { status?: string }>();
      try {
        await updateLlmApiKeyApi(editId.value, data);
        message.success($t('ui.actionMessage.operationSuccess'));
        await editModalApi.close();
        onRefresh();
      } finally {
        editModalApi.unlock();
      }
    }
  },
  onOpenChange(isOpen) {
    if (isOpen) {
      const data = editModalApi.getData<LlmApiKeyResult>();
      editFormApi.resetForm();
      if (data) {
        editFormApi.setValues(data);
      }
    }
  },
});

const [AddForm, addFormApi] = useVbenForm({
  showDefaultActions: false,
  schema: useFormSchema(),
});

const [addModal, addModalApi] = useVbenModal({
  destroyOnClose: true,
  async onConfirm() {
    const { valid } = await addFormApi.validate();
    if (valid) {
      addModalApi.lock();
      const data = await addFormApi.getValues<LlmApiKeyCreateParams>();
      try {
        const result = await createLlmApiKeyApi(data);
        await addModalApi.close();
        // 显示生成的 API Key
        Modal.success({
          title: 'API Key 创建成功',
          content: () => {
            return [
              Typography.Paragraph({}, '请妥善保存以下 API Key，它只会显示一次：'),
              Typography.Paragraph(
                { copyable: true, code: true },
                result.api_key,
              ),
            ];
          },
          width: 500,
        });
        onRefresh();
      } finally {
        addModalApi.unlock();
      }
    }
  },
  onOpenChange(isOpen) {
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
        <VbenButton @click="() => addModalApi.open()">
          <MaterialSymbolsAdd class="size-5" />
          创建 API Key
        </VbenButton>
      </template>
    </Grid>
    <editModal title="编辑 API Key">
      <EditForm />
    </editModal>
    <addModal title="创建 API Key">
      <AddForm />
    </addModal>
  </Page>
</template>
