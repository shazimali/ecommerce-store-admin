import { IProductReview } from "@/Interfaces/IProductReview"
import axios from "axios"


export const  fetchProductReview = async (current_page :number,item_per_page :number, search:string) => {
    return await axios.get('/product-review?page='+current_page+'&item_per_page='+item_per_page+'&search='+search)  
}

export const  fetchAllProductReview = async () => {
    return await axios.get('/product-review/get-all-products')  
}

export const saveProductReview = async (data : IProductReview) => {
    return await axios.post('/product-review/store',{ ...data }, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
}

export const fetchProductReviewByID = async (id :number) => {
    return await axios.get('/product-review/edit/'+id)
}

export const updateProductReview = async  (id : number , data : IProductReview )=>{
    return await axios.post('/product-review/update/'+id,{ ...data }, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
}

export const deleteProductReview = async  (id : number)=>{
    return await axios.delete('/product-review/delete/'+id)
}
