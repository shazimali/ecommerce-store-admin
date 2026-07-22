import { IUser } from "@/Interfaces/IUser"
import { AxiosInstance } from "axios"

export const  fetchUsers = async (axiosInstance: AxiosInstance, current_page :number,item_per_page :number, search:string) => {
    return await axiosInstance.get('/users')  
}

export const  fetchAllRoles = async (axiosInstance: AxiosInstance) => {
    return await axiosInstance.get('/users/get-all-roles')  
}

export const saveUser = async (axiosInstance: AxiosInstance, data : IUser) => {
    return await axiosInstance.post('/users/store',{ ...data})
}

export const fetchUserByID = async (axiosInstance: AxiosInstance, id :number) => {
    return await axiosInstance.get('/users/edit/'+id)
}

export const updateUser = async  (axiosInstance: AxiosInstance, id : number , data : IUser )=>{
    return await axiosInstance.put('/users/update/'+id,{...data})
}

export const deleteUser = async  (axiosInstance: AxiosInstance, id : number)=>{
    return await axiosInstance.delete('/users/delete/'+id)
}
