import { IProduct, IProductColor, IProductPrice } from "@/Interfaces/IProduct";
import { AxiosInstance } from "axios";


export const  fetchProducts = async (axiosInstance: AxiosInstance, current_page :number,item_per_page :number, search:string) => {
    return await axiosInstance.get('/products?page='+current_page+'&item_per_page='+item_per_page+'&search='+search)  
}

export const  fetchAllSubCategories = async (axiosInstance: AxiosInstance) => {
    return await axiosInstance.get('/products/get-all-sub-categories')  
}

export const saveProduct = async (axiosInstance: AxiosInstance, data : IProduct) => {
    return await axiosInstance.post('/products/store',{ ...data },{
        headers: { 'Content-Type': 'multipart/form-data' }
    })
}

export const fetchProductByID = async (axiosInstance: AxiosInstance, id :number) => {
    return await axiosInstance.get('/products/edit/'+id)
}

export const updateProduct = async  (axiosInstance: AxiosInstance, id : number , data : IProduct )=>{
    return await axiosInstance.post('/products/update/'+id,{ ...data },{
        headers: { 'Content-Type': 'multipart/form-data' }
    })
}

export const deleteProduct = async  (axiosInstance: AxiosInstance, id : number)=>{
    return await axiosInstance.delete('/products/delete/'+id)
}

export const fetchAllPricesByProductID = async  (axiosInstance: AxiosInstance, id : number)=>{
    return await axiosInstance.get('/products/prices/'+id)
}

export const saveProductPrice = async  (axiosInstance: AxiosInstance, data: IProductPrice)=>{
    return await axiosInstance.post('/products/prices/store',{...data})
}

export const deleteProductPrice = async  (axiosInstance: AxiosInstance, id : number)=>{
    return await axiosInstance.delete('/products/prices/delete/'+id)
}

export const fetchAllColorsByProductID = async  (axiosInstance: AxiosInstance, id : number)=>{
    return await axiosInstance.get('/products/colors/'+id)
}

export const saveProductColor = async  (axiosInstance: AxiosInstance, data:IProductColor)=>{
    return await axiosInstance.post('/products/colors/store',{...data},{
        headers: { 'Content-Type': 'multipart/form-data' }
    })
}

export const deleteProductColor = async  (axiosInstance: AxiosInstance, id : number)=>{
    return await axiosInstance.delete('/products/colors/delete/'+id)
}
