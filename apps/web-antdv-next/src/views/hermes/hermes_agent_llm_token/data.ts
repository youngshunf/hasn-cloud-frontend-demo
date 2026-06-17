import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeGridProps } from '#/adapter/vxe-table';
import type { HermesAgentLlmToken } from '#/api/hermes/hermes_agent_llm_token';

import { $t } from '@vben/locales';

/**
 * Query form schema
 */
export const querySchema: VbenFormSchema[] = [
  {
    component: 'Input',
    fieldName: 'agent_id',
    label: 'Agent 业务 ID',
    componentProps: { placeholder: 'Search by Agent \u4E1A\u52A1 ID' },
  },
  {
    component: 'InputNumber',
    fieldName: 'user_id',
    label: '唤星用户 ID',
    componentProps: { style: 'width: 100%' },
  },
  {
    component: 'InputNumber',
    fieldName: 'newapi_user_id',
    label: 'new-api users.id',
    componentProps: { style: 'width: 100%' },
  },
  {
    component: 'InputNumber',
    fieldName: 'newapi_token_id',
    label: 'new-api tokens.id',
    componentProps: { style: 'width: 100%' },
  },
  {
    component: 'RangePicker',
    fieldName: 'issued_at',
    label: '签发时间',
    componentProps: { format: 'YYYY-MM-DD' },
  },
  {
    component: 'RangePicker',
    fieldName: 'revoked_at',
    label: '撤销时间，NULL 表示有效',
    componentProps: { format: 'YYYY-MM-DD' },
  },
  {
    component: 'Input',
    fieldName: 'runtime_node_id',
    label: 'Runtime 节点 ID',
    componentProps: {
      placeholder:
        'Search by Runtime \u8282\u70B9 ID\uFF08\u9884\u7559 \u00A708\uFF09',
    },
  },
];

/**
 * Table columns configuration
 */
export function useColumns(
  onActionClick?: OnActionClickFn<HermesAgentLlmToken>,
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
      field: 'agent_id',
      title: 'Agent 业务 ID',
      width: 150,
    },
    {
      field: 'user_id',
      title: '唤星用户 ID',
      width: 150,
    },
    {
      field: 'newapi_user_id',
      title: 'new-api users.id',
      width: 150,
    },
    {
      field: 'newapi_token_id',
      title: 'new-api tokens.id',
      width: 150,
    },
    {
      field: 'token_key_prefix',
      title: 'token 明文前 8 字符',
      width: 150,
    },
    {
      field: 'token_key_sha256',
      title: 'token 明文 SHA256',
      width: 150,
    },
    {
      field: 'rate_limit_rps',
      title: '单 Agent QPS 限速，留空 = 跟随 user 默认',
      width: 150,
    },
    {
      field: 'per_token_quota_remaining',
      title: '可选',
      width: 150,
    },
    {
      field: 'issued_at',
      title: '签发时间',
      width: 150,
    },
    {
      field: 'revoked_at',
      title: '撤销时间，NULL 表示有效',
      width: 150,
    },
    {
      field: 'runtime_node_id',
      title: 'Runtime 节点 ID',
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
    fieldName: 'agent_id',
    label: 'Agent 业务 ID',
    rules: 'required',
  },
  {
    component: 'InputNumber',
    fieldName: 'user_id',
    label: '唤星用户 ID',
    rules: 'required',
    componentProps: { style: 'width: 100%' },
  },
  {
    component: 'InputNumber',
    fieldName: 'newapi_user_id',
    label: 'new-api users.id',
    rules: 'required',
    componentProps: { style: 'width: 100%' },
  },
  {
    component: 'InputNumber',
    fieldName: 'newapi_token_id',
    label: 'new-api tokens.id',
    rules: 'required',
    componentProps: { style: 'width: 100%' },
  },
  {
    component: 'Input',
    fieldName: 'token_key_prefix',
    label: 'token 明文前 8 字符',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'token_key_sha256',
    label: 'token 明文 SHA256',
    rules: 'required',
  },
  {
    component: 'Textarea',
    fieldName: 'model_allowlist',
    label: '平台模型白名单 JSON，留空 = 跟随 user 默认',
    componentProps: { placeholder: 'Enter JSON', rows: 6 },
  },
  {
    component: 'InputNumber',
    fieldName: 'rate_limit_rps',
    label: '单 Agent QPS 限速，留空 = 跟随 user 默认',
    componentProps: { style: 'width: 100%' },
  },
  {
    component: 'InputNumber',
    fieldName: 'per_token_quota_remaining',
    label: '可选',
    componentProps: { style: 'width: 100%' },
  },
  {
    component: 'DatePicker',
    fieldName: 'issued_at',
    label: '签发时间',
    rules: 'required',
    componentProps: {
      format: 'YYYY-MM-DD HH:mm:ss',
      showTime: true,
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
  {
    component: 'DatePicker',
    fieldName: 'revoked_at',
    label: '撤销时间，NULL 表示有效',
    componentProps: {
      format: 'YYYY-MM-DD HH:mm:ss',
      showTime: true,
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
  {
    component: 'Input',
    fieldName: 'runtime_node_id',
    label: 'Runtime 节点 ID',
  },
];
