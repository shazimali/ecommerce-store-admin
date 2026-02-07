import { ILogin } from "@/Interfaces/ILogin"
import { INotification } from "@/Interfaces/INotification"
import { AxiosInstance } from "axios"

export const   login = async (axiosInstance: AxiosInstance, data: ILogin) => {
    return await axiosInstance.post('/auth/token',{email: data.email, password: data.password})  
}

export const   logout = async (axiosInstance: AxiosInstance, id: number) => {
    return await axiosInstance.post('/auth/logout',{id: id})  
}

export const   fetchNotifications = async (axiosInstance: AxiosInstance) => {
    return await axiosInstance.get('/auth/notifications')  
}

export const   updateNotification = async (axiosInstance: AxiosInstance, id:number) => {
    return await axiosInstance.post('/auth/notifications/'+id)  
}

export const   storeNotification = async (axiosInstance: AxiosInstance, data: INotification) => {
    return await axiosInstance.post('/auth/notifications/new',{...data})  
}

export const   deleteAllNotifications = async (axiosInstance: AxiosInstance) => {
    return await axiosInstance.post('/auth/notifications-destroy')  
}
