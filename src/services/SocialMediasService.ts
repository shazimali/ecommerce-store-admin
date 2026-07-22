import { ISocialMedia } from "@/Interfaces/ISocialMedia";
import { AxiosInstance } from "axios";

export const  fetchSocialMedias = async (axiosInstance: AxiosInstance, current_page :number,item_per_page :number, search:string) => {
    return await axiosInstance.get('/social-medias?page='+current_page+'&item_per_page='+item_per_page+'&search='+search)  
}

export const  fetchAllWebsites = async (axiosInstance: AxiosInstance) => {
    return await axiosInstance.get('/social-medias/get-all-countries')  
}

export const saveSocialMedia = async (axiosInstance: AxiosInstance, data : ISocialMedia) => {
    return await axiosInstance.post('/social-medias/store',{ ...data })
}

export const fetchSocialMediaByID = async (axiosInstance: AxiosInstance, id :number) => {
    return await axiosInstance.get('/social-medias/edit/'+id)
}

export const updateSocialMedia = async  (axiosInstance: AxiosInstance, id : number , data : ISocialMedia )=>{
    return await axiosInstance.post('/social-medias/update/'+id,{ ...data })
}

export const deleteSocialMedia = async  (axiosInstance: AxiosInstance, id : number)=>{
    return await axiosInstance.delete('/social-medias/delete/'+id)
}
