import { requestClient } from '#/api/request';

export interface UploadImageResult {
  /** 稳定的 CDN / S3 公共桶 URL，可直接写入图标、封面等字段 */
  url: string;
}

/**
 * 通用图片上传到 S3 公共桶。
 *
 * - 后端：``POST /api/v1/sys/upload/image``（Owner JWT）。
 * - 支持格式：jpg / png / gif / webp，最大 10MB。
 * - 返回稳定 URL。
 */
export async function uploadImageApi(file: File): Promise<UploadImageResult> {
  return requestClient.upload<UploadImageResult>('/api/v1/sys/upload/image', {
    file,
  });
}
