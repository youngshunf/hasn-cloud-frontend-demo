export type StorageQuotaUnit = 'GiB' | 'TiB';

const GIB_BYTES = 1024 ** 3;
const TIB_BYTES = 1024 ** 4;

const UNIT_BYTES: Record<StorageQuotaUnit, number> = {
  GiB: GIB_BYTES,
  TiB: TIB_BYTES,
};

export function storageInputToBytes(
  value: number,
  unit: StorageQuotaUnit,
): number {
  if (!Number.isInteger(value) || value <= 0) {
    throw new Error('存储空间必须是正整数');
  }
  const bytes = value * UNIT_BYTES[unit];
  if (!Number.isSafeInteger(bytes)) {
    throw new TypeError('存储空间超出安全整数范围');
  }
  return bytes;
}

export function bytesToStorageInput(bytes: number): {
  unit: StorageQuotaUnit;
  value: number;
} {
  if (!Number.isSafeInteger(bytes) || bytes < 0) {
    throw new Error('存储空间字节数无效');
  }
  if (bytes > 0 && bytes % TIB_BYTES === 0) {
    return { unit: 'TiB', value: bytes / TIB_BYTES };
  }
  if (bytes % GIB_BYTES === 0) {
    return { unit: 'GiB', value: bytes / GIB_BYTES };
  }
  throw new Error('存储空间必须能精确换算为 GiB 或 TiB');
}

export function formatStorageBytes(bytes: number): string {
  const input = bytesToStorageInput(bytes);
  return `${input.value} ${input.unit}`;
}
