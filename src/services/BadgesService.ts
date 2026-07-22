import { IBadge } from "@/Interfaces/IBadge";
import { AxiosInstance } from "axios";

export const  fetchBadges = async (axiosInstance: AxiosInstance, current_page :number,item_per_page :number, search:string) => {
    return await axiosInstance.get('/badges?page='+current_page+'&item_per_page='+item_per_page+'&search='+search)  
}

export const  fetchAllSubCategories = async (axiosInstance: AxiosInstance) => {
    return await axiosInstance.get('/badges/get-all-sub-categories')  
}

export const saveBadges = async (axiosInstance: AxiosInstance, data : IBadge) => {
    return await axiosInstance.post('/badges/store',{ ...data },{
        headers: { 'Content-Type': 'multipart/form-data' }
    })
}

export const fetchBadgeByID = async (axiosInstance: AxiosInstance, id :number) => {
    return await axiosInstance.get('/badges/edit/'+id)
}

export const updateBadge = async  (axiosInstance: AxiosInstance, id : number , data : IBadge )=>{
    return await axiosInstance.post('/badges/update/'+id,{ ...data },{
        headers: { 'Content-Type': 'multipart/form-data' }
    })
}

export const deleteBadge = async  (axiosInstance: AxiosInstance, id : number)=>{
    return await axiosInstance.delete('/badges/delete/'+id)
}
