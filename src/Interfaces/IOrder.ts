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
  'weight': number | string,
  'piece': number | string,
  'order_id': number | string,
  'special_instruction': string
}
