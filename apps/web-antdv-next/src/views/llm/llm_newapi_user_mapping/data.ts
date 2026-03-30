import type { VbenFormSchema } from '#/adapter/form';
import type {
  OnActionClickFn,
  VxeGridProps,
} from '#/adapter/vxe-table';
import type { LlmNewapiUserMapping } from '#/api/llm/llm_newapi_user_mapping';

import { $t } from '@vben/locales';

import { getDictOptions } from '#/utils/dict';

/**
 * Query form schema
 */
export const querySchema: VbenFormSchema[] = [
  {
    component: 'InputNumber',
    fieldName: 'huanxing_user_id',
    label: '唤星 sys_user.id',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'InputNumber',
    fieldName: 'newapi_user_id',
    label: 'new-api users.id',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'InputNumber',
    fieldName: 'newapi_token_id',
    label: 'new-api tokens.id',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'Input',
    fieldName: 'app_code',
    label: '应用标识',
    componentProps: {"placeholder": "Search by \u5e94\u7528\u6807\u8bc6 (huanxing:\u5524\u661f/zhixiaoya:\u77e5\u5c0f\u9e26)"},
  },
  {
    component: 'Select',
    fieldName: 'status',
    label: '状态',
    componentProps: {
      allowClear: true,
      options: getDictOptions('llm_status'),
    },
  },
];

/**
 * Table columns configuration
 */
export function useColumns(
  onActionClick?: OnActionClickFn<LlmNewapiUserMapping>,
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
      field: 'huanxing_user_id',
      title: '唤星 sys_user.id',
      width: 150,
    },
    {
      field: 'newapi_user_id',
      title: 'new-api users.id',
      width: 150,
    },
    {
      field: 'newapi_token_key',
      title: 'new-api tokens.key',
      width: 150,
    },
    {
      field: 'newapi_token_id',
      title: 'new-api tokens.id',
      width: 150,
    },
    {
      field: 'app_code',
      title: '应用标识',
      width: 150,
    },
    {
      field: 'status',
      title: '状态',
      width: 150,
      cellRender: {
        name: 'CellTag',
        options: getDictOptions('llm_status'),
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
    component: 'InputNumber',
    fieldName: 'huanxing_user_id',
    label: '唤星 sys_user.id',
    rules: 'required',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'InputNumber',
    fieldName: 'newapi_user_id',
    label: 'new-api users.id',
    rules: 'required',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'Input',
    fieldName: 'newapi_token_key',
    label: 'new-api tokens.key',
    rules: 'required',
  },
  {
    component: 'InputNumber',
    fieldName: 'newapi_token_id',
    label: 'new-api tokens.id',
    rules: 'required',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'Input',
    fieldName: 'app_code',
    label: '应用标识',
    rules: 'required',
  },
  {
    component: 'Select',
    fieldName: 'status',
    label: '状态',
    rules: 'required',
    componentProps: {
      options: getDictOptions('llm_status'),
    },
  },
];
