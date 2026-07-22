import { ICoupon } from "@/Interfaces/ICoupon"
import { AxiosInstance } from "axios"

export const  fetchCoupons = async (axiosInstance: AxiosInstance, current_page :number,item_per_page :number, search:string) => {
  return await axiosInstance.get('/coupons?page='+current_page+'&item_per_page='+item_per_page+'&search='+search)  
}

export const  fetchAllCountries = async (axiosInstance: AxiosInstance) => {
    return await axiosInstance.get('/coupons/get-all-countries')  
}

export const saveCoupon = async (axiosInstance: AxiosInstance, data : ICoupon) => {
  return await axiosInstance.post('/coupons/store',{ ...data })
}

export const fetchCouponByID = async (axiosInstance: AxiosInstance, id :number) => {
  return await axiosInstance.get('/coupons/edit/'+id)
}

export const updateCoupon = async  (axiosInstance: AxiosInstance, id : number , data : ICoupon )=>{
  return await axiosInstance.put('/coupons/update/'+id,{ ...data })
}

export const deleteCoupon = async  (axiosInstance: AxiosInstance, id : number)=>{
  return await axiosInstance.delete('/coupons/delete/'+id)
}
