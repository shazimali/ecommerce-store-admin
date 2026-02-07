import { ISupplier } from "@/Interfaces/ISupplier";
import { AxiosInstance } from "axios";

export const  fetchSuppliers = async (axiosInstance: AxiosInstance, current_page :number,item_per_page :number, search:string) => {
    return await axiosInstance.get('/suppliers?page='+current_page+'&item_per_page='+item_per_page+'&search='+search)  
}

export const saveSupplier = async (axiosInstance: AxiosInstance, data : ISupplier) => {
    return await axiosInstance.post('/suppliers/store',{ ...data })
}

export const fetchSupplierByID = async (axiosInstance: AxiosInstance, id :number) => {
    return await axiosInstance.get('/suppliers/edit/'+id)
}

export const updateSupplier = async  (axiosInstance: AxiosInstance, id : number , data : ISupplier )=>{
    return await axiosInstance.put('/suppliers/update/'+id,{ ...data })
}

export const deleteSupplier = async  (axiosInstance: AxiosInstance, id : number)=>{
    return await axiosInstance.delete('/suppliers/delete/'+id)
}
