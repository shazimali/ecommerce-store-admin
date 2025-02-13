import { IUser } from "@/interfaces/IUser"
import axios from "axios"

export const  fetchUsers = async (current_page :number,item_per_page :number, search:string) => {
    return await axios.get('/users')  
}

export const  fetchAllRoles = async () => {
    return await axios.get('/users/get-all-roles')  
}

export const saveUser = async (data : IUser) => {
    return await axios.post('/users/store',{ ...data})
}

export const fetchUserByID = async (id :number) => {
    return await axios.get('/users/edit/'+id)
}

export const updateUser = async  (id : number , data : IUser )=>{
    return await axios.put('/users/update/'+id,{...data})
}

export const deleteUser = async  (id : number)=>{
    return await axios.delete('/users/delete/'+id)
}
