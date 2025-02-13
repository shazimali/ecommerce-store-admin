import { ILogin } from "@/interfaces/ILogin"
import axios from "axios"
export const   login = async (data: ILogin) => {
    return await axios.post('/auth/token',{email: data.email, password: data.password})  
}

export const   logout = async (id: number) => {
    return await axios.post('/auth/logout',{id: id})  
}
