import { IBookOrder } from "@/Interfaces/IOrder"
import axios from "axios"

export const  fetchOrder = async (current_page :number,item_per_page :number, search:string) => {
  return await axios.get('/orders?page='+current_page+'&item_per_page='+item_per_page+'&search='+search)  
}

export const  fetchCODCompanies = async () => {
  return await axios.get('/orders/cod-list')  
}

export const  sendBookOrder = async (data : IBookOrder) => {
  return await axios.post('/orders/book',{...data})  
}

export const  deleteOrder = async (id:number) => {
  return await axios.post('/orders/delete/'+id)  
}
