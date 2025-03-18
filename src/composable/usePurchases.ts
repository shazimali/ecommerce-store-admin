import { IPurchaseList } from '@/Interfaces/IPurchase';
import { fetchPurchases } from '@/services/PurchaseService';
import { onMounted } from 'vue';
import { toast } from 'vue3-toastify';

export function usePurchases(){
       const lstPurchases = ref<IPurchaseList>([])
       const total_items = ref<number>()
       const current_page = ref<number>(1)
       const item_per_page = ref<number>(5)
       const search = ref<string>('')
       const loading = ref<boolean>(false)
       const headers = [
               { title: "Invoice #", align: "start",value: "invoice_id" },
               { title: "Supplier", value: "supplier"},
               { title: "Qty", value: "total_qty"},
               { title: "Price", value: "total_price"},
               { title: "Invoice Date", value: "invoice_date"},
               { title: "Created At", value: "created_at"},
               { title: "Actions", value: "actions" }
           ]
       onMounted(() => {
        doFetchPurchases();
       })

       const doFetchPurchases = () => {
            loading.value = true;
            fetchPurchases(current_page.value,item_per_page.value,search.value).then((res) => {
                lstPurchases.value = res.data.data
               total_items.value= res.data.meta.total
               loading.value = false;
               }).catch((err) => {
               toast.error(err.message)
               loading.value = false;
            })
       }
       
  return {
    lstPurchases,
    loading,
    headers,
    total_items,
    current_page,
    item_per_page,
    search,
    doFetchPurchases,
  }
}
