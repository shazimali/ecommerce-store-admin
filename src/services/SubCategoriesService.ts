import { ISubCategory } from "@/Interfaces/ISubCategory";
import axios from "axios";

export const  fetchSubCategories = async (current_page :number,item_per_page :number, search:string) => {
    return await axios.get('/subcategories?page='+current_page+'&item_per_page='+item_per_page+'&search='+search)  
}

export const  fetchAllCategories = async () => {
    return await axios.get('/subcategories/get-all-categories')  
}

export const saveSubCategory = async (data : ISubCategory) => {
    return await axios.post('/subcategories/store',{ ...data },{
        headers: { 'Content-Type': 'multipart/form-data' }
    })
}

export const fetchSubCategoryByID = async (id :number) => {
    return await axios.get('/subcategories/edit/'+id)
}

export const updateSubCategory = async  (id : number , data : ISubCategory )=> {
    return await axios.post('/subcategories/update/'+id,{ ...data },{
        headers: { 'Content-Type': 'multipart/form-data' }
    })
}

export const deleteSubCategory = async  (id : number)=>{
    return await axios.delete('/subcategories/delete/'+id)
}
