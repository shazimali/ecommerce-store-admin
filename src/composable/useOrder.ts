import { IOrderList } from '@/Interfaces/IOrder';
import { fetchOrder } from '@/services/OrderService';
import { onMounted } from 'vue';
import { toast } from 'vue3-toastify';


export function useOrder(){
       const lstOrder = ref<IOrderList>([])
       const total_items = ref<number>()
       const current_page = ref<number>(1)
       const item_per_page = ref<number>(5)
       const search = ref<string>('')
       const loading = ref<boolean>(false)
       const headers = [
               { title: "Order", align: "start",value: "order_id" },
               { title: "Sub Total", value: "sub_total" },
               { title: "Total", value: "total" },
               { title: "Free Shipping", value: "free_shipping" },
               { title: "Shipping Charges", value: "shipping_charges" },
               { title: "Code", value: "code" },
               { title: "Discount", value: "discount" },
               { title: "Name", value: "name" },
               { title: "Email", value: "email" },
               {title:  "Status", value: "status"},
               { title: "Created At", value: "created_at"},
              //  { title: "Actions", value: "actions" }
              
           ]
       onMounted(() => {
        doFetchOrder();
       })

       const doFetchOrder = () => {
            loading.value = true;
            fetchOrder(current_page.value,item_per_page.value,search.value).then((res) => {
              lstOrder .value = res.data.data
               total_items.value= res.data.meta.total
               loading.value = false;
               }).catch((err) => {
               toast.error(err.message)
               loading.value = false;
            })
       }
       
  return {
    lstOrder , 
    loading,
    headers,
    total_items,
    current_page,
    item_per_page,
    search,
    doFetchOrder,
  }
}
