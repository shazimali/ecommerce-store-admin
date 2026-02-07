import { IFacility } from "@/Interfaces/IFacility";
import { AxiosInstance } from "axios";

export const  fetchFacilities = async (axiosInstance: AxiosInstance, current_page :number,item_per_page :number, search:string) => {
    return await axiosInstance.get('/facilities?page='+current_page+'&item_per_page='+item_per_page+'&search='+search)  
}

export const  fetchAllCountries = async (axiosInstance: AxiosInstance) => {
    return await axiosInstance.get('/facilities/get-all-countries')  
}

export const saveFacility = async (axiosInstance: AxiosInstance, data : IFacility) => {
    return await axiosInstance.post('/facilities/store',{ ...data })
}

export const fetchFacilityByID = async (axiosInstance: AxiosInstance, id :number) => {
    return await axiosInstance.get('/facilities/edit/'+id)
}

export const updateFacility = async  (axiosInstance: AxiosInstance, id : number , data : IFacility )=>{
    return await axiosInstance.post('/facilities/update/'+id,{ ...data })
}

export const deleteFacility = async  (axiosInstance: AxiosInstance, id : number)=>{
    return await axiosInstance.delete('/facilities/delete/'+id)
}
