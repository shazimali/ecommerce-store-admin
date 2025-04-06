import { ISetting } from "@/Interfaces/ISetting"
import axios from "axios"

export const  fetchSettings = async (current_page :number,item_per_page :number, search:string) => {
  return await axios.get('/settings?page='+current_page+'&item_per_page='+item_per_page+'&search='+search)  
}

export const  fetchAllCountries = async () => {
    return await axios.get('/settings/get-all-countries')  
}

export const saveSetting = async (data : ISetting) => {
  return await axios.post('/settings/store',{ ...data })
}

export const fetchSettingByID = async (id :number) => {
  return await axios.get('/settings/edit/'+id)
}

export const updateSetting = async  (id : number , data : ISetting )=>{
  return await axios.put('/settings/update/'+id,{ ...data })
}

export const deleteSetting = async  (id : number)=>{
  return await axios.delete('/settings/delete/'+id)
}
