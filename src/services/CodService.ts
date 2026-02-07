import { ICod } from "@/Interfaces/ICod"
import { AxiosInstance } from "axios"


export const  fetchCod = async (axiosInstance: AxiosInstance, current_page :number,item_per_page :number, search:string) => {
    return await axiosInstance.get('/cod?page='+current_page+'&item_per_page='+item_per_page+'&search='+search)  
}

export const  fetchAllCountries = async (axiosInstance: AxiosInstance) => {
    return await axiosInstance.get('/cod/get-all-countries')  
}

export const saveCod = async (axiosInstance: AxiosInstance, data : ICod) => {
    return await axiosInstance.post('/cod/store',{ ...data })
}

export const fetchCodByID = async (axiosInstance: AxiosInstance, id :number) => {
    return await axiosInstance.get('/cod/edit/'+id)
}

export const updateCod = async  (axiosInstance: AxiosInstance, id : number , data :  ICod)=>{
  return await axiosInstance.put('/cod/update/'+id,{ ...data })
}

export const deleteCod = async  (axiosInstance: AxiosInstance, id : number)=>{
    return await axiosInstance.delete('/cod/delete/'+id)
}
