import { ICodList } from '@/Interfaces/ICod';
import { fetchCod } from '@/services/CodService';
import { onMounted } from 'vue';
import { toast } from 'vue3-toastify';

export function useCod(){
       const lstCod = ref<ICodList>([])
       const total_items = ref<number>()
       const current_page = ref<number>(1)
       const item_per_page = ref<number>(5)
       const search = ref<string>('')
       const loading = ref<boolean>(false)
       const headers = [
               { title: "Title", align: "start",value: "title" },
              //  { title: "Api Test Url", value: "api_test_url"},
              //  { title: "Api Url", value: "api_url"},
              //  { title: "Api Key", value: "api_key"},
              //  { title: "Api Password", value: "api_password"},
               { title: "Status", value: "status"},
               { title: "Countries", value: "countries"},
               { title: "Created At", value: "created_at"},
               { title: "Actions", value: "actions" }
           ]
       onMounted(() => {
        doFetchCod();
       })

       const doFetchCod = () => {
            loading.value = true;
            fetchCod(current_page.value,item_per_page.value,search.value).then((res) => {
                lstCod.value = res.data.data
               total_items.value= res.data.meta.total
               loading.value = false;
               }).catch((err) => {
               toast.error(err.message)
               loading.value = false;
            })
       }
       
  return {
    lstCod,
    loading,
    headers,
    total_items,
    current_page,
    item_per_page,
    search,
    doFetchCod,
  }
}
