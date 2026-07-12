<script setup lang="ts">
import type {
  AssetKind,
  PublishReleaseRequest,
} from '#/api/hasn_release/release_console';

import { computed, reactive, ref } from 'vue';

import { message } from 'antdv-next';

import {
  PLATFORM_TARGETS,
  uploadReleaseAssetApi,
} from '#/api/hasn_release/release_console';

/**
 * 桌面端「手动发布」表单：把各平台安装包 / 热更新包直接上传到七牛，
 * 前端拿回 CDN 直链 + sha256 + 大小后自动回填，管理员无需手写资产清单 JSON。
 *
 * 通过 defineExpose 暴露 resetForm / validateAndBuild 给父弹窗调用。
 */

// 平台目标的友好显示名（下拉里给人看，落库仍是 platform_target 原值）
const PLATFORM_LABELS: Record<string, string> = {
  'darwin-aarch64': 'macOS（Apple 芯片 arm64）',
  'darwin-x86_64': 'macOS（Intel x64）',
  'windows-x86_64': 'Windows（x64）',
  'linux-x86_64': 'Linux（x64）',
};

// 包类型选项：installer=下载页安装包，updater=Tauri 热更新包（必须带签名）
const KIND_OPTIONS: { hint: string; label: string; value: AssetKind }[] = [
  {
    value: 'installer',
    label: '安装包（dmg / msi / exe）',
    hint: '官网下载页用',
  },
  {
    value: 'updater',
    label: '热更新包（app.tar.gz / nsis.zip）',
    hint: '自动更新用，必须带 .sig 签名',
  },
];

const CHANNEL_OPTIONS = [
  { label: 'stable（稳定）', value: 'stable' },
  { label: 'beta（测试）', value: 'beta' },
];

// 单个资产行的本地状态（uploading / 上传回执 / 签名等仅前端用）
interface AssetRow {
  key: number;
  platform_target: string;
  asset_kind: AssetKind;
  // 上传成功后回填
  download_url: string;
  file_name: string;
  file_size: number;
  sha256: string;
  uploading: boolean;
  // updater 专属：minisign 签名（.sig 文件内容）
  signature: string;
  sig_file_name: string;
}

let rowSeq = 0;
function makeRow(kind: AssetKind = 'installer'): AssetRow {
  rowSeq += 1;
  return {
    key: rowSeq,
    platform_target: 'darwin-aarch64',
    asset_kind: kind,
    download_url: '',
    file_name: '',
    file_size: 0,
    sha256: '',
    uploading: false,
    signature: '',
    sig_file_name: '',
  };
}

// 顶部表单字段
const form = reactive({
  version: '',
  channel: 'stable',
  set_latest: true,
  release_notes_md: '',
  release_notes_en_md: '',
});

const assets = ref<AssetRow[]>([makeRow('installer')]);

// 版本号 + 渠道齐了才能上传（七牛对象键 desktop/{channel}/{version}/ 依赖它们）
const canUpload = computed(() => form.version.trim().length > 0);

function addAsset(kind: AssetKind = 'installer') {
  assets.value = [...assets.value, makeRow(kind)];
}

function removeAsset(key: number) {
  assets.value = assets.value.filter((a) => a.key !== key);
}

