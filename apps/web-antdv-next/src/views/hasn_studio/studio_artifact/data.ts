import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeGridProps } from '#/adapter/vxe-table';
import type { StudioArtifact } from '#/api/hasn_studio/studio_artifact';

import { $t } from '@vben/locales';

import { getDictOptions } from '#/utils/dict';

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
    component: 'InputNumber',
    fieldName: 'render_job_id',
    label: '产出该成品的渲染 job id',
    componentProps: { style: 'width: 100%' },
  },
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
    label: '协作分身 hasn_id',
    componentProps: {
      placeholder:
        'Search by \u534F\u4F5C\u5206\u8EAB hasn_id\uFF08AgentIdentity \u5C55\u793A\uFF09',
    },
  },
  {
    component: 'Input',
    fieldName: 'title',
    label: '成品标题',
    componentProps: { placeholder: 'Search by \u6210\u54C1\u6807\u9898' },
  },
  {
    component: 'Input',
    fieldName: 'video_asset_uri',
    label: '成片 mp4 hasn',
    componentProps: {
      placeholder:
        'Search by \u6210\u7247 mp4 hasn://asset/\uFF08\u5E8F\u5217\u5316\u8FB9\u754C\u6362 CDN \u7B7E\u540D URL\uFF0C\u4E0D\u5B58\u76F4\u94FE\uFF09',
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
  {
    component: 'Select',
    fieldName: 'origin_type',
    label: '续接归属来源',
    componentProps: {
      allowClear: true,
      options: getDictOptions('hasn_studio_origin_type'),
    },
  },
  {
    component: 'Input',
    fieldName: 'active_work_session_id',
    label: '「改一版」回到同一工作会话 id',
    componentProps: {
      placeholder:
        'Search by \u300C\u6539\u4E00\u7248\u300D\u56DE\u5230\u540C\u4E00\u5DE5\u4F5C\u4F1A\u8BDD id\uFF08AC-P2\uFF09',
    },
  },
];

/**
 * Table columns configuration
 */
export function useColumns(
  onActionClick?: OnActionClickFn<StudioArtifact>,
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
      field: 'render_job_id',
      title: '产出该成品的渲染 job id',
      width: 150,
    },
    {
      field: 'owner_hasn_id',
      title: '归属主人 hasn_id',
      width: 150,
    },
    {
      field: 'agent_hasn_id',
      title: '协作分身 hasn_id',
      width: 150,
    },
    {
      field: 'title',
      title: '成品标题',
      width: 150,
    },
    {
      field: 'pipeline_key',
      title: '用了哪条管线 key',
      width: 150,
    },
    {
      field: 'video_asset_uri',
      title: '成片 mp4 hasn',
      width: 150,
    },
    {
      field: 'thumbnail_asset_uri',
      title: '缩略图/首帧 hasn',
      width: 150,
    },
    {
      field: 'duration_sec',
      title: '时长',
      width: 150,
    },
    {
      field: 'resolution',
      title: '分辨率',
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
      field: 'origin_type',
      title: '续接归属来源',
      width: 150,
      cellRender: {
        name: 'CellTag',
        options: getDictOptions('hasn_studio_origin_type'),
      },
    },
    {
      field: 'active_work_session_id',
      title: '「改一版」回到同一工作会话 id',
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
    component: 'InputNumber',
    fieldName: 'render_job_id',
    label: '产出该成品的渲染 job id',
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
    fieldName: 'agent_hasn_id',
    label: '协作分身 hasn_id',
  },
  {
    component: 'Input',
    fieldName: 'title',
    label: '成品标题',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'pipeline_key',
    label: '用了哪条管线 key',
  },
  {
    component: 'Textarea',
    fieldName: 'video_asset_uri',
    label: '成片 mp4 hasn',
    rules: 'required',
    componentProps: { rows: 4 },
  },
  {
    component: 'Textarea',
    fieldName: 'thumbnail_asset_uri',
    label: '缩略图/首帧 hasn',
    componentProps: { rows: 4 },
  },
  {
    component: 'InputNumber',
    fieldName: 'duration_sec',
    label: '时长',
    componentProps: { style: 'width: 100%' },
  },
  {
    component: 'Input',
    fieldName: 'resolution',
    label: '分辨率',
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
  {
    component: 'Select',
    fieldName: 'origin_type',
    label: '续接归属来源',
    rules: 'required',
    componentProps: {
      options: getDictOptions('hasn_studio_origin_type'),
    },
  },
  {
    component: 'Input',
    fieldName: 'active_work_session_id',
    label: '「改一版」回到同一工作会话 id',
  },
  {
    component: 'Textarea',
    fieldName: 'meta',
    label: '成品元数据 jsonb',
    rules: 'required',
    componentProps: { placeholder: 'Enter JSON', rows: 6 },
  },
];
