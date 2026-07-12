<script setup lang="ts">
import type { VbenFormProps } from '@vben/common-ui';

import type {
  OnActionClickParams,
  VxeTableGridOptions,
} from '#/adapter/vxe-table';
import type {
  BuildDetail,
  ReleaseDetail,
} from '#/api/hasn_release/release_console';

import { ref } from 'vue';

import { Page, useVbenModal, VbenButton } from '@vben/common-ui';
import { $t } from '@vben/locales';

import { message, Modal, Tag } from 'antdv-next';

import { useVbenForm } from '#/adapter/form';
import { useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  deleteReleaseApi,
  listBuildsApi,
  listReleasesApi,
  publishReleaseApi,
  setLatestReleaseApi,
  triggerGithubBuildApi,
  updateReleaseApi,
} from '#/api/hasn_release/release_console';

import { buildFormSchema, editFormSchema, useColumns } from './data';
import ReleasePublishForm from './ReleasePublishForm.vue';

defineOptions({ name: 'ReleaseConsole' });

// ---------- 版本列表 Grid ----------
const formOptions: VbenFormProps = {
  collapsed: false,
  showCollapseButton: false,
  submitButtonOptions: { content: $t('common.form.query') },
  schema: [
    {
      component: 'Select',
      fieldName: 'channel',
      label: '渠道',
      componentProps: {
        allowClear: true,
        options: [
          { label: 'stable（稳定）', value: 'stable' },
          { label: 'beta（测试）', value: 'beta' },
        ],
        placeholder: '全部渠道',
      },
    },
  ],
};

const gridOptions: VxeTableGridOptions<ReleaseDetail> = {
  rowConfig: { keyField: 'id' },
  height: 'auto',
  toolbarConfig: {
    custom: true,
    refresh: { code: 'query' },
    zoom: true,
  },
  columns: useColumns(onActionClick),
  proxyConfig: {
    ajax: {
      // 后端 /list 返回扁平数组（无分页），包成 vxe 期望的 {items,total}
      query: async (_params, formValues) => {
        const list = await listReleasesApi({
          channel: formValues?.channel || undefined,
          limit: 100,
        });
        return { items: list, total: list.length };
      },
    },
  },
  pagerConfig: { enabled: false },
};

const [Grid, gridApi] = useVbenVxeGrid({ formOptions, gridOptions });

function onRefresh(): void {
  gridApi.query();
}

// 日期格式化（不引入 dayjs）
function fmtTime(v?: null | string): string {
  if (!v) return '—';
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? v : d.toLocaleString('zh-CN');
}

// 汇总一个版本各资产的总下载量
function totalDownloads(row: ReleaseDetail): number {
  return (row.assets || []).reduce(
    (sum, a) => sum + (a.download_count || 0),
    0,
  );
}

// 提取版本涉及的平台目标（去重）
function platformsOf(row: ReleaseDetail): string[] {
  return [...new Set((row.assets || []).map((a) => a.platform_target))];
}

function onActionClick({
  code,
  row,
}: OnActionClickParams<ReleaseDetail>): void {
  switch (code) {
    case 'delete': {
      Modal.confirm({
        title: '删除版本',
        content: `确认删除版本 ${row.version}（${row.channel}）？将级联删除其全部平台资产，不可恢复。`,
        okType: 'danger',
        okText: '删除',
        cancelText: '取消',
        onOk: async () => {
          await deleteReleaseApi(row.id);
          message.success('已删除');
          onRefresh();
        },
      });
      break;
    }
    case 'edit': {
      editId.value = row.id;
      editModalApi.setData(row).open();
      break;
    }
    case 'setLatest': {
      Modal.confirm({
        title: '设为最新',
        content: `将版本 ${row.version} 置为 ${row.channel} 渠道的当前最新（官网/桌面端将据此下载与更新）。`,
        okText: '确定',
        cancelText: '取消',
        onOk: async () => {
          await setLatestReleaseApi(row.id, row.channel);
          message.success('已设为最新');
          onRefresh();
        },
      });
      break;
    }
  }
}

