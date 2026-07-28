import { describe, expect, it } from 'vitest';

import {
  bytesToStorageInput,
  storageInputToBytes,
} from '../../../src/views/user_tier/billing_plan/storageQuota';

describe('套餐存储权益换算', () => {
  it('将 GiB 精确换算为整数 bytes', () => {
    expect(storageInputToBytes(100, 'GiB')).toBe(107_374_182_400);
  });

  it('将 TiB 精确换算为整数 bytes', () => {
    expect(storageInputToBytes(1, 'TiB')).toBe(1_099_511_627_776);
  });

  it('拒绝零、负数、小数和超出安全整数的输入', () => {
    expect(() => storageInputToBytes(0, 'GiB')).toThrow();
    expect(() => storageInputToBytes(-1, 'GiB')).toThrow();
    expect(() => storageInputToBytes(1.5, 'GiB')).toThrow();
    expect(() => storageInputToBytes(Number.MAX_SAFE_INTEGER, 'TiB')).toThrow();
  });

  it('优先用可整除的 TiB 展示，否则回落 GiB', () => {
    expect(bytesToStorageInput(1_099_511_627_776)).toEqual({
      value: 1,
      unit: 'TiB',
    });
    expect(bytesToStorageInput(107_374_182_400)).toEqual({
      value: 100,
      unit: 'GiB',
    });
  });
});