function formatSize(bytes: number): string {
  if (!bytes) return '';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

// 某一行的包文件上传：走 admin /upload → 回填 download_url/sha256/file_size
function makeUploadRequest(row: AssetRow) {
  return async (options: any) => {
    const { file, onError, onSuccess } = options;
    if (!canUpload.value) {
      message.warning('请先填写版本号');
      onError?.(new Error('版本号未填写'));
      return;
    }
    row.uploading = true;
    try {
      const res = await uploadReleaseAssetApi(
        file as File,
        form.version.trim(),
        form.channel,
      );
      row.download_url = res.download_url;
      row.file_name = res.file_name;
      row.file_size = res.file_size;
      row.sha256 = res.sha256;
      onSuccess?.(res);
      message.success(`已上传 ${res.file_name}`);
    } catch (error) {
      onError?.(error as Error);
      message.error('上传失败，请重试');
    } finally {
      row.uploading = false;
    }
  };
}

// updater 行的 .sig 文件：本地读取文本作为 signature，不上传（manifest 内联签名）
function makeSigBeforeUpload(row: AssetRow) {
  return async (file: File) => {
    try {
      const text = await file.text();
      row.signature = text.trim();
      row.sig_file_name = file.name;
      message.success(`已读取签名 ${file.name}`);
    } catch {
      message.error('读取 .sig 失败');
    }
    return false; // 阻止 antd 自动上传，只取文本
  };
}

function resetForm() {
  form.version = '';
  form.channel = 'stable';
  form.set_latest = true;
  form.release_notes_md = '';
  form.release_notes_en_md = '';
  assets.value = [makeRow('installer')];
}

// 校验并组装发布请求体；不合法时给出提示并返回 null
async function validateAndBuild(): Promise<null | PublishReleaseRequest> {
  if (!form.version.trim()) {
    message.error('请填写版本号');
    return null;
  }
  if (assets.value.length === 0) {
    message.error('至少需要一个发布资产');
    return null;
  }
  for (const [i, a] of assets.value.entries()) {
    const label = `第 ${i + 1} 个资产`;
    if (!a.download_url) {
      message.error(`${label} 尚未上传文件`);
      return null;
    }
    if (a.asset_kind === 'updater' && !a.signature.trim()) {
      message.error(`${label} 是热更新包，必须提供 .sig 签名`);
      return null;
    }
  }
  return {
    version: form.version.trim(),
    channel: form.channel,
    set_latest: form.set_latest,
    release_notes_md: form.release_notes_md || null,
    release_notes_en_md: form.release_notes_en_md || null,
    source: 'manual',
    assets: assets.value.map((a) => ({
      platform_target: a.platform_target,
      asset_kind: a.asset_kind,
      download_url: a.download_url,
      file_name: a.file_name,
      file_size: a.file_size,
      sha256: a.sha256,
      signature: a.asset_kind === 'updater' ? a.signature.trim() : null,
    })),
  };
}

defineExpose({ resetForm, validateAndBuild });
</script>

<template>
  <a-form layout="vertical">
    <!-- 顶部：版本 / 渠道 / 置为最新 -->
    <div class="grid grid-cols-2 gap-x-4">
      <a-form-item label="版本号" required>
        <a-input v-model:value="form.version" placeholder="semver，如 1.2.0" />
      </a-form-item>
      <a-form-item label="渠道" required>
        <a-select v-model:value="form.channel" :options="CHANNEL_OPTIONS" />
      </a-form-item>
    </div>

    <a-form-item>
      <a-switch v-model:checked="form.set_latest" />
      <span class="ml-2 text-sm">发布后置为该渠道最新（官网/桌面端据此下载与更新）</span>
    </a-form-item>

    <div class="grid grid-cols-2 gap-x-4">
      <a-form-item label="更新日志（中）">
        <a-textarea
          v-model:value="form.release_notes_md"
          :rows="3"
          placeholder="支持 Markdown"
        />
      </a-form-item>
      <a-form-item label="更新日志（英）">
        <a-textarea
          v-model:value="form.release_notes_en_md"
          :rows="3"
          placeholder="Markdown, optional"
        />
      </a-form-item>
    </div>

    <!-- 资产上传区 -->
    <div class="mb-2 flex items-center justify-between">
      <span class="font-medium">平台资产</span>
      <span v-if="!canUpload" class="text-xs text-amber-600">
        请先填写版本号再上传
      </span>
    </div>

    <div
      v-for="row in assets"
      :key="row.key"
      class="mb-3 rounded-lg border border-gray-200 p-3"
    >
      <div class="grid grid-cols-2 gap-x-4">
        <a-form-item label="平台" class="!mb-2">
          <a-select v-model:value="row.platform_target">
            <a-select-option
              v-for="pt in PLATFORM_TARGETS"
              :key="pt"
              :value="pt"
            >
              {{ PLATFORM_LABELS[pt] || pt }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="包类型" class="!mb-2">
          <a-select v-model:value="row.asset_kind">
            <a-select-option
              v-for="k in KIND_OPTIONS"
              :key="k.value"
              :value="k.value"
            >
              {{ k.label }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </div>

      <!-- 包文件上传 -->
      <div class="flex items-center gap-3">
        <a-upload
          :show-upload-list="false"
          :custom-request="makeUploadRequest(row)"
          :disabled="!canUpload || row.uploading"
        >
          <a-button :loading="row.uploading" :disabled="!canUpload">
            {{ row.download_url ? '重新上传' : '上传包文件' }}
          </a-button>
        </a-upload>
        <template v-if="row.download_url">
          <a-tag color="success">✓ {{ row.file_name }}</a-tag>
          <span class="text-xs text-gray-500">
            {{ formatSize(row.file_size) }} · sha256:{{
              row.sha256.slice(0, 12)
            }}…
          </span>
        </template>
        <span v-else class="text-xs text-gray-400">尚未上传</span>
      </div>

      <!-- updater 专属：.sig 签名 -->
      <div
        v-if="row.asset_kind === 'updater'"
        class="mt-3 border-t border-dashed border-gray-200 pt-3"
      >
        <div class="mb-1 text-xs text-gray-500">
          热更新包必须携带 Tauri 签名：上传 .sig
          文件（自动读取内容）或直接粘贴。
        </div>
        <div class="flex items-center gap-3">
          <a-upload
            :show-upload-list="false"
            :before-upload="makeSigBeforeUpload(row)"
            accept=".sig"
          >
            <a-button size="small">上传 .sig</a-button>
          </a-upload>
          <a-tag v-if="row.sig_file_name" color="success">
            ✓ {{ row.sig_file_name }}
          </a-tag>
        </div>
        <a-textarea
          v-model:value="row.signature"
          :rows="2"
          class="mt-2"
          placeholder="或直接粘贴 .sig 文件内容（dW50cnVzdGVk...）"
        />
      </div>

      <div class="mt-2 text-right">
        <a-button
          type="link"
          danger
          size="small"
          :disabled="assets.length <= 1"
          @click="removeAsset(row.key)"
        >
          移除该资产
        </a-button>
      </div>
    </div>

    <div class="flex gap-2">
      <a-button type="dashed" block @click="() => addAsset('installer')">
        + 添加安装包
      </a-button>
      <a-button type="dashed" block @click="() => addAsset('updater')">
        + 添加热更新包
      </a-button>
    </div>
  </a-form>
</template>
