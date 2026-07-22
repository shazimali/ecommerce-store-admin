import { IBlog } from "@/Interfaces/IBlog"
import { AxiosInstance } from "axios"


export const  fetchBlogs = async (axiosInstance: AxiosInstance, current_page :number,item_per_page :number, search:string) => {
    return await axiosInstance.get('/blogs?page='+current_page+'&item_per_page='+item_per_page+'&search='+search)  
}

export const  fetchAllCountries = async (axiosInstance: AxiosInstance) => {
    return await axiosInstance.get('/blogs/get-all-countries')  
}

export const saveBlog = async (axiosInstance: AxiosInstance, data : IBlog) => {
    return await axiosInstance.post('/blogs/store',{ ...data }, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
}

export const fetchBlogByID = async (axiosInstance: AxiosInstance, id :number) => {
    return await axiosInstance.get('/blogs/edit/'+id)
}

export const updateBlog = async  (axiosInstance: AxiosInstance, id : number , data : IBlog )=>{
    return await axiosInstance.post('/blogs/update/'+id,{ ...data }, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
}

export const deleteBlog = async  (axiosInstance: AxiosInstance, id : number)=>{
    return await axiosInstance.delete('/blogs/delete/'+id)
}
