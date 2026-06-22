<script setup lang="ts">
import type { PlatformDefaultConfig } from '#/api/hasn/platform_default_config';

import { onMounted, ref } from 'vue';

import { Page } from '@vben/common-ui';

import { Alert, Button, Card, message, Spin } from 'antdv-next';

import { useVbenForm } from '#/adapter/form';
import {
  getPlatformDefaultConfigApi,
  updatePlatformDefaultConfigApi,
} from '#/api/hasn/platform_default_config';

import { fallbackPoolSchema, mediaSchema, runtimeSchema } from './data';

defineOptions({
  name: 'HasnPlatformDefaultConfig',
});

const loading = ref(false);
const saving = ref(false);
const revision = ref('');
const updatedBy = ref<null | string>(null);
const updatedTime = ref<null | string>(null);

const [MediaForm, mediaFormApi] = useVbenForm({
  showDefaultActions: false,
  layout: 'vertical',
  wrapperClass: 'grid-cols-1',
  schema: mediaSchema,
});

const [RuntimeForm, runtimeFormApi] = useVbenForm({
  showDefaultActions: false,
  layout: 'vertical',
  wrapperClass: 'grid-cols-1 md:grid-cols-2',
  schema: runtimeSchema,
});

// 主模型 failover 全局兜底池（单列全宽 tags）：与四槽分开渲染，挂 agent_runtime.model_fallback_pool。
const [FallbackForm, fallbackFormApi] = useVbenForm({
  showDefaultActions: false,
  layout: 'vertical',
  wrapperClass: 'grid-cols-1',
  schema: fallbackPoolSchema,
});

// 单模型槽：去空白，空串 → null（表示「跟随默认」）
function normalizeModelSlot(value: unknown): null | string {
  if (typeof value !== 'string') {
    return null;
  }
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

// 模型列表：去空白、丢空项（tags 模式下用户可能误输空格）
function normalizeModelList(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }
  return value
    .map((item) => (typeof item === 'string' ? item.trim() : ''))
    .filter((item) => item.length > 0);
}

async function applyConfig(config: PlatformDefaultConfig) {
  const media = config?.node?.media;
  const models = config?.agent_runtime?.models;
  await mediaFormApi.setValues({
    image_models: media?.image_models ?? [],
    tts_models: media?.tts_models ?? [],
    stt_models: media?.stt_models ?? [],
    video_models: media?.video_models ?? [],
  });
  await runtimeFormApi.setValues({
    main: models?.main ?? '',
    fast: models?.fast ?? '',
    vision: models?.vision ?? '',
    delegation: models?.delegation ?? '',
  });
  await fallbackFormApi.setValues({
    model_fallback_pool: config?.agent_runtime?.model_fallback_pool ?? [],
  });
}

async function load() {
  loading.value = true;
  try {
    const res = await getPlatformDefaultConfigApi();
    revision.value = res.revision;
    updatedBy.value = res.updated_by ?? null;
    updatedTime.value = res.updated_time ?? null;
    await applyConfig(res.config);
  } finally {
    loading.value = false;
  }
}

async function onSave() {
  const [mediaValid, runtimeValid, fallbackValid] = await Promise.all([
    mediaFormApi.validate(),
    runtimeFormApi.validate(),
    fallbackFormApi.validate(),
  ]);
  if (!mediaValid.valid || !runtimeValid.valid || !fallbackValid.valid) {
    return;
  }

  const mediaValues = await mediaFormApi.getValues();
  const runtimeValues = await runtimeFormApi.getValues();
  const fallbackValues = await fallbackFormApi.getValues();

  const payload: PlatformDefaultConfig = {
    node: {
      media: {
        image_models: normalizeModelList(mediaValues.image_models),
        tts_models: normalizeModelList(mediaValues.tts_models),
        stt_models: normalizeModelList(mediaValues.stt_models),
        video_models: normalizeModelList(mediaValues.video_models),
      },
    },
    agent_runtime: {
      models: {
        main: normalizeModelSlot(runtimeValues.main),
        fast: normalizeModelSlot(runtimeValues.fast),
        vision: normalizeModelSlot(runtimeValues.vision),
        delegation: normalizeModelSlot(runtimeValues.delegation),
      },
      model_fallback_pool: normalizeModelList(
        fallbackValues.model_fallback_pool,
      ),
    },
  };

  saving.value = true;
  try {
    const res = await updatePlatformDefaultConfigApi(payload);
    revision.value = res.revision;
    updatedBy.value = res.updated_by ?? null;
    updatedTime.value = res.updated_time ?? null;
    await applyConfig(res.config);
    message.success('已保存，新配置将通过同步自动下发到桌面端与 Agent 运行时');
  } finally {
    saving.value = false;
  }
}

onMounted(load);
</script>

<template>
  <Page
    title="平台默认配置"
    description="云端权威：在此改一处，所有桌面端 daemon 与 Agent 运行时通过同步自动应用新的默认模型配置，无需改源码或重打包。"
  >
    <Spin :spinning="loading">
      <Alert
        class="mb-4"
        type="info"
        show-icon
        message="生效说明"
        description="保存后服务端重算 revision，桌面端在下一次登录/同步（或后台 reconcile）时拉取并应用：媒体模型立即对下次调用生效；Agent 运行时模型经现有 provision 链路重写 config.yaml。媒体模型名必须是 new-api 已开渠道的模型，否则 failover 会全部失败。"
      />

      <!-- 卡片网格：宽屏一行两个、窄屏单列自适应；grid gap 同时提供横向/纵向间距（比 mb-4
           可靠，不被 Card 样式覆盖）；items-start 让各卡片按自身高度顶部对齐，不强行拉等高 -->
      <div class="grid grid-cols-1 items-start gap-4 xl:grid-cols-2">
        <Card title="节点媒体模型默认（image / tts / stt / video）">
          <template #extra>
            <span class="text-sm text-gray-400">
              列表为空＝不覆盖、回落本地；多个按顺序 failover
            </span>
          </template>
          <MediaForm />
        </Card>

        <Card title="平台默认 Agent 运行时模型">
          <template #extra>
            <span class="text-sm text-gray-400">
              留空＝跟随默认；分身详情页显式设置始终优先
            </span>
          </template>
          <RuntimeForm />
          <div class="mt-2 border-t border-gray-100 pt-4 dark:border-gray-700">
            <FallbackForm />
            <p class="mt-1 text-sm text-gray-400">
              主人只配主模型，平台维护此兜底池；分身主模型上游连续失败时，daemon
              按池中顺序（剔除主模型自身）切下一个，同一 new-api
              网关只换模型名。留空＝无兜底（单模型）。
            </p>
          </div>
        </Card>
      </div>

      <div class="mt-4 flex items-center gap-4">
        <Button type="primary" :loading="saving" @click="onSave">
          保存并下发
        </Button>
        <span v-if="revision" class="text-sm text-gray-500">
          当前版本 revision：<code>{{ revision }}</code>
          <template v-if="updatedBy"> · 最后修改人：{{ updatedBy }}</template>
          <template v-if="updatedTime"> · {{ updatedTime }}</template>
        </span>
      </div>
    </Spin>
  </Page>
</template>
