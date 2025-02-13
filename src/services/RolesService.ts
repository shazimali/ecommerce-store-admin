import { IRole } from "@/interfaces/IRole"
import axios from "axios"

export const  fetchRoles = async (current_page :number,item_per_page :number, search:string) => {
    return await axios.get('/roles?page='+current_page+'&item_per_page='+item_per_page+'&search='+search)  
}

export const  fetchAllPermissions = async () => {
    return await axios.get('/roles/get-all-permission')  
}

export const saveRole = async (data : IRole) => {
    return await axios.post('/roles/store',{ name:data.name, permissions: data.permissions })
}

export const fetchRoleByID = async (id :number) => {
    return await axios.get('/roles/edit/'+id)
}

export const updateRole = async  (id : number , data : IRole )=>{
    return await axios.put('/roles/update/'+id,{...data})
}

export const deleteRole = async  (id : number)=>{
    return await axios.delete('/roles/delete/'+id)
}
