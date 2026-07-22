import { IRole } from "@/Interfaces/IRole"
import { AxiosInstance } from "axios"

export const  fetchRoles = async (axiosInstance: AxiosInstance, current_page :number,item_per_page :number, search:string) => {
    return await axiosInstance.get('/roles?page='+current_page+'&item_per_page='+item_per_page+'&search='+search)  
}

export const  fetchAllPermissions = async (axiosInstance: AxiosInstance) => {
    return await axiosInstance.get('/roles/get-all-permission')  
}

export const saveRole = async (axiosInstance: AxiosInstance, data : IRole) => {
    return await axiosInstance.post('/roles/store',{ name:data.name, permissions: data.permissions })
}

export const fetchRoleByID = async (axiosInstance: AxiosInstance, id :number) => {
    return await axiosInstance.get('/roles/edit/'+id)
}

export const updateRole = async  (axiosInstance: AxiosInstance, id : number , data : IRole )=>{
    return await axiosInstance.put('/roles/update/'+id,{...data})
}

export const deleteRole = async  (axiosInstance: AxiosInstance, id : number)=>{
    return await axiosInstance.delete('/roles/delete/'+id)
}
