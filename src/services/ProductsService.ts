import { IProduct, IProductPrice } from "@/Interfaces/IProduct";
import axios from "axios";


export const  fetchProducts = async (current_page :number,item_per_page :number, search:string) => {
    return await axios.get('/products?page='+current_page+'&item_per_page='+item_per_page+'&search='+search)  
}

export const  fetchAllSubCategories = async () => {
    return await axios.get('/products/get-all-sub-categories')  
}

export const saveProduct = async (data : IProduct) => {
    return await axios.post('/products/store',{ ...data },{
        headers: { 'Content-Type': 'multipart/form-data' }
    })
}

export const fetchProductByID = async (id :number) => {
    return await axios.get('/products/edit/'+id)
}

export const updateProduct = async  (id : number , data : IProduct )=>{
    return await axios.post('/products/update/'+id,{ ...data },{
        headers: { 'Content-Type': 'multipart/form-data' }
    })
}

export const deleteProduct = async  (id : number)=>{
    return await axios.delete('/products/delete/'+id)
}

export const fetchAllPricesByProductID = async  (id : number)=>{
    return await axios.get('/products/prices/'+id)
}

export const saveProductPrice = async  (data: IProductPrice)=>{
    return await axios.post('/products/prices/store',{...data})
}

export const deleteProductPrice = async  (id : number)=>{
    return await axios.delete('/products/prices/delete/'+id)
}
