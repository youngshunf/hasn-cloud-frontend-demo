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

import { mediaSchema, runtimeSchema } from './data';

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
  });
  await runtimeFormApi.setValues({
    main: models?.main ?? '',
    fast: models?.fast ?? '',
    vision: models?.vision ?? '',
    delegation: models?.delegation ?? '',
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
  const [mediaValid, runtimeValid] = await Promise.all([
    mediaFormApi.validate(),
    runtimeFormApi.validate(),
  ]);
  if (!mediaValid.valid || !runtimeValid.valid) {
    return;
  }

  const mediaValues = await mediaFormApi.getValues();
  const runtimeValues = await runtimeFormApi.getValues();

  const payload: PlatformDefaultConfig = {
    node: {
      media: {
        image_models: normalizeModelList(mediaValues.image_models),
        tts_models: normalizeModelList(mediaValues.tts_models),
        stt_models: normalizeModelList(mediaValues.stt_models),
      },
    },
    agent_runtime: {
      models: {
        main: normalizeModelSlot(runtimeValues.main),
        fast: normalizeModelSlot(runtimeValues.fast),
        vision: normalizeModelSlot(runtimeValues.vision),
        delegation: normalizeModelSlot(runtimeValues.delegation),
      },
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

      <Card class="mb-4" title="节点媒体模型默认（image / tts / stt）">
        <template #extra>
          <span class="text-sm text-gray-400">
            列表为空表示不覆盖，回落桌面端本地配置；多个模型按顺序 failover
          </span>
        </template>
        <MediaForm />
      </Card>

      <Card class="mb-4" title="平台默认 Agent 运行时模型">
        <template #extra>
          <span class="text-sm text-gray-400">
            留空表示「跟随默认」；分身在详情页显式设置的模型始终优先
          </span>
        </template>
        <RuntimeForm />
      </Card>

      <div class="flex items-center gap-4">
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
