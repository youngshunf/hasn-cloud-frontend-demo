import { requestClient } from '#/api/request';

export interface PayOrder {
  id: number;
  order_no: string;
  user_id: number;
  channel_id: number | null;
  channel_code: string | null;
  order_type: string;
  subject: string;
  body: string | null;
  target_tier: string | null;
  billing_cycle: string | null;
  amount: number;
  discount_amount: number;
  pay_amount: number;
  refund_amount: number;
  status: number;
  channel_order_no: string | null;
  expire_time: string;
  success_time: string | null;
  created_time: string;
  // 统一商业化内核（MK-1）：下单时固化的商品目录引用快照，商业化中心订单页据此串出所属 offering
  offering_ref?: {
    key?: string;
    kind?: string;
    display_name?: string;
    plan_key?: string;
  } | null;
}

export async function getPayOrderListApi(params?: Record<string, any>) {
  return requestClient.get('/api/v1/pay/orders', { params });
}

export async function getPayOrderDetailApi(pk: number) {
  return requestClient.get(`/api/v1/pay/orders/${pk}`);
}
