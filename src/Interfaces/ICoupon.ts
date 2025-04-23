export interface ICoupon{
  title: string,
  code: string,
  discount: number | string,
  date_from: string,
  date_to: string,
  status: string,
  country_id: number | string
}
export interface ICouponList {
 coupon : [ICoupon] 
}
