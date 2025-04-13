import { ICod } from "@/Interfaces/ICod"
import axios from "axios"


export const  fetchCod = async (current_page :number,item_per_page :number, search:string) => {
    return await axios.get('/cod?page='+current_page+'&item_per_page='+item_per_page+'&search='+search)  
}

export const  fetchAllCountries = async () => {
    return await axios.get('/cod/get-all-countries')  
}

export const saveCod = async (data : ICod) => {
    return await axios.post('/cod/store',{ ...data })
}

export const fetchCodByID = async (id :number) => {
    return await axios.get('/cod/edit/'+id)
}

export const updateCod = async  (id : number , data :  ICod)=>{
  return await axios.put('/cod/update/'+id,{ ...data })
}

export const deleteCod = async  (id : number)=>{
    return await axios.delete('/cod/delete/'+id)
}
