import axios from "axios"

export const  fetchCustomer = async (current_page :number,item_per_page :number, search:string) => {
  return await axios.get('/customers?page='+current_page+'&item_per_page='+item_per_page+'&search='+search)  
}
