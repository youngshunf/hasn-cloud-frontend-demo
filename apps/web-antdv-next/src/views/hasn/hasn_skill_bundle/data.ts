import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeGridProps } from '#/adapter/vxe-table';
import type { HasnSkillBundle } from '#/api/hasn/hasn_skill_bundle';

import { $t } from '@vben/locales';

import { z } from '#/adapter/form';

function formatJsonCell(value: unknown): string {
  if (value === undefined || value === null || value === '') return '-';
  if (typeof value === 'string') return value;
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}

function jsonRule(): VbenFormSchema['rules'] {
  return z
    .string()
    .optional()
    .transform((value, ctx) => {
      if (!value || value.trim() === '') return [];
      try {
        return JSON.parse(value);
      } catch {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: '请输入合法 JSON',
        });
        return z.NEVER;
      }
    });
}

export const querySchema: VbenFormSchema[] = [
  {
    component: 'Input',
    fieldName: 'owner_id',
    label: 'Bundle 归属 owner',
  },
  {
    component: 'Input',
    fieldName: 'name',
    label: 'Bundle 名称',
  },
  {
    component: 'Input',
    fieldName: 'display_name',
    label: '显示名称',
  },
];

export function useColumns(
  onActionClick?: OnActionClickFn<HasnSkillBundle>,
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
      field: 'owner_id',
      title: 'Owner',
      width: 160,
    },
    {
      field: 'name',
      title: 'Bundle 名称',
      minWidth: 160,
      showOverflow: true,
    },
    {
      field: 'display_name',
      title: '显示名称',
      minWidth: 160,
      showOverflow: true,
    },
    {
      field: 'skill_ids',
      title: 'Skill 列表',
      minWidth: 220,
      formatter: ({ cellValue }) => formatJsonCell(cellValue),
      showOverflow: true,
    },
    {
      field: 'description',
      title: '描述',
      minWidth: 220,
      showOverflow: true,
    },
    {
      field: 'created_time',
      title: '创建时间',
      width: 170,
    },
    {
      field: 'updated_time',
      title: '更新时间',
      width: 170,
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

export const formSchema: VbenFormSchema[] = [
  {
    component: 'Input',
    fieldName: 'owner_id',
    label: 'Bundle 归属 owner',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'name',
    label: 'Bundle 名称',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'display_name',
    label: '显示名称',
  },
  {
    component: 'Textarea',
    fieldName: 'description',
    label: '描述',
    componentProps: {
      rows: 4,
    },
  },
  {
    component: 'Textarea',
    fieldName: 'skill_ids',
    label: 'Skill 列表',
    help: 'JSON 数组或对象，例如 ["github-code-review"]',
    rules: jsonRule(),
    componentProps: {
      placeholder: '["github-code-review", "test-driven-development"]',
      rows: 5,
    },
  },
  {
    component: 'Textarea',
    fieldName: 'instruction',
    label: '额外指导语',
    componentProps: {
      rows: 6,
    },
  },
];
