import { ICouponList } from '@/Interfaces/ICoupon';
import { fetchCoupons } from '@/services/CouponsService';
import { onMounted } from 'vue';
import { toast } from 'vue3-toastify';


export function useCoupons(){
       const lstCoupons = ref<ICouponList>([])
       const total_items = ref<number>()
       const current_page = ref<number>(1)
       const item_per_page = ref<number>(5)
       const search = ref<string>('')
       const loading = ref<boolean>(false)
       const headers = [
               { title: "Title", align: "start",value: "title" },
               { title: "Code", value: "code" },
               { title: "Discount", value: "discount" },
               { title: "Date_From", value: "date_from" },
               { title: "Date_To", value: "date_to" },
               { title: "Country", value: "country" },
               {title: "Status", value: "status"},
               { title: "Created At", value: "created_at"},
               { title: "Actions", value: "actions" }
              
           ]
       onMounted(() => {
        doFetchCoupons();
       })

       const doFetchCoupons = () => {
            loading.value = true;
            fetchCoupons(current_page.value,item_per_page.value,search.value).then((res) => {
            lstCoupons .value = res.data.data
               total_items.value= res.data.meta.total
               loading.value = false;
               }).catch((err) => {
               toast.error(err.message)
               loading.value = false;
            })
       }
       
  return {
    lstCoupons, 
    loading,
    headers,
    total_items,
    current_page,
    item_per_page,
    search,
    doFetchCoupons,
  }
}
