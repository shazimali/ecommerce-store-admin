import { ICollection } from "@/Interfaces/ICollection";
import axios from "axios";

const headers = {
    headers: {
        'Content-Type': 'application/json',
    }
  };

export const  fetchCollections = async (current_page :number,item_per_page :number, search:string) => {
    return await axios.get('/collections?page='+current_page+'&item_per_page='+item_per_page+'&search='+search)  
}

export const  fetchAllExtra = async () => {
    return await axios.get('/collections/get-all-extra')  
}

export const saveCollection = async (data : ICollection) => {
    return await axios.post('/collections/store',{ ...data },{
        headers: { 'Content-Type': 'multipart/form-data' }
    })
}

export const fetchCollectionByID = async (id :number) => {
    return await axios.get('/collections/edit/'+id)
}

export const updateCollection = async  (id : number , data : ICollection )=>{
    return await axios.post('/collections/update/'+id,{ ...data },{
        headers: { 'Content-Type': 'multipart/form-data' }
    })
}

export const deleteCollection = async  (id : number)=>{
    return await axios.delete('/collections/delete/'+id)
}
