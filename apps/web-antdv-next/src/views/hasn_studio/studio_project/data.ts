import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeGridProps } from '#/adapter/vxe-table';
import type { StudioProject } from '#/api/hasn_studio/studio_project';

import { $t } from '@vben/locales';

import { getDictOptions } from '#/utils/dict';

/**
 * Query form schema
 */
export const querySchema: VbenFormSchema[] = [
  {
    component: 'Input',
    fieldName: 'owner_hasn_id',
    label: '归属主人 hasn_id',
    componentProps: {
      placeholder:
        'Search by \u5F52\u5C5E\u4E3B\u4EBA hasn_id\uFF08\u884C\u7EA7\u9694\u79BB\u952E\uFF09',
    },
  },
  {
    component: 'Input',
    fieldName: 'agent_hasn_id',
    label: '创建/默认协作分身 hasn_id',
    componentProps: {
      placeholder:
        'Search by \u521B\u5EFA/\u9ED8\u8BA4\u534F\u4F5C\u5206\u8EAB hasn_id\uFF08\u521B\u5EFA\u5E26\u5F52\u5C5E\u8D44\u6E90\u9ED8\u8BA4\u53D6\u51ED\u8BC1\u8EAB\u4EFD\uFF0CPLANFIX-6\uFF09',
    },
  },
  {
    component: 'Input',
    fieldName: 'title',
    label: '项目标题',
    componentProps: { placeholder: 'Search by \u9879\u76EE\u6807\u9898' },
  },
  {
    component: 'Input',
    fieldName: 'bound_agent_id',
    label: '项目绑定协作分身 hasn_id',
    componentProps: {
      placeholder:
        'Search by \u9879\u76EE\u7ED1\u5B9A\u534F\u4F5C\u5206\u8EAB hasn_id\uFF08BoundAgentControl\uFF0C\u5BF9\u9F50 CRX-3/DECKBIND\uFF09',
    },
  },
  {
    component: 'Select',
    fieldName: 'status',
    label: '状态',
    componentProps: {
      allowClear: true,
      options: getDictOptions('hasn_studio_status'),
    },
  },
];

/**
 * Table columns configuration
 */
export function useColumns(
  onActionClick?: OnActionClickFn<StudioProject>,
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
      field: 'owner_hasn_id',
      title: '归属主人 hasn_id',
      width: 150,
    },
    {
      field: 'agent_hasn_id',
      title: '创建/默认协作分身 hasn_id',
      width: 150,
    },
    {
      field: 'title',
      title: '项目标题',
      width: 150,
    },
    {
      field: 'default_pipeline_key',
      title: '项目默认管线 key',
      width: 150,
    },
    {
      field: 'cover_asset_uri',
      title: '封面资产 hasn',
      width: 150,
    },
    {
      field: 'bound_agent_id',
      title: '项目绑定协作分身 hasn_id',
      width: 150,
    },
    {
      field: 'status',
      title: '状态',
      width: 150,
      cellRender: {
        name: 'CellTag',
        options: getDictOptions('hasn_studio_status'),
      },
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
    fieldName: 'owner_hasn_id',
    label: '归属主人 hasn_id',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'agent_hasn_id',
    label: '创建/默认协作分身 hasn_id',
  },
  {
    component: 'Input',
    fieldName: 'title',
    label: '项目标题',
    rules: 'required',
  },
  {
    component: 'Textarea',
    fieldName: 'description',
    label: '项目说明',
    componentProps: { rows: 4 },
  },
  {
    component: 'Input',
    fieldName: 'default_pipeline_key',
    label: '项目默认管线 key',
  },
  {
    component: 'Textarea',
    fieldName: 'settings',
    label: '项目设置 jsonb',
    rules: 'required',
    componentProps: { placeholder: 'Enter JSON', rows: 6 },
  },
  {
    component: 'Textarea',
    fieldName: 'cover_asset_uri',
    label: '封面资产 hasn',
    componentProps: { rows: 4 },
  },
  {
    component: 'Input',
    fieldName: 'bound_agent_id',
    label: '项目绑定协作分身 hasn_id',
  },
  {
    component: 'Select',
    fieldName: 'status',
    label: '状态',
    rules: 'required',
    componentProps: {
      options: getDictOptions('hasn_studio_status'),
    },
  },
];
