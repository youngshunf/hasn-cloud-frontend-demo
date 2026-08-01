import { describe, expect, it } from 'vitest';

import { platformUpgradeAdvisoryFieldLabel } from '../../../src/views/hasn/platform_default_config/advisory';

describe('平台默认配置升级提示', () => {
  it('将语音模型字段映射为管理员可读名称', () => {
    expect(platformUpgradeAdvisoryFieldLabel('node.media.tts_models')).toBe(
      '语音合成模型链（node.media.tts_models）',
    );
    expect(platformUpgradeAdvisoryFieldLabel('node.media.stt_models')).toBe(
      '语音识别模型链（node.media.stt_models）',
    );
  });
});
