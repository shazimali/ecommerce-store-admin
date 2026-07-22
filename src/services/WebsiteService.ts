import { IWebsite } from "@/Interfaces/IWebsite";
import { AxiosInstance } from "axios";

export const  fetchWebsites = async (axiosInstance: AxiosInstance, current_page :number,item_per_page :number, search:string) => {
    return await axiosInstance.get('/websites?page='+current_page+'&item_per_page='+item_per_page+'&search='+search)  
}

export const saveWebsite = async (axiosInstance: AxiosInstance, data : IWebsite) => {
    return await axiosInstance.post('/websites/store',{ ...data },{
        headers: { 'Content-Type': 'multipart/form-data' }
    })
}

export const fetchWebsiteByID = async (axiosInstance: AxiosInstance, id :number) => {
    return await axiosInstance.get('/websites/edit/'+id)
}

export const updateWebsite = async  (axiosInstance: AxiosInstance, id : number , data : IWebsite )=>{
    return await axiosInstance.put('/websites/update/'+id,{ ...data })
}

export const deleteWebsite = async  (axiosInstance: AxiosInstance, id : number)=>{
    return await axiosInstance.delete('/websites/delete/'+id)
}
