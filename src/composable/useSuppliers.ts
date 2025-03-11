import { ISupplierList } from '@/Interfaces/ISupplier';
import { fetchSuppliers } from '@/services/SuppliersService';
import { onMounted } from 'vue';
import { toast } from 'vue3-toastify';

export function useSuppliers(){
       const lstSuppliers = ref<ISupplierList>([])
       const total_items = ref<number>()
       const current_page = ref<number>(1)
       const item_per_page = ref<number>(5)
       const search = ref<string>('')
       const loading = ref<boolean>(false)
     const router = useRouter();
       const headers = [
               { title: "Name", align: "start",value: "name" },
               { title: "Email", value: "email"},
               { title: "Phone", value: "phone"},
               { title: "Created At", value: "created_at"},
               { title: "Actions", value: "actions" }
           ]
       onMounted(() => {
        doFetchSuppliers();
       })

       const doFetchSuppliers = () => {
            loading.value = true;
            fetchSuppliers(current_page.value,item_per_page.value,search.value).then((res) => {
                lstSuppliers.value = res.data.data
               total_items.value= res.data.meta.total
               loading.value = false;
               }).catch((err) => {
               toast.error(err.message)
               loading.value = false;
            })
       }
       
  return {
    lstSuppliers,
    loading,
    headers,
    total_items,
    current_page,
    item_per_page,
    search,
    doFetchSuppliers,
  }
}
