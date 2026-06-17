import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeGridProps } from '#/adapter/vxe-table';
import type { MarketplaceDownloadHistory } from '#/api/marketplace/marketplace_download_history';

import { $t } from '@vben/locales';

/**
 * Query form schema
 */
export const querySchema: VbenFormSchema[] = [
  {
    component: 'Input',
    fieldName: 'skill_id',
    label: '技能ID',
    componentProps: { placeholder: 'Search by \u6280\u80FDID' },
  },
  {
    component: 'InputNumber',
    fieldName: 'user_id',
    label: '用户ID',
    componentProps: { style: 'width: 100%' },
  },
  {
    component: 'RangePicker',
    fieldName: 'downloaded_at',
    label: '下载时间',
    componentProps: { format: 'YYYY-MM-DD' },
  },
];

/**
 * Table columns configuration
 */
export function useColumns(
  onActionClick?: OnActionClickFn<MarketplaceDownloadHistory>,
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
      field: 'skill_id',
      title: '技能ID',
      width: 150,
    },
    {
      field: 'version',
      title: '版本号',
      width: 150,
    },
    {
      field: 'user_id',
      title: '用户ID',
      width: 150,
    },
    {
      field: 'ip_address',
      title: 'IP地址',
      width: 150,
    },
    {
      field: 'downloaded_at',
      title: '下载时间',
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
    fieldName: 'skill_id',
    label: '技能ID',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'version',
    label: '版本号',
    rules: 'required',
  },
  {
    component: 'InputNumber',
    fieldName: 'user_id',
    label: '用户ID',
    componentProps: { style: 'width: 100%' },
  },
  {
    component: 'Input',
    fieldName: 'ip_address',
    label: 'IP地址',
  },
  {
    component: 'Textarea',
    fieldName: 'user_agent',
    label: '用户代理',
    componentProps: { rows: 4 },
  },
  {
    component: 'DatePicker',
    fieldName: 'downloaded_at',
    label: '下载时间',
    componentProps: {
      format: 'YYYY-MM-DD HH:mm:ss',
      showTime: true,
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
];
