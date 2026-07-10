import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeGridProps } from '#/adapter/vxe-table';
import type { PayOrder } from '#/api/pay/order';

const ORDER_STATUS = [
  { label: '待支付', value: 0, color: 'default' },
  { label: '已支付', value: 1, color: 'green' },
  { label: '已退款', value: 2, color: 'orange' },
  { label: '已关闭', value: 3, color: 'red' },
  { label: '已过期', value: 4, color: 'default' },
];

const ORDER_TYPE = [
  { label: '订阅', value: 'subscribe', color: 'blue' },
  { label: '积分包', value: 'credit_pack', color: 'green' },
  { label: '升级', value: 'upgrade', color: 'orange' },
  { label: '自动续费', value: 'auto_renew', color: 'purple' },
];

const CHANNEL_CODE = [
  { label: '微信 Native', value: 'wx_native', color: 'green' },
  { label: '微信 JSAPI', value: 'wx_jsapi', color: 'green' },
  { label: '支付宝 PC', value: 'alipay_pc', color: 'blue' },
  { label: '支付宝 WAP', value: 'alipay_wap', color: 'blue' },
];

export const querySchema: VbenFormSchema[] = [
  { component: 'Input', fieldName: 'order_no', label: '订单号' },
  {
    component: 'Select',
    fieldName: 'status',
    label: '状态',
    componentProps: { allowClear: true, options: ORDER_STATUS },
  },
  {
    component: 'Select',
    fieldName: 'order_type',
    label: '订单类型',
    componentProps: { allowClear: true, options: ORDER_TYPE },
  },
  {
    component: 'Select',
    fieldName: 'channel_code',
    label: '支付渠道',
    componentProps: { allowClear: true, options: CHANNEL_CODE },
  },
];

export function useColumns(
  _onActionClick?: OnActionClickFn<PayOrder>,
): VxeGridProps['columns'] {
  return [
    { field: 'seq', title: '#', type: 'seq', width: 50 },
    { field: 'order_no', title: '订单号', width: 180 },
    { field: 'user_id', title: '用户ID', width: 80 },
    {
      field: 'order_type',
      title: '类型',
      width: 90,
      cellRender: { name: 'CellTag', options: ORDER_TYPE },
    },
    { field: 'subject', title: '订单标题', width: 200, showOverflow: true },
    {
      field: 'offering_ref',
      title: '所属商品',
      width: 160,
      showOverflow: true,
      // 统一商业化内核：串出下单快照里的商品目录展示名，未命中则回退占位
      formatter({ row }: { row: PayOrder }) {
        return row.offering_ref?.display_name || '—';
      },
    },
    {
      field: 'channel_code',
      title: '支付渠道',
      width: 110,
      cellRender: { name: 'CellTag', options: CHANNEL_CODE },
    },
    {
      field: 'pay_amount',
      title: '实付金额',
      width: 100,
      align: 'right',
      formatter({ cellValue }) {
        return `¥${(cellValue / 100).toFixed(2)}`;
      },
    },
    {
      field: 'status',
      title: '状态',
      width: 80,
      cellRender: { name: 'CellTag', options: ORDER_STATUS },
    },
    {
      field: 'channel_order_no',
      title: '第三方交易号',
      width: 200,
      showOverflow: true,
    },
    { field: 'success_time', title: '支付时间', width: 160 },
    { field: 'created_time', title: '创建时间', width: 160 },
  ];
}
