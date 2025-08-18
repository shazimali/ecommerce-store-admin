import { INotification } from "@/Interfaces/INotification"
import axios from "axios"
export const   fetchNotifications = async () => {
    return await axios.get('/notifications')  
}

export const   updateNotification = async (id:number) => {
    return await axios.post('/notifications/update/'+id)  
}

export const   storeNotification = async (data: INotification) => {
    return await axios.post('/notifications/store',{...data})  
}

export const   deleteAllNotifications = async () => {
    return await axios.post('/notifications/destroy')  
}
