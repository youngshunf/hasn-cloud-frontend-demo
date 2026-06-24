import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeGridProps } from '#/adapter/vxe-table';
import type { CopilotPreference } from '#/api/hasn_copilot/copilot_preference';

import { $t } from '@vben/locales';

/**
 * Query form schema
 */
export const querySchema: VbenFormSchema[] = [
  {
    component: '',
    fieldName: 'owner_hasn_id',
    label: 'owner HASN ID',
  },
  {
    component: 'Input',
    fieldName: 'default_agent_id',
    label: '默认协作分身',
    componentProps: {
      placeholder:
        'Search by \u9ED8\u8BA4\u534F\u4F5C\u5206\u8EAB\uFF08\u9996\u6B21\u7ED1\u5B9A\u5199\u5165\uFF1B\u65B0\u4F1A\u8BDD\u9ED8\u8BA4\u7528\u5B83\uFF0C\u00A78.5\uFF09',
    },
  },
];

/**
 * Table columns configuration
 */
export function useColumns(
  onActionClick?: OnActionClickFn<CopilotPreference>,
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
      title: 'owner HASN ID',
      width: 150,
    },
    {
      field: 'default_agent_id',
      title: '默认协作分身',
      width: 150,
    },
    {
      field: 'default_response_mode',
      title: '默认应答模式',
      width: 150,
    },
    {
      field: 'auto_summary',
      title: '会后是否自动生成纪要产物',
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
    fieldName: 'owner_hasn_id',
    label: 'owner HASN ID',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'default_agent_id',
    label: '默认协作分身',
  },
  {
    component: 'Input',
    fieldName: 'default_response_mode',
    label: '默认应答模式',
    rules: 'required',
  },
  {
    component: 'Switch',
    fieldName: 'auto_summary',
    label: '会后是否自动生成纪要产物',
  },
];
