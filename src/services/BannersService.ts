import { IBanner } from "@/Interfaces/IBanner";
import axios from "axios";

const headers = {
    headers: {
        'Content-Type': 'application/json',
    }
  };

export const  fetchBanners = async (current_page :number,item_per_page :number, search:string) => {
    return await axios.get('/banners?page='+current_page+'&item_per_page='+item_per_page+'&search='+search)  
}

export const  fetchAllWebsites = async () => {
    return await axios.get('/banners/get-all-websites')  
}

export const saveBanner = async (data : IBanner) => {
    return await axios.post('/banners/store',{ ...data },{
        headers: { 'Content-Type': 'multipart/form-data' }
    })
}

export const fetchBannerByID = async (id :number) => {
    return await axios.get('/banners/edit/'+id)
}

export const updateBanner = async  (id : number , data : IBanner )=>{
    return await axios.put('/banners/update/'+id,{ ...data },headers)
}

export const deleteBanner = async  (id : number)=>{
    return await axios.delete('/banners/delete/'+id)
}
