import { IProductReview } from "@/Interfaces/IProductReview"
import { AxiosInstance } from "axios"


export const  fetchProductReview = async (axiosInstance: AxiosInstance, current_page :number,item_per_page :number, search:string) => {
    return await axiosInstance.get('/product-review?page='+current_page+'&item_per_page='+item_per_page+'&search='+search)  
}

export const  fetchAllProductReview = async (axiosInstance: AxiosInstance) => {
    return await axiosInstance.get('/product-review/get-all-products')  
}

export const saveProductReview = async (axiosInstance: AxiosInstance, data : IProductReview) => {
    return await axiosInstance.post('/product-review/store',{ ...data }, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
}

export const fetchProductReviewByID = async (axiosInstance: AxiosInstance, id :number) => {
    return await axiosInstance.get('/product-review/edit/'+id)
}

export const updateProductReview = async  (axiosInstance: AxiosInstance, id : number , data : IProductReview )=>{
    return await axiosInstance.post('/product-review/update/'+id,{ ...data }, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
}

export const deleteProductReview = async  (axiosInstance: AxiosInstance, id : number)=>{
    return await axiosInstance.delete('/product-review/delete/'+id)
}
