export interface IOrder{
  order_id: number | string,
  sub_total: number,
  total: number,
  free_shipping: number,
  shipping_charges: number,
  coupon_id: number,
  status: string,
  slip_link: string,
  user_id: number 
}
export interface IOrderList {
 order : [IOrder] 
}

export interface ICODCompany {
  'id': number,
  'title': string,
  
}

export interface ICODCompanyList {
 COD : [ICODCompany] 
}

export interface IBookOrder {
  'cod_company': string,
  'track_number':string,
  'status':string,
  'weight': number | string,
  'piece': number | string,
  'order_id': number | string,
  'special_instruction': string
}

export interface IOrderItem {
  id: number,
  is_bundle: boolean,
  title: string,
  sku: string,
  color: string,
  image: string,
  currency: string,
  unit_amount: number,
  quantity: number,
  total_amount: number
}

export interface IOrderDetail {
  id: number,
  order_id: number | string,
  status: string,
  created_at: string,
  customer_name: string,
  customer_email: string,
  phone: string,
  address: string,
  billing_address: string,
  country: string,
  city: string,
  special_instructions: string,
  cod_company: string,
  track_number: string,
  slip_link: string,
  sub_total: number,
  free_shipping: number,
  shipping_charges: number,
  code: string,
  discount: number,
  discount_amount: number,
  total: number,
  items: IOrderItem[]
}
