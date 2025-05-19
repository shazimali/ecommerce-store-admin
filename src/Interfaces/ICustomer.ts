export interface ICustomer{
  id: number,
  name: string,
  email: string,
  email_verified_at: string,
  phone: string,
  address: string,
  city: string,
  country_id: number,
  type: string,
  first_name: string,
  last_name: string,
}
export interface ICustomerList {
 customer : [ICustomer] 
}
