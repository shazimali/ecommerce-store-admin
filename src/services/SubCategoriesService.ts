import { ISubCategory } from "@/Interfaces/ISubCategory";
import { AxiosInstance } from "axios";

export const  fetchSubCategories = async (axiosInstance: AxiosInstance, current_page :number,item_per_page :number, search:string) => {
    return await axiosInstance.get('/subcategories?page='+current_page+'&item_per_page='+item_per_page+'&search='+search)  
}

export const  fetchAllCategories = async (axiosInstance: AxiosInstance) => {
    return await axiosInstance.get('/subcategories/get-all-categories')  
}

export const saveSubCategory = async (axiosInstance: AxiosInstance, data : ISubCategory) => {
    return await axiosInstance.post('/subcategories/store',{ ...data },{
        headers: { 'Content-Type': 'multipart/form-data' }
    })
}

export const fetchSubCategoryByID = async (axiosInstance: AxiosInstance, id :number) => {
    return await axiosInstance.get('/subcategories/edit/'+id)
}

export const updateSubCategory = async  (axiosInstance: AxiosInstance, id : number , data : ISubCategory )=> {
    return await axiosInstance.post('/subcategories/update/'+id,{ ...data },{
        headers: { 'Content-Type': 'multipart/form-data' }
    })
}

export const deleteSubCategory = async  (axiosInstance: AxiosInstance, id : number)=>{
    return await axiosInstance.delete('/subcategories/delete/'+id)
}
