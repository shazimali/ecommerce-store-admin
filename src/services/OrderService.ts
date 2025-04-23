import axios from "axios"

export const  fetchOrder = async (current_page :number,item_per_page :number, search:string) => {
  return await axios.get('/orders?page='+current_page+'&item_per_page='+item_per_page+'&search='+search)  
}
