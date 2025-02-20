import { IWebsite } from "@/interfaces/IWebsite";
import axios from "axios";

const headers = {
    headers: {
        'Content-Type': 'application/json',
    }
  };

export const  fetchWebsites = async (current_page :number,item_per_page :number, search:string) => {
    return await axios.get('/websites?page='+current_page+'&item_per_page='+item_per_page+'&search='+search)  
}

export const saveWebsite = async (data : IWebsite) => {
    return await axios.post('/websites/store',{ ...data },{
        headers: { 'Content-Type': 'multipart/form-data' }
    })
}

export const fetchWebsiteByID = async (id :number) => {
    return await axios.get('/websites/edit/'+id)
}

export const updateWebsite = async  (id : number , data : IWebsite )=>{
    return await axios.put('/websites/update/'+id,{ ...data },headers)
}

export const deleteWebsite = async  (id : number)=>{
    return await axios.delete('/websites/delete/'+id)
}
