import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeGridProps } from '#/adapter/vxe-table';
import type { MarketplaceTemplateVersion } from '#/api/marketplace/marketplace_template_version';

import { $t } from '@vben/locales';

/**
 * Query form schema
 */
export const querySchema: VbenFormSchema[] = [
  {
    component: 'Input',
    fieldName: 'template_id',
    label: '关联的模板ID',
    componentProps: {
      placeholder: 'Search by \u5173\u8054\u7684\u6A21\u677FID',
    },
  },
  {
    component: 'RangePicker',
    fieldName: 'published_at',
    label: '发布时间',
    componentProps: { format: 'YYYY-MM-DD' },
  },
];

/**
 * Table columns configuration
 */
export function useColumns(
  onActionClick?: OnActionClickFn<MarketplaceTemplateVersion>,
): VxeGridProps['columns'] {
  return [
    {
      field: 'seq',
      title: $t('common.table.id'),
      type: 'seq',
      fixed: 'left',
      width: 50,
    },
    {
      field: 'template_id',
      title: '关联的模板ID',
      width: 150,
    },
    {
      field: 'version',
      title: '语义化版本号',
      width: 150,
    },
    {
      field: 'package_url',
      title: '完整包下载URL',
      width: 150,
    },
    {
      field: 'file_hash',
      title: 'SHA256校验值',
      width: 150,
    },
    {
      field: 'file_size',
      title: '包大小',
      width: 150,
    },
    {
      field: 'is_latest',
      title: '是否为最新版本',
      width: 150,
    },
    {
      field: 'published_at',
      title: '发布时间',
      width: 150,
    },
    {
      field: 'operation',
      title: $t('common.table.operation'),
      align: 'center',
      fixed: 'right',
      width: 150,
      cellRender: {
        attrs: {
          nameField: 'id',
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
    fieldName: 'template_id',
    label: '关联的模板ID',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'version',
    label: '语义化版本号',
    rules: 'required',
  },
  {
    component: 'Textarea',
    fieldName: 'changelog',
    label: '版本更新日志',
    componentProps: { rows: 4 },
  },
  {
    component: 'Textarea',
    fieldName: 'skill_dependencies_versioned',
    label: '带版本号的技能依赖',
    componentProps: { placeholder: 'Enter JSON', rows: 6 },
  },
  {
    component: 'Textarea',
    fieldName: 'package_url',
    label: '完整包下载URL',
    componentProps: { rows: 4 },
  },
  {
    component: 'Input',
    fieldName: 'file_hash',
    label: 'SHA256校验值',
  },
  {
    component: 'InputNumber',
    fieldName: 'file_size',
    label: '包大小',
    componentProps: { style: 'width: 100%' },
  },
  {
    component: 'Switch',
    fieldName: 'is_latest',
    label: '是否为最新版本',
  },
  {
    component: 'DatePicker',
    fieldName: 'published_at',
    label: '发布时间',
    rules: 'required',
    componentProps: {
      format: 'YYYY-MM-DD HH:mm:ss',
      showTime: true,
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
];
