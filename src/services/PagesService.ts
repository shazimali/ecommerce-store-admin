import { IPages } from "@/Interfaces/IPage"
import { AxiosInstance } from "axios"


export const  fetchPages = async (axiosInstance: AxiosInstance, current_page :number,item_per_page :number, search:string) => {
    return await axiosInstance.get('/pages?page='+current_page+'&item_per_page='+item_per_page+'&search='+search)  
}

export const  fetchAllCountries = async (axiosInstance: AxiosInstance) => {
    return await axiosInstance.get('/pages/get-all-countries')  
}

export const savePage = async (axiosInstance: AxiosInstance, data : IPages) => {
    return await axiosInstance.post('/pages/store',{ ...data } )
}

export const fetchPageByID = async (axiosInstance: AxiosInstance, id :number) => {
    return await axiosInstance.get('/pages/edit/'+id)
}

export const updatePage = async  (axiosInstance: AxiosInstance, id : number , data : IPages )=>{
    return await axiosInstance.put('/pages/update/'+id,{ ...data } )
}

export const deletePage = async  (axiosInstance: AxiosInstance, id : number)=>{
    return await axiosInstance.delete('/pages/delete/'+id)
}
