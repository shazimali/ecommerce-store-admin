import { ISetting } from "@/Interfaces/ISetting"
import { AxiosInstance } from "axios"

export const  fetchSettings = async (axiosInstance: AxiosInstance, current_page :number,item_per_page :number, search:string) => {
  return await axiosInstance.get('/settings?page='+current_page+'&item_per_page='+item_per_page+'&search='+search)  
}

export const  fetchAllCountries = async (axiosInstance: AxiosInstance) => {
    return await axiosInstance.get('/settings/get-all-countries')  
}

export const saveSetting = async (axiosInstance: AxiosInstance, data : ISetting) => {
  return await axiosInstance.post('/settings/store',{ ...data })
}

export const fetchSettingByID = async (axiosInstance: AxiosInstance, id :number) => {
  return await axiosInstance.get('/settings/edit/'+id)
}

export const updateSetting = async  (axiosInstance: AxiosInstance, id : number , data : ISetting )=>{
  return await axiosInstance.put('/settings/update/'+id,{ ...data })
}

export const deleteSetting = async  (axiosInstance: AxiosInstance, id : number)=>{
  return await axiosInstance.delete('/settings/delete/'+id)
}
