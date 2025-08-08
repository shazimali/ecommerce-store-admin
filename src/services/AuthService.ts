import { ILogin } from "@/interfaces/ILogin"
import { INotification } from "@/Interfaces/INotification"
import axios from "axios"
export const   login = async (data: ILogin) => {
    return await axios.post('/auth/token',{email: data.email, password: data.password})  
}

export const   logout = async (id: number) => {
    return await axios.post('/auth/logout',{id: id})  
}

export const   fetchNotifications = async () => {
    return await axios.get('/auth/notifications')  
}

export const   updateNotification = async (id:number) => {
    return await axios.post('/auth/notifications/'+id)  
}

export const   storeNotification = async (data: INotification) => {
    return await axios.post('/auth/notifications/new',{...data})  
}

export const   deleteAllNotifications = async () => {
    return await axios.post('/auth/notifications-destroy')  
}
