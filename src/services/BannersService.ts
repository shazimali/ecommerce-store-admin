import { IBanner } from "@/Interfaces/IBanner";
import { AxiosInstance } from "axios";

export const  fetchBanners = async (axiosInstance: AxiosInstance, current_page :number,item_per_page :number, search:string) => {
    return await axiosInstance.get('/banners?page='+current_page+'&item_per_page='+item_per_page+'&search='+search)  
}

export const  fetchAllWebsites = async (axiosInstance: AxiosInstance) => {
    return await axiosInstance.get('/banners/get-all-websites')  
}

export const saveBanner = async (axiosInstance: AxiosInstance, data : IBanner) => {
    return await axiosInstance.post('/banners/store',{ ...data },{
        headers: { 'Content-Type': 'multipart/form-data' }
    })
}

export const fetchBannerByID = async (axiosInstance: AxiosInstance, id :number) => {
    return await axiosInstance.get('/banners/edit/'+id)
}

export const updateBanner = async  (axiosInstance: AxiosInstance, id : number , data : IBanner )=>{
    return await axiosInstance.post('/banners/update/'+id,{ ...data },{
        headers: { 'Content-Type': 'multipart/form-data' }
    })
}

export const deleteBanner = async  (axiosInstance: AxiosInstance, id : number)=>{
    return await axiosInstance.delete('/banners/delete/'+id)
}
