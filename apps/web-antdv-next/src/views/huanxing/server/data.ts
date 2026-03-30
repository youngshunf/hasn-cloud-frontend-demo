import type { VbenFormSchema } from '#/adapter/form';
import type {
  OnActionClickFn,
  VxeGridProps,
} from '#/adapter/vxe-table';
import type { HuanxingServerResult } from '#/api/huanxing/server';

import { $t } from '@vben/locales';

import { getDictOptions } from '#/utils/dict';

export const querySchema: VbenFormSchema[] = [
  {
    component: 'Input',
    fieldName: 'server_id',
    label: '服务器标识',
    componentProps: { placeholder: '请输入服务器ID' },
  },
  {
    component: 'Input',
    fieldName: 'server_name',
    label: '服务器名称',
    componentProps: { placeholder: '请输入服务器名称' },
  },
  {
    component: 'Select',
    fieldName: 'status',
    label: '状态',
    componentProps: {
      allowClear: true,
      options: getDictOptions('huanxing_status'),
    },
  },
];

export function useColumns(
  onActionClick?: OnActionClickFn<HuanxingServerResult>,
): VxeGridProps['columns'] {
  return [
    { field: 'seq', title: $t('common.table.id'), type: 'seq', fixed: 'left', width: 50 },
    { field: 'server_id', title: '服务器标识', width: 140 },
    { field: 'server_name', title: '服务器名称', width: 150 },
    { field: 'ip_address', title: 'IP地址', width: 140 },
    { field: 'port', title: '端口', width: 80 },
    { field: 'region', title: '地域', width: 100 },
    { field: 'provider', title: '云服务商', width: 100 },
    { field: 'max_users', title: '最大用户数', width: 100 },
    { 
      field: 'config.user_count', 
      title: '用户(活跃/总)', 
      width: 120,
      formatter: ({ row }) => {
        const total = row.config?.user_count;
        const active = row.config?.active_user_count;
        if (total !== undefined && active !== undefined) return `${active} / ${total}`;
        return total ?? '-';
      }
    },
    { 
      field: 'config.cpu_usage', 
      title: 'CPU', 
      width: 80,
      formatter: ({ row }) => {
        const cpu = row.config?.cpu_usage;
        return cpu !== undefined && cpu !== null ? `${cpu}%` : '-';
      }
    },
    { 
      field: 'config.memory_usage', 
      title: '内存', 
      width: 120,
      formatter: ({ row }) => {
        const mem = row.config?.memory_usage;
        const total = row.config?.total_memory_gb;
        if (mem !== undefined && mem !== null && total !== undefined && total !== null) {
            return `${mem}% (${total}GB)`;
        }
        return mem !== undefined && mem !== null ? `${mem}%` : '-';
      }
    },
    { 
      field: 'config.disk_usage', 
      title: '硬盘', 
      width: 120,
      formatter: ({ row }) => {
        const disk = row.config?.disk_usage;
        const total = row.config?.total_disk_gb;
        if (disk !== undefined && disk !== null && total !== undefined && total !== null) {
            return `${disk}% (${total}GB)`;
        }
        return disk !== undefined && disk !== null ? `${disk}%` : '-';
      }
    },
    { field: 'config.zeroclaw_version', title: '版本', width: 100 },
    {
      field: 'status',
      title: '状态',
      width: 100,
      cellRender: { name: 'CellTag', options: getDictOptions('huanxing_status') },
    },
    {
      field: 'gateway_status',
      title: 'Gateway',
      width: 110,
      cellRender: { name: 'CellTag', options: getDictOptions('huanxing_gateway_status') },
    },
    { field: 'last_heartbeat', title: '最后心跳', width: 170 },
    { field: 'remark', title: '备注', width: 150 },
    {
      field: 'operation',
      title: $t('common.table.operation'),
      align: 'center',
      fixed: 'right',
      width: 150,
      cellRender: {
        attrs: { nameField: 'id', onClick: onActionClick },
        name: 'CellOperation',
        options: ['edit', 'delete'],
      },
    },
  ];
}

export const formSchema: VbenFormSchema[] = [
  { component: 'Input', fieldName: 'server_id', label: '服务器标识', rules: 'required' },
  { component: 'Input', fieldName: 'server_name', label: '服务器名称' },
  { component: 'Input', fieldName: 'ip_address', label: 'IP地址', rules: 'required' },
  { component: 'InputNumber', fieldName: 'port', label: '端口', componentProps: { style: 'width: 100%' } },
  { component: 'Input', fieldName: 'region', label: '地域' },
  { component: 'Input', fieldName: 'provider', label: '云服务商' },
  { component: 'InputNumber', fieldName: 'max_users', label: '最大用户数', componentProps: { style: 'width: 100%' } },
  {
    component: 'Select', fieldName: 'status', label: '状态',
    componentProps: { options: getDictOptions('huanxing_status') },
  },
  {
    component: 'Select', fieldName: 'gateway_status', label: 'Gateway状态',
    componentProps: { options: getDictOptions('huanxing_gateway_status') },
  },
  { component: 'Textarea', fieldName: 'config', label: '配置信息(JSON)', componentProps: { placeholder: '请输入JSON', rows: 4 } },
  { component: 'Textarea', fieldName: 'remark', label: '备注', componentProps: { rows: 3 } },
];
