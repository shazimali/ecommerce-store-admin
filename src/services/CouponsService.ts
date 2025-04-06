import { ICoupon } from "@/Interfaces/ICoupon"
import axios from "axios"

export const  fetchCoupons = async (current_page :number,item_per_page :number, search:string) => {
  return await axios.get('/coupons?page='+current_page+'&item_per_page='+item_per_page+'&search='+search)  
}

export const  fetchAllCountries = async () => {
    return await axios.get('/coupons/get-all-countries')  
}

export const saveCoupon = async (data : ICoupon) => {
  return await axios.post('/coupons/store',{ ...data })
}

export const fetchCouponByID = async (id :number) => {
  return await axios.get('/coupons/edit/'+id)
}

export const updateCoupon = async  (id : number , data : ICoupon )=>{
  return await axios.put('/coupons/update/'+id,{ ...data })
}

export const deleteCoupon = async  (id : number)=>{
  return await axios.delete('/coupons/delete/'+id)
}