// ---------- 编辑版本元数据（changelog / 状态） ----------
const editId = ref<number>(0);
const [EditForm, editFormApi] = useVbenForm({
  showDefaultActions: false,
  schema: editFormSchema,
});
const [EditModal, editModalApi] = useVbenModal({
  destroyOnClose: true,
  async onConfirm() {
    const { valid } = await editFormApi.validate();
    if (!valid) return;
    editModalApi.lock();
    try {
      const data = await editFormApi.getValues<{
        release_notes_en_md?: string;
        release_notes_md?: string;
        status?: string;
      }>();
      await updateReleaseApi(editId.value, data);
      message.success('已保存');
      await editModalApi.close();
      onRefresh();
    } finally {
      editModalApi.unlock();
    }
  },
  onOpenChange(isOpen: boolean) {
    if (!isOpen) return;
    const row = editModalApi.getData<ReleaseDetail>();
    editFormApi.resetForm();
    if (row) {
      editFormApi.setValues({
        release_notes_en_md: row.release_notes_en_md ?? '',
        release_notes_md: row.release_notes_md ?? '',
        status: row.status,
      });
    }
  },
});

// ---------- 从 GitHub 构建 ----------
const [BuildForm, buildFormApi] = useVbenForm({
  showDefaultActions: false,
  schema: buildFormSchema,
});
const [BuildModal, buildModalApi] = useVbenModal({
  destroyOnClose: true,
  async onConfirm() {
    const { valid } = await buildFormApi.validate();
    if (!valid) return;
    buildModalApi.lock();
    try {
      const data = await buildFormApi.getValues<{
        channel: string;
        ref: string;
      }>();
      const build = await triggerGithubBuildApi(data);
      message.success(`已触发构建（#${build.id} ${build.ref}）`);
      await buildModalApi.close();
    } finally {
      buildModalApi.unlock();
    }
  },
  onOpenChange(isOpen: boolean) {
    if (isOpen) buildFormApi.resetForm();
  },
});

// ---------- 手动上传发布 ----------
// 用自定义组件承载「上传包 + 选平台」表单，替代原先手写资产清单 JSON。
const publishFormRef = ref<InstanceType<typeof ReleasePublishForm>>();
const [PublishModal, publishModalApi] = useVbenModal({
  destroyOnClose: true,
  async onConfirm() {
    // 组件内自校验并组装请求体；不合法时组件已给出提示并返回 null
    const payload = await publishFormRef.value?.validateAndBuild();
    if (!payload) return;
    publishModalApi.lock();
    try {
      const release = await publishReleaseApi(payload);
      message.success(`已发布 ${release.version}`);
      await publishModalApi.close();
      onRefresh();
    } finally {
      publishModalApi.unlock();
    }
  },
});

// ---------- 构建任务列表 ----------
const buildsGridOptions: VxeTableGridOptions<BuildDetail> = {
  rowConfig: { keyField: 'id' },
  height: 480,
  columns: [
    { field: 'id', title: '#', width: 60 },
    { field: 'ref', title: '分支/Tag', width: 140 },
    { field: 'channel', title: '渠道', width: 80 },
    {
      field: 'status',
      title: '状态',
      width: 110,
      slots: { default: 'status' },
    },
    { field: 'version', title: '版本', width: 100 },
    { field: 'triggered_by', title: '触发人', width: 120 },
    { field: 'run', title: 'GitHub', width: 90, slots: { default: 'run' } },
    {
      field: 'error_message',
      title: '错误信息',
      minWidth: 200,
      showOverflow: true,
    },
    {
      field: 'created_time',
      title: '创建时间',
      width: 170,
      slots: { default: 'created_time' },
    },
  ],
  proxyConfig: {
    ajax: {
      query: async () => {
        const list = await listBuildsApi({ limit: 100 });
        return { items: list, total: list.length };
      },
    },
  },
  pagerConfig: { enabled: false },
};
const [BuildsGrid, buildsGridApi] = useVbenVxeGrid({
  gridOptions: buildsGridOptions,
});
const [BuildsModal, buildsModalApi] = useVbenModal({
  onOpenChange(isOpen: boolean) {
    if (isOpen) buildsGridApi.query();
  },
});

