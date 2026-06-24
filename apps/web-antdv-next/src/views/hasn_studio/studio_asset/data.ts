import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeGridProps } from '#/adapter/vxe-table';
import type { StudioAsset } from '#/api/hasn_studio/studio_asset';

import { $t } from '@vben/locales';

/**
 * Query form schema
 */
export const querySchema: VbenFormSchema[] = [
  {
    component: 'InputNumber',
    fieldName: 'project_id',
    label: '所属项目 id',
    componentProps: { style: 'width: 100%' },
  },
  {
    component: 'Input',
    fieldName: 'owner_hasn_id',
    label: '归属主人 hasn_id',
    componentProps: {
      placeholder:
        'Search by \u5F52\u5C5E\u4E3B\u4EBA hasn_id\uFF08\u5197\u4F59\u514D join\uFF0C\u884C\u7EA7\u9694\u79BB\uFF09',
    },
  },
  {
    component: 'Input',
    fieldName: 'title',
    label: '素材显示名',
    componentProps: { placeholder: 'Search by \u7D20\u6750\u663E\u793A\u540D' },
  },
];

/**
 * Table columns configuration
 */
export function useColumns(
  onActionClick?: OnActionClickFn<StudioAsset>,
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
      field: 'project_id',
      title: '所属项目 id',
      width: 150,
    },
    {
      field: 'owner_hasn_id',
      title: '归属主人 hasn_id',
      width: 150,
    },
    {
      field: 'kind',
      title: '素材类型',
      width: 150,
    },
    {
      field: 'asset_uri',
      title: '素材本体 hasn',
      width: 150,
    },
    {
      field: 'source',
      title: '素材来源',
      width: 150,
    },
    {
      field: 'title',
      title: '素材显示名',
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
    component: 'InputNumber',
    fieldName: 'project_id',
    label: '所属项目 id',
    rules: 'required',
    componentProps: { style: 'width: 100%' },
  },
  {
    component: 'Input',
    fieldName: 'owner_hasn_id',
    label: '归属主人 hasn_id',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'kind',
    label: '素材类型',
    rules: 'required',
  },
  {
    component: 'Textarea',
    fieldName: 'asset_uri',
    label: '素材本体 hasn',
    rules: 'required',
    componentProps: { rows: 4 },
  },
  {
    component: 'Input',
    fieldName: 'source',
    label: '素材来源',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'title',
    label: '素材显示名',
  },
  {
    component: 'Textarea',
    fieldName: 'meta',
    label: '素材元数据 jsonb',
    rules: 'required',
    componentProps: { placeholder: 'Enter JSON', rows: 6 },
  },
];
