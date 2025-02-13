import { IPermission } from "@/interfaces/IPermission"
import axios from "axios"

export const  fetchPermissions = async (current_page :number,item_per_page :number, search:string) => {
    return await axios.get('/permissions?page='+current_page+'&item_per_page='+item_per_page+'&search='+search)  
}

export const savePermission = async (data : IPermission) => {
    return await axios.post('/permissions/store',{ ...data })
}

export const fetchPermissionByID = async (id :number) => {
    return await axios.get('/permissions/edit/'+id)
}

export const updatePermission = async  (id : number , data : IPermission )=>{
    return await axios.put('/permissions/update/'+id,{...data})
}

export const deletePermission = async  (id : number)=>{
    return await axios.delete('/permissions/delete/'+id)
}
