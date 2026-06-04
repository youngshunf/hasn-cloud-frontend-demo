import type { VbenFormSchema } from '#/adapter/form';
import type {
  OnActionClickFn,
  VxeGridProps,
} from '#/adapter/vxe-table';
import type { S3Storage } from '#/api/storage/s3_storage';

import { $t } from '@vben/locales';

/**
 * Query form schema
 */
export const querySchema: VbenFormSchema[] = [
  {
    component: 'Input',
    fieldName: 'name',
    label: '存储名称',
    componentProps: { placeholder: '请输入存储名称' },
  },
  {
    component: 'Input',
    fieldName: 'region',
    label: '区域',
    componentProps: { placeholder: '请输入区域' },
  },
];

/**
 * Table columns configuration
 */
export function useColumns(
  onActionClick?: OnActionClickFn<S3Storage>,
): VxeGridProps['columns'] {
  return [
    {
      field: 'seq',
      title: $t('common.table.id'),
      type: 'seq',
      fixed: 'left',
      width: 60,
    },
    {
      field: 'name',
      title: '存储名称',
      minWidth: 120,
    },
    {
      field: 'endpoint',
      title: '终端节点',
      minWidth: 200,
    },
    {
      field: 'bucket',
      title: '存储桶',
      minWidth: 120,
    },
    {
      field: 'access',
      title: '访问类型',
      width: 100,
      formatter: ({ cellValue }) => (cellValue === 'public' ? '公共' : '私有'),
    },
    {
      field: 'sign_strategy',
      title: '签名策略',
      width: 140,
      formatter: ({ cellValue }) => {
        const map: Record<string, string> = {
          s3_presign: 'S3 预签名',
          cdn_timestamp: 'CDN 时间戳',
          nginx_secure_link: 'Nginx 防盗链',
        };
        return map[cellValue as string] ?? (cellValue as string) ?? '';
      },
    },
    {
      field: 'region',
      title: '区域',
      width: 100,
    },
    {
      field: 'prefix',
      title: '前缀',
      width: 120,
    },
    {
      field: 'cdn_domain',
      title: 'CDN域名',
      minWidth: 180,
    },
    {
      field: 'remark',
      title: '备注',
      minWidth: 150,
    },
    {
      field: 'created_time',
      title: '创建时间',
      width: 160,
      formatter: 'formatDateTime',
    },
    {
      field: 'operation',
      title: $t('common.table.operation'),
      align: 'center',
      fixed: 'right',
      width: 150,
      cellRender: {
        attrs: {
          nameField: 'name',
          onClick: onActionClick,
        },
        name: 'CellOperation',
        options: ['edit', 'delete'],
      },
    },
  ];
}

/**
 * Form schema for add/edit
 */
export const formSchema: VbenFormSchema[] = [
  {
    component: 'Input',
    fieldName: 'name',
    label: '存储名称',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'endpoint',
    label: '终端节点 URL',
    rules: 'required',
    componentProps: { placeholder: 'https://s3.amazonaws.com' },
  },
  {
    component: 'Input',
    fieldName: 'access_key',
    label: '访问密钥 (Access Key)',
    rules: 'required',
  },
  {
    component: 'InputPassword',
    fieldName: 'secret_key',
    label: '密钥 (Secret Key)',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'bucket',
    label: '存储桶名称',
    rules: 'required',
  },
  {
    component: 'Select',
    fieldName: 'access',
    label: '访问类型',
    defaultValue: 'private',
    rules: 'required',
    componentProps: {
      allowClear: false,
      options: [
        { label: '私有（签名访问，如私信附件）', value: 'private' },
        { label: '公共（CDN 直读不签名，如头像/帖图）', value: 'public' },
      ],
    },
  },
  {
    component: 'Select',
    fieldName: 'sign_strategy',
    label: '签名策略',
    defaultValue: 's3_presign',
    componentProps: {
      allowClear: false,
      placeholder: '私有时生效',
      options: [
        { label: 'S3 预签名', value: 's3_presign' },
        { label: 'CDN 时间戳防盗链', value: 'cdn_timestamp' },
        { label: 'Nginx 防盗链', value: 'nginx_secure_link' },
      ],
    },
  },
  {
    component: 'Input',
    fieldName: 'prefix',
    label: '路径前缀',
    componentProps: { placeholder: '可选，如: uploads/' },
  },
  {
    component: 'Input',
    fieldName: 'region',
    label: '区域',
    componentProps: { placeholder: '可选，如: us-east-1' },
  },
  {
    component: 'Input',
    fieldName: 'cdn_domain',
    label: 'CDN域名',
    componentProps: { placeholder: '可选，如: https://cdn.example.com' },
  },
  {
    component: 'Textarea',
    fieldName: 'remark',
    label: '备注',
    componentProps: { rows: 3 },
  },
];