function statusColor(status: string): string {
  const map: Record<string, string> = {
    deprecated: 'warning',
    draft: 'default',
    failed: 'error',
    published: 'success',
    queued: 'processing',
    running: 'processing',
    success: 'success',
  };
  return map[status] || 'default';
}
</script>

<template>
  <Page auto-content-height>
    <Grid table-title="桌面端版本发布">
      <template #toolbar-actions>
        <VbenButton class="mr-2" @click="() => buildModalApi.open()">
          从 GitHub 构建
        </VbenButton>
        <VbenButton
          class="mr-2"
          variant="secondary"
          @click="() => publishModalApi.open()"
        >
          手动登记发布
        </VbenButton>
        <VbenButton variant="ghost" @click="() => buildsModalApi.open()">
          构建任务
        </VbenButton>
      </template>

      <!-- 版本号 + 最新标记 -->
      <template #version="{ row }">
        <span class="font-medium">{{ row.version }}</span>
        <Tag v-if="row.is_latest" color="success" class="ml-1">最新</Tag>
      </template>

      <!-- 平台包 -->
      <template #platforms="{ row }">
        <template v-if="platformsOf(row).length > 0">
          <Tag v-for="pt in platformsOf(row)" :key="pt" class="mb-1">
            {{ pt }}
          </Tag>
          <span class="text-muted-foreground ml-1 text-xs">
            {{ row.assets.length }} 个资产
          </span>
        </template>
        <span v-else class="text-muted-foreground">—</span>
      </template>

      <!-- 下载量 -->
      <template #downloads="{ row }">{{ totalDownloads(row) }}</template>

      <!-- 发布时间 -->
      <template #published_time="{ row }">
        {{ fmtTime(row.published_time) }}
      </template>
    </Grid>

    <!-- 编辑版本元数据 -->
    <EditModal title="编辑版本" :fullscreen-button="false" class="w-[720px]">
      <EditForm />
    </EditModal>

    <!-- 从 GitHub 构建 -->
    <BuildModal
      title="从 GitHub 自动构建"
      :fullscreen-button="false"
      class="w-[560px]"
    >
      <div class="text-muted-foreground mb-3 text-sm">
        触发 GitHub Actions 打包工作流（workflow_dispatch）。构建完成后 CI
        会自动 上传七牛并回调登记新版本，可在「构建任务」中查看进度。
      </div>
      <BuildForm />
    </BuildModal>

    <!-- 手动上传发布 -->
    <PublishModal
      title="手动上传发布"
      :fullscreen-button="false"
      class="w-[820px]"
    >
      <div class="text-muted-foreground mb-3 text-sm">
        用于无 CI
        时的手动发布：填写版本号后，直接上传各平台安装包（dmg/msi/exe）
        与热更新包（app.tar.gz/nsis.zip）——系统自动上传七牛并回填 CDN
        直链、大小、 sha256。热更新包需另附 .sig 签名（可上传 .sig
        文件自动读取）。
      </div>
      <ReleasePublishForm ref="publishFormRef" />
    </PublishModal>

    <!-- 构建任务列表 -->
    <BuildsModal
      title="构建任务"
      :footer="false"
      :fullscreen-button="false"
      class="w-[960px]"
    >
      <BuildsGrid>
        <template #status="{ row }">
          <Tag :color="statusColor(row.status)">{{ row.status }}</Tag>
        </template>
        <template #run="{ row }">
          <a
            v-if="row.github_run_url"
            :href="row.github_run_url"
            target="_blank"
            rel="noopener noreferrer"
          >
            查看
          </a>
          <span v-else class="text-muted-foreground">—</span>
        </template>
        <template #created_time="{ row }">
          {{ fmtTime(row.created_time) }}
        </template>
      </BuildsGrid>
    </BuildsModal>
  </Page>
</template>
