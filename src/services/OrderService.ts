import { IBookOrder } from "@/Interfaces/IOrder"
import { AxiosInstance } from "axios"

export const  fetchOrder = async (axiosInstance: AxiosInstance, current_page :number,item_per_page :number, search:string) => {
  return await axiosInstance.get('/orders?page='+current_page+'&item_per_page='+item_per_page+'&search='+search)  
}

export const  fetchCODCompanies = async (axiosInstance: AxiosInstance) => {
  return await axiosInstance.get('/orders/cod-list')  
}

export const  sendBookOrder = async (axiosInstance: AxiosInstance, data : IBookOrder) => {
  return await axiosInstance.post('/orders/book',{...data})  
}

export const  updateBookedOrderStatus = async (axiosInstance: AxiosInstance, data : IBookOrder) => {
  return await axiosInstance.post('/orders/book/status',{...data})  
}

export const  deleteOrder = async (axiosInstance: AxiosInstance, id:number) => {
  return await axiosInstance.post('/orders/delete/'+id)  
}
