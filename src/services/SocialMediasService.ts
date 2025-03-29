import { ISocialMedia } from "@/Interfaces/ISocialMedia";
import axios from "axios";

export const  fetchSocialMedias = async (current_page :number,item_per_page :number, search:string) => {
    return await axios.get('/social-medias?page='+current_page+'&item_per_page='+item_per_page+'&search='+search)  
}

export const  fetchAllWebsites = async () => {
    return await axios.get('/social-medias/get-all-countries')  
}

export const saveSocialMedia = async (data : ISocialMedia) => {
    return await axios.post('/social-medias/store',{ ...data })
}

export const fetchSocialMediaByID = async (id :number) => {
    return await axios.get('/social-medias/edit/'+id)
}

export const updateSocialMedia = async  (id : number , data : ISocialMedia )=>{
    return await axios.post('/social-medias/update/'+id,{ ...data })
}

export const deleteSocialMedia = async  (id : number)=>{
    return await axios.delete('/social-medias/delete/'+id)
}
