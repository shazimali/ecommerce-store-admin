import { IBlog } from "@/Interfaces/IBlog"
import axios from "axios"


export const  fetchBlogs = async (current_page :number,item_per_page :number, search:string) => {
    return await axios.get('/blogs?page='+current_page+'&item_per_page='+item_per_page+'&search='+search)  
}

export const  fetchAllCountries = async () => {
    return await axios.get('/blogs/get-all-countries')  
}

export const saveBlog = async (data : IBlog) => {
    return await axios.post('/blogs/store',{ ...data })
}

export const fetchBlogByID = async (id :number) => {
    return await axios.get('/blogs/edit/'+id)
}

export const updateBlog = async  (id : number , data : IBlog )=>{
    return await axios.put('/blogs/update/'+id,{ ...data })
}

export const deleteBlog = async  (id : number)=>{
    return await axios.delete('/blogs/delete/'+id)
}
