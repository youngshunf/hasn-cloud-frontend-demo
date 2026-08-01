import type { PlatformConfigUpgradeAdvisoryFieldPath } from '#/api/hasn/platform_default_config';

const FIELD_LABELS: Record<PlatformConfigUpgradeAdvisoryFieldPath, string> = {
  'node.media.stt_models': '语音识别模型链（node.media.stt_models）',
  'node.media.tts_models': '语音合成模型链（node.media.tts_models）',
};

export function platformUpgradeAdvisoryFieldLabel(
  fieldPath: PlatformConfigUpgradeAdvisoryFieldPath,
): string {
  return FIELD_LABELS[fieldPath];
}
