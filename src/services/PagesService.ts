import { IPages } from "@/Interfaces/IPage"
import axios from "axios"


export const  fetchPages = async (current_page :number,item_per_page :number, search:string) => {
    return await axios.get('/pages?page='+current_page+'&item_per_page='+item_per_page+'&search='+search)  
}

export const  fetchAllCountries = async () => {
    return await axios.get('/pages/get-all-countries')  
}

export const savePage = async (data : IPages) => {
    return await axios.post('/pages/store',{ ...data } )
}

export const fetchPageByID = async (id :number) => {
    return await axios.get('/pages/edit/'+id)
}

export const updatePage = async  (id : number , data : IPages )=>{
    return await axios.put('/pages/update/'+id,{ ...data } )
}

export const deletePage = async  (id : number)=>{
    return await axios.delete('/pages/delete/'+id)
}
