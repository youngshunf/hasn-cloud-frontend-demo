import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeGridProps } from '#/adapter/vxe-table';
import type { HasnAppBetaAccess } from '#/api/hasn/hasn_app_beta_access';

import { $t } from '@vben/locales';

/** 审批状态（后端 status：pending/approved/rejected）。 */
const STATUS_OPTIONS = [
  { color: 'orange', label: '待审批', value: 'pending' },
  { color: 'green', label: '已通过', value: 'approved' },
  { color: 'red', label: '已拒绝', value: 'rejected' },
];
/** 访问主体类型。 */
const SUBJECT_TYPE_OPTIONS = [
  { label: '用户', value: 'owner' },
  { label: '企业空间', value: 'enterprise' },
];
/** 来源。 */
const SOURCE_OPTIONS = [
  { color: 'blue', label: '用户申请', value: 'apply' },
  { color: 'purple', label: '管理员邀请', value: 'invite' },
];

/**
 * Query form schema（后端 list 仅支持 app_id / status 过滤）。
 */
export const querySchema: VbenFormSchema[] = [
  {
    component: 'Input',
    fieldName: 'app_id',
    label: '应用唯一标识',
    componentProps: { placeholder: '按应用过滤，如 hasn_task' },
  },
  {
    component: 'Select',
    fieldName: 'status',
    label: '审批状态',
    componentProps: {
      allowClear: true,
      options: STATUS_OPTIONS,
    },
  },
];

/**
 * Table columns configuration。
 * 行操作：待审批行可「通过 / 拒绝」；任意行可「删除」（删除后用户可重新申请）。
 */
export function useColumns(
  onActionClick?: OnActionClickFn<HasnAppBetaAccess>,
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
      field: 'app_id',
      title: '应用唯一标识',
      width: 160,
    },
    {
      field: 'subject_type',
      title: '访问主体',
      width: 100,
      cellRender: { name: 'CellTag', options: SUBJECT_TYPE_OPTIONS },
    },
    {
      field: 'subject_id',
      title: '主体 ID',
      width: 220,
    },
    {
      field: 'source',
      title: '来源',
      width: 110,
      cellRender: { name: 'CellTag', options: SOURCE_OPTIONS },
    },
    {
      field: 'status',
      title: '审批状态',
      width: 110,
      cellRender: { name: 'CellTag', options: STATUS_OPTIONS },
    },
    {
      field: 'note',
      title: '申请理由 / 审批备注',
      minWidth: 180,
    },
    {
      field: 'decided_by',
      title: '审批人',
      width: 160,
    },
    {
      field: 'decided_at',
      title: '审批 / 邀请时间',
      width: 170,
    },
    {
      field: 'operation',
      title: $t('common.table.operation'),
      align: 'center',
      fixed: 'right',
      width: 200,
      cellRender: {
        attrs: {
          nameField: 'id',
          onClick: onActionClick,
        },
        name: 'CellOperation',
        options: [
          { code: 'approve', text: '通过' },
          { code: 'reject', text: '拒绝' },
          'delete',
        ],
      },
    },
  ];
}

/**
 * 邀请表单 schema（直接通过，无需对方申请）。
 * status/source/decided_* 由后端写定，前端不填。
 */
export const inviteFormSchema: VbenFormSchema[] = [
  {
    component: 'Input',
    fieldName: 'app_id',
    label: '应用唯一标识',
    rules: 'required',
    help: '要邀请进灰度内测的应用，如 hasn_task',
  },
  {
    component: 'Select',
    fieldName: 'subject_type',
    label: '访问主体',
    rules: 'required',
    defaultValue: 'owner',
    componentProps: { options: SUBJECT_TYPE_OPTIONS },
  },
  {
    component: 'Input',
    fieldName: 'subject_id',
    label: '主体 ID',
    rules: 'required',
    help: '用户填 hasn_id，企业空间填 enterprise_id',
  },
  {
    component: 'Textarea',
    fieldName: 'note',
    label: '备注',
    componentProps: { rows: 2 },
  },
];
