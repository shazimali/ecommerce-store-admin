import { IWebsiteList } from '@/interfaces/IWebsite';
import { fetchWebsites } from '@/services/WebsiteService';
import { onMounted } from 'vue';
import { toast } from 'vue3-toastify';

export function useWebsite(){
       const lstWebsites = ref<IWebsiteList>([])
       const total_items = ref<number>()
       const current_page = ref<number>(1)
       const item_per_page = ref<number>(5)
       const search = ref<string>('')
       const loading = ref<boolean>(false)
     const router = useRouter();
       const headers = [
               { title: "Title", align: "start",value: "title" },
               { title: "Domain", value: "domain"},
               { title: "Phone", value: "phone"},
               { title: "Email Address", value: "email"},
               { title: "Order", value: "order"},
               { title: "Status", value: "status"},
               { title: "Created At", value: "created_at"},
               { title: "Actions", value: "actions" }
           ]
       onMounted(() => {
            doFetchWebsites();
       })

       const doFetchWebsites = () => {
            loading.value = true;
            fetchWebsites(current_page.value,item_per_page.value,search.value).then((res) => {
                lstWebsites.value = res.data.data
               total_items.value= res.data.meta.total
               loading.value = false;
               }).catch((err) => {
               toast.error(err.message)
               loading.value = false;
            })
       }
       
  return {
    lstWebsites,
    loading,
    headers,
    total_items,
    current_page,
    item_per_page,
    search,
    doFetchWebsites,
  }
}
