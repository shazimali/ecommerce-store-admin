import { IBadge } from '@/Interfaces/IBadge';
import httpClient from '@/plugins/httpClient';
import { fetchBadges } from '@/services/BadgesService';
import { onMounted, ref } from 'vue';
import { toast } from 'vue3-toastify';

export function useBadges(){
       const lstBadges = ref<IBadge[]>([])
       const total_items = ref<number>(0)
       const current_page = ref<number>(1)
       const item_per_page = ref<number>(5)
       const search = ref<string>('')
       const loading = ref<boolean>(false)
       const headers = [
               { title: "Title", align: "start" as const, value: "title" },
               { title: "Image", value: "image"},
               { title: "Sub Categories", value: "sub_categories"},
               { title: "Status", value: "status"},
               { title: "Created At", value: "created_at"},
               { title: "Actions", value: "actions" }
           ]
       onMounted(() => {
        doFetchBadges();
       })

       const doFetchBadges = () => {
            loading.value = true;
            fetchBadges(httpClient, current_page.value, item_per_page.value, search.value).then((res) => {
                lstBadges.value = res.data.data
                total_items.value = res.data.meta.total
                loading.value = false;
            }).catch((err) => {
                toast.error(err.message)
                loading.value = false;
            })
       }
       
  return {
    lstBadges,
    loading,
    headers,
    total_items,
    current_page,
    item_per_page,
    search,
    doFetchBadges,
  }
}
