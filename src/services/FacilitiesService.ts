import { IFacility } from "@/Interfaces/IFacility";
import axios from "axios";

export const  fetchFacilities = async (current_page :number,item_per_page :number, search:string) => {
    return await axios.get('/facilities?page='+current_page+'&item_per_page='+item_per_page+'&search='+search)  
}

export const  fetchAllCountries = async () => {
    return await axios.get('/facilities/get-all-countries')  
}

export const saveFacility = async (data : IFacility) => {
    return await axios.post('/facilities/store',{ ...data })
}

export const fetchFacilityByID = async (id :number) => {
    return await axios.get('/facilities/edit/'+id)
}

export const updateFacility = async  (id : number , data : IFacility )=>{
    return await axios.post('/facilities/update/'+id,{ ...data })
}

export const deleteFacility = async  (id : number)=>{
    return await axios.delete('/facilities/delete/'+id)
}
