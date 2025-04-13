import { IPurchase } from "@/Interfaces/IPurchase";
import axios from "axios";

export const  fetchPurchases = async (current_page :number,item_per_page :number, search:string) => {
    return await axios.get('/purchases?page='+current_page+'&item_per_page='+item_per_page+'&search='+search)  
}

export const  fetchAllSuppliers = async () => {
    return await axios.get('/purchases/get-all-suppliers')  
}

export const savePurchase = async (data : IPurchase) => {
    return await axios.post('/purchases/store',{ ...data })
}

export const fetchPurchaseByID = async (id :number) => {
    return await axios.get('/purchases/edit/'+id)
}

export const fetchPurchaseInvoiceByIDForPrint = async (id :number) => {
  return await axios.get('/purchases/fetch-invoice/'+id)
}

export const updatePurchase = async  (id : number , data : IPurchase )=>{
    return await axios.put('/purchases/update/'+id,{ ...data })
}

export const deletePurchase = async  (id : number)=>{
    return await axios.delete('/purchases/delete/'+id)
}
