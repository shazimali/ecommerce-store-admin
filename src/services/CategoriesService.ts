import { ICategory } from "@/Interfaces/ICategory";
import axios from "axios";

const headers = {
    headers: {
        'Content-Type': 'application/json',
    }
  };

export const  fetchCategories = async (current_page :number,item_per_page :number, search:string) => {
    return await axios.get('/categories?page='+current_page+'&item_per_page='+item_per_page+'&search='+search)  
}

export const saveCategory = async (data : ICategory) => {
    return await axios.post('/categories/store',{ ...data },{
        headers: { 'Content-Type': 'multipart/form-data' }
    })
}

export const fetchWebsiteByID = async (id :number) => {
    return await axios.get('/categories/edit/'+id)
}

export const updateWebsite = async  (id : number , data : ICategory )=>{
    return await axios.put('/categories/update/'+id,{ ...data },headers)
}

export const deleteWebsite = async  (id : number)=>{
    return await axios.delete('/categories/delete/'+id)
}
