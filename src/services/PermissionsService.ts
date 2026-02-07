import { IPermission } from "@/Interfaces/IPermission"
import { AxiosInstance } from "axios"

export const  fetchPermissions = async (axiosInstance: AxiosInstance, current_page :number,item_per_page :number, search:string) => {
    return await axiosInstance.get('/permissions?page='+current_page+'&item_per_page='+item_per_page+'&search='+search)  
}

export const savePermission = async (axiosInstance: AxiosInstance, data : IPermission) => {
    return await axiosInstance.post('/permissions/store',{ ...data })
}

export const fetchPermissionByID = async (axiosInstance: AxiosInstance, id :number) => {
    return await axiosInstance.get('/permissions/edit/'+id)
}

export const updatePermission = async  (axiosInstance: AxiosInstance, id : number , data : IPermission )=>{
    return await axiosInstance.put('/permissions/update/'+id,{...data})
}

export const deletePermission = async  (axiosInstance: AxiosInstance, id : number)=>{
    return await axiosInstance.delete('/permissions/delete/'+id)
}
