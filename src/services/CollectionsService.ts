import { ICollection } from "@/Interfaces/ICollection";
import { AxiosInstance } from "axios";

export const  fetchCollections = async (axiosInstance: AxiosInstance, current_page :number,item_per_page :number, search:string) => {
    return await axiosInstance.get('/collections?page='+current_page+'&item_per_page='+item_per_page+'&search='+search)  
}

export const  fetchAllExtra = async (axiosInstance: AxiosInstance) => {
    return await axiosInstance.get('/collections/get-all-extra')  
}

export const saveCollection = async (axiosInstance: AxiosInstance, data : ICollection) => {
    return await axiosInstance.post('/collections/store',{ ...data },{
        headers: { 'Content-Type': 'multipart/form-data' }
    })
}

export const fetchCollectionByID = async (axiosInstance: AxiosInstance, id :number) => {
    return await axiosInstance.get('/collections/edit/'+id)
}

export const updateCollection = async  (axiosInstance: AxiosInstance, id : number , data : ICollection )=>{
    return await axiosInstance.post('/collections/update/'+id,{ ...data },{
        headers: { 'Content-Type': 'multipart/form-data' }
    })
}

export const deleteCollection = async  (axiosInstance: AxiosInstance, id : number)=>{
    return await axiosInstance.delete('/collections/delete/'+id)
}
