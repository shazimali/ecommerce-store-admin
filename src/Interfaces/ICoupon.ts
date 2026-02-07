export interface ICoupon{
  id: number,
  title: string,
  code: string,
  discount: number | string,
  date_from: string,
  date_to: string,
  status: string,
  country_id: number | string
}
export type ICouponList = ICoupon[];
