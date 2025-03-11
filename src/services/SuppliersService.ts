import { ISupplier } from "@/Interfaces/ISupplier";
import axios from "axios";

export const  fetchSuppliers = async (current_page :number,item_per_page :number, search:string) => {
    return await axios.get('/suppliers?page='+current_page+'&item_per_page='+item_per_page+'&search='+search)  
}

export const saveSupplier = async (data : ISupplier) => {
    return await axios.post('/suppliers/store',{ ...data })
}

export const fetchSupplierByID = async (id :number) => {
    return await axios.get('/suppliers/edit/'+id)
}

export const updateSupplier = async  (id : number , data : ISupplier )=>{
    return await axios.put('/suppliers/update/'+id,{ ...data })
}

export const deleteSupplier = async  (id : number)=>{
    return await axios.delete('/suppliers/delete/'+id)
}
