<script setup lang="ts">
import type { UploadProps } from 'antdv-next';

import { computed, ref } from 'vue';

import { message } from 'antdv-next';

import { uploadImageApi } from '#/api';

interface Props {
  /** 当前图标资产 URL（公共桶），由 vben form 以 v-model 绑定 */
  modelValue?: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
});

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const ALLOWED_MIME = new Set([
  'image/gif',
  'image/jpeg',
  'image/png',
  'image/svg+xml',
  'image/webp',
]);
const MAX_MB = 10;

const uploading = ref(false);

const previewUrl = computed(() => props.modelValue || '');

const beforeUpload: UploadProps['beforeUpload'] = (file) => {
  if (!ALLOWED_MIME.has(file.type)) {
    message.error('仅支持 jpg、png、gif、webp、svg 格式');
    return false;
  }
  if (file.size / 1024 / 1024 > MAX_MB) {
    message.error(`图片大小不能超过 ${MAX_MB}MB`);
    return false;
  }
  return true;
};

// antd Upload 自定义上传：走云端公共桶上传接口，成功后把稳定 URL 写回表单字段
async function customRequest(options: any) {
  const { file, onError, onSuccess } = options;
  uploading.value = true;
  try {
    const { url } = await uploadImageApi(file as File);
    emit('update:modelValue', url);
    onSuccess?.(url);
    message.success('图标上传成功');
  } catch (error) {
    onError?.(error as Error);
    message.error('图标上传失败');
  } finally {
    uploading.value = false;
  }
}

function handleRemove() {
  emit('update:modelValue', '');
}
</script>

<template>
  <div class="flex items-center gap-3">
    <a-upload
      list-type="picture-card"
      :show-upload-list="false"
      accept="image/jpeg,image/png,image/gif,image/webp,image/svg+xml"
      :before-upload="beforeUpload"
      :custom-request="customRequest"
    >
      <a-spin v-if="uploading" />
      <img
        v-else-if="previewUrl"
        :src="previewUrl"
        alt="应用图标"
        class="size-full rounded object-contain"
      />
      <div
        v-else
        class="flex flex-col items-center justify-center text-gray-400"
      >
        <span class="text-lg leading-none">+</span>
        <span class="mt-1 text-xs">上传图标</span>
      </div>
    </a-upload>
    <a-button
      v-if="previewUrl && !uploading"
      type="link"
      danger
      size="small"
      @click="handleRemove"
    >
      移除
    </a-button>
  </div>
</template>
