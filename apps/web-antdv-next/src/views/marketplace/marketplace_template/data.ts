import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeGridProps } from '#/adapter/vxe-table';
import type { MarketplaceTemplate } from '#/api/marketplace/marketplace_template';

import { $t } from '@vben/locales';

import { getDictOptions } from '#/utils/dict';

/**
 * Query form schema
 */
export const querySchema: VbenFormSchema[] = [
  {
    component: 'Input',
    fieldName: 'template_id',
    label: '模板唯一标识',
    componentProps: {
      placeholder: 'Search by \u6A21\u677F\u552F\u4E00\u6807\u8BC6',
    },
  },
  {
    component: 'Input',
    fieldName: 'namespace',
    label: '命名空间',
    componentProps: {
      placeholder:
        'Search by \u547D\u540D\u7A7A\u95F4\uFF08\u5982 huanxing/clawhub\uFF09',
    },
  },
  {
    component: 'Select',
    fieldName: 'template_type',
    label: '模板类型',
    componentProps: {
      allowClear: true,
      options: getDictOptions('marketplace_template_type'),
    },
  },
  {
    component: 'Input',
    fieldName: 'name',
    label: '模板名称',
    componentProps: { placeholder: 'Search by \u6A21\u677F\u540D\u79F0' },
  },
  {
    component: 'Input',
    fieldName: 'name_en',
    label: '英文名称',
    componentProps: { placeholder: 'Search by \u82F1\u6587\u540D\u79F0' },
  },
  {
    component: 'Input',
    fieldName: 'name_zh',
    label: '中文名称',
    componentProps: { placeholder: 'Search by \u4E2D\u6587\u540D\u79F0' },
  },
  {
    component: 'InputNumber',
    fieldName: 'author_id',
    label: '作者用户ID',
    componentProps: { style: 'width: 100%' },
  },
  {
    component: 'Input',
    fieldName: 'author_name',
    label: '作者名称',
    componentProps: { placeholder: 'Search by \u4F5C\u8005\u540D\u79F0' },
  },
  {
    component: 'Select',
    fieldName: 'pricing_type',
    label: '定价类型',
    componentProps: {
      allowClear: true,
      options: getDictOptions('marketplace_pricing_type'),
    },
  },
  {
    component: 'Select',
    fieldName: 'category',
    label: '分类',
    componentProps: {
      allowClear: true,
      options: getDictOptions('marketplace_category'),
    },
  },
  {
    component: 'Select',
    fieldName: 'source_type',
    label: '来源类型',
    componentProps: {
      allowClear: true,
      options: getDictOptions('marketplace_source_type'),
    },
  },
];

/**
 * Table columns configuration
 */
