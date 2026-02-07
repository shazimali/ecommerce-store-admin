import { IPurchase } from "@/Interfaces/IPurchase";
import { AxiosInstance } from "axios";

export const  fetchPurchases = async (axiosInstance: AxiosInstance, current_page :number,item_per_page :number, search:string) => {
    return await axiosInstance.get('/purchases?page='+current_page+'&item_per_page='+item_per_page+'&search='+search)  
}

export const  fetchAllSuppliers = async (axiosInstance: AxiosInstance) => {
    return await axiosInstance.get('/purchases/get-all-suppliers')  
}

export const savePurchase = async (axiosInstance: AxiosInstance, data : IPurchase) => {
    return await axiosInstance.post('/purchases/store',{ ...data })
}

export const fetchPurchaseByID = async (axiosInstance: AxiosInstance, id :number) => {
    return await axiosInstance.get('/purchases/edit/'+id)
}

export const fetchPurchaseInvoiceByIDForPrint = async (axiosInstance: AxiosInstance, id :number) => {
  return await axiosInstance.get('/purchases/fetch-invoice/'+id)
}

export const updatePurchase = async  (axiosInstance: AxiosInstance, id : number , data : IPurchase )=>{
    return await axiosInstance.put('/purchases/update/'+id,{ ...data })
}

export const deletePurchase = async  (axiosInstance: AxiosInstance, id : number)=>{
    return await axiosInstance.delete('/purchases/delete/'+id)
}
