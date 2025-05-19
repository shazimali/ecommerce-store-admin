import { ICustomerList } from '@/Interfaces/ICustomer';
import { fetchCustomer } from '@/services/CustomerService';
import { onMounted } from 'vue';
import { toast } from 'vue3-toastify';


export function useCustomer(){
       const lstCustomer = ref<ICustomerList>([])
       const total_items = ref<number>()
       const current_page = ref<number>(1)
       const item_per_page = ref<number>(5)
       const search = ref<string>('')
       const loading = ref<boolean>(false)
       const headers = [
               { title: "Sr.No", align: "start",value: "id" },
               { title: "Name", value: "name" },
               { title: "Email", value: "email" },
               { title: "Phone", value: "phone" },
               { title: "Address", value: "address" },
               { title: "City", value: "city" },
               { title: "Country", value: "country_id" },
               {title:  "Type", value: "type"},
               {title:  "First Name", value: "first_name"},
               {title:  "Last Name", value: "last_name"},
              //  { title: "Actions", value: "actions" }
              
           ]
       onMounted(() => {
        doFetchCustomer();
       })

       const doFetchCustomer = () => {
            loading.value = true;
            fetchCustomer(current_page.value,item_per_page.value,search.value).then((res) => {
              lstCustomer .value = res.data.data
               total_items.value= res.data.meta.total
               loading.value = false;
               }).catch((err) => {
               toast.error(err.message)
               loading.value = false;
            })
       }
       
  return {
    lstCustomer , 
    loading,
    headers,
    total_items,
    current_page,
    item_per_page,
    search,
    doFetchCustomer,
  }
}
