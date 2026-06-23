import type { VxeGridProps } from '#/adapter/vxe-table';

import { $t } from '@vben/locales';

export function useColumns(): VxeGridProps['columns'] {
  return [
    {
      field: 'seq',
      title: $t('common.table.id'),
      type: 'seq',
      width: 50,
    },
    { field: 'title', title: '服务', minWidth: 140 },
    { field: 'name', title: '标识', width: 110 },
    {
      field: 'status',
      title: '状态',
      width: 110,
      cellRender: {
        name: 'CellTag',
        options: [
          { color: 'success', label: '运行中', value: 'up' },
          { color: 'error', label: '不可达', value: 'down' },
          { color: 'default', label: '未配置', value: 'unconfigured' },
        ],
      },
    },
    {
      field: 'configured',
      title: '配置来源',
      width: 110,
      cellRender: {
        name: 'CellTag',
        options: [
          { color: 'processing', label: '显式配置', value: true },
          { color: 'default', label: '默认/未配', value: false },
        ],
      },
    },
    { field: 'base_url', title: '地址', minWidth: 200 },
    {
      field: 'latency_ms',
      title: '延迟(ms)',
      width: 100,
      formatter: ({ cellValue }) =>
        cellValue === null || cellValue === undefined ? '—' : `${cellValue}`,
    },
    {
      field: 'version',
      title: '版本',
      width: 100,
      formatter: ({ cellValue }) => cellValue || '—',
    },
    { field: 'detail', title: '说明', minWidth: 220 },
  ];
}
