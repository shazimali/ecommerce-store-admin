export interface IOrder{
  order_id: number | string,
  sub_total: number,
  total: number,
  free_shipping: number,
  shipping_charges: number,
  coupon_id: number,
  status: string,
  user_id: number 
}
export interface IOrderList {
 order : [IOrder] 
}