export function useColumns(
  onActionClick?: OnActionClickFn<MarketplaceTemplate>,
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
      title: '模板唯一标识',
      width: 150,
    },
    {
      field: 'namespace',
      title: '命名空间',
      width: 150,
    },
    {
      field: 'slug',
      title: '模板标识符',
      width: 150,
    },
    {
      field: 'template_type',
      title: '模板类型',
      width: 150,
      cellRender: {
        name: 'CellTag',
        options: getDictOptions('marketplace_template_type'),
      },
    },
    {
      field: 'name',
      title: '模板名称',
      width: 150,
    },
    {
      field: 'name_en',
      title: '英文名称',
      width: 150,
    },
    {
      field: 'name_zh',
      title: '中文名称',
      width: 150,
    },
    {
      field: 'source_language',
      title: '源语言',
      width: 150,
    },
    {
      field: 'icon_url',
      title: '模板图标URL',
      width: 150,
    },
    {
      field: 'emoji',
      title: 'emoji图标',
      width: 150,
    },
    {
      field: 'author_id',
      title: '作者用户ID',
      width: 150,
    },
    {
      field: 'author_name',
      title: '作者名称',
      width: 150,
    },
    {
      field: 'pricing_type',
      title: '定价类型',
      width: 150,
      cellRender: {
        name: 'CellTag',
        options: getDictOptions('marketplace_pricing_type'),
      },
    },
    {
      field: 'price',
      title: '价格',
      width: 150,
    },
    {
      field: 'is_private',
      title: '是否私有',
      width: 150,
    },
    {
      field: 'is_official',
      title: '是否官方模板',
      width: 150,
    },
    {
      field: 'download_count',
      title: '下载次数',
      width: 150,
    },
    {
      field: 'category',
      title: '分类',
      width: 150,
      cellRender: {
        name: 'CellTag',
        options: getDictOptions('marketplace_category'),
      },
    },
    {
      field: 'tags',
      title: '标签，逗号分隔',
      width: 150,
    },
    {
      field: 'source_type',
      title: '来源类型',
      width: 150,
      cellRender: {
        name: 'CellTag',
        options: getDictOptions('marketplace_source_type'),
      },
    },
    {
      field: 'source_repo_url',
      title: '源仓库 URL',
      width: 150,
    },
    {
      field: 'source_repo_path',
      title: '仓库内路径',
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
    label: '模板唯一标识',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'namespace',
    label: '命名空间',
  },
  {
    component: 'Input',
    fieldName: 'slug',
    label: '模板标识符',
  },
  {
    component: 'Select',
    fieldName: 'template_type',
    label: '模板类型',
    rules: 'required',
    componentProps: {
      options: getDictOptions('marketplace_template_type'),
    },
  },
  {
    component: 'Input',
    fieldName: 'name',
    label: '模板名称',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'name_en',
    label: '英文名称',
  },
  {
    component: 'Input',
    fieldName: 'name_zh',
    label: '中文名称',
  },
  {
    component: 'Textarea',
    fieldName: 'description',
    label: '模板描述',
    componentProps: { rows: 4 },
  },
  {
    component: 'Textarea',
    fieldName: 'description_en',
    label: '英文描述',
    componentProps: { rows: 4 },
  },
  {
    component: 'Textarea',
    fieldName: 'description_zh',
    label: '中文描述',
    componentProps: { rows: 4 },
  },
  {
    component: 'Input',
    fieldName: 'source_language',
    label: '源语言',
  },
  {
    component: 'Textarea',
    fieldName: 'icon_url',
    label: '模板图标URL',
    componentProps: { rows: 4 },
  },
  {
    component: 'Input',
    fieldName: 'emoji',
    label: 'emoji图标',
  },
  {
    component: 'InputNumber',
    fieldName: 'author_id',
    label: '作者用户ID',
    componentProps: { style: 'width: 100%' },
  },
  {
    component: 'Input',
    fieldName: 'author_name',
    label: '作者名称',
  },
  {
    component: 'Select',
    fieldName: 'pricing_type',
    label: '定价类型',
    rules: 'required',
    componentProps: {
      options: getDictOptions('marketplace_pricing_type'),
    },
  },
  {
    component: 'InputNumber',
    fieldName: 'price',
    label: '价格',
    rules: 'required',
    componentProps: { style: 'width: 100%' },
  },
  {
    component: 'Switch',
    fieldName: 'is_private',
    label: '是否私有',
  },
  {
    component: 'Switch',
    fieldName: 'is_official',
    label: '是否官方模板',
  },
  {
    component: 'InputNumber',
    fieldName: 'download_count',
    label: '下载次数',
    rules: 'required',
    componentProps: { style: 'width: 100%' },
  },
  {
    component: 'Select',
    fieldName: 'category',
    label: '分类',
    componentProps: {
      options: getDictOptions('marketplace_category'),
    },
  },
  {
    component: 'Textarea',
    fieldName: 'tags',
    label: '标签，逗号分隔',
    componentProps: { rows: 4 },
  },
  {
    component: 'Select',
    fieldName: 'source_type',
    label: '来源类型',
    componentProps: {
      options: getDictOptions('marketplace_source_type'),
    },
  },
  {
    component: 'Textarea',
    fieldName: 'source_repo_url',
    label: '源仓库 URL',
    componentProps: { rows: 4 },
  },
  {
    component: 'Textarea',
    fieldName: 'source_repo_path',
    label: '仓库内路径',
    componentProps: { rows: 4 },
  },
  {
    component: 'Textarea',
    fieldName: 'skill_dependencies',
    label: '依赖的技能ID列表，逗号分隔',
    componentProps: { rows: 4 },
  },
  {
    component: 'Textarea',
    fieldName: 'sop_dependencies',
    label: '依赖的SOP ID列表，逗号分隔',
    componentProps: { rows: 4 },
  },
];
