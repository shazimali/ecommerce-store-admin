import { ICategory } from "@/Interfaces/ICategory";
import { AxiosInstance } from "axios";

export const  fetchCategories = async (axiosInstance: AxiosInstance, current_page :number,item_per_page :number, search:string) => {
    return await axiosInstance.get('/categories?page='+current_page+'&item_per_page='+item_per_page+'&search='+search)  
}

export const  fetchAllWebsites = async (axiosInstance: AxiosInstance) => {
    return await axiosInstance.get('/categories/get-all-websites')  
}

export const saveCategory = async (axiosInstance: AxiosInstance, data : ICategory) => {
    return await axiosInstance.post('/categories/store',{ ...data },{
        headers: { 'Content-Type': 'multipart/form-data' }
    })
}

export const fetchCategoryByID = async (axiosInstance: AxiosInstance, id :number) => {
    return await axiosInstance.get('/categories/edit/'+id)
}

export const updateCategory = async  (axiosInstance: AxiosInstance, id : number , data : ICategory )=>{
    return await axiosInstance.post('/categories/update/'+id,{ ...data },{
        headers: { 'Content-Type': 'multipart/form-data' }
    })
}

export const deleteCategory = async  (axiosInstance: AxiosInstance, id : number)=>{
    return await axiosInstance.delete('/categories/delete/'+id)
}
