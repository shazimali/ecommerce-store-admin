import { IBannerList } from '@/Interfaces/IBanner';
import { fetchBanners } from '@/services/BannersService';
import { onMounted } from 'vue';
import { toast } from 'vue3-toastify';

export function useBanners(){
       const lstBanners = ref<IBannerList>([])
       const total_items = ref<number>()
       const current_page = ref<number>(1)
       const item_per_page = ref<number>(5)
       const search = ref<string>('')
       const loading = ref<boolean>(false)
       const headers = [
               { title: "Title", align: "start",value: "title" },
               { title: "Image", value: "image"},
               { title: "Mob Image", value: "mob_image"},
               { title: "Order", value: "order"},
               { title: "Websites", value: "websites"},
               { title: "Created At", value: "created_at"},
               { title: "Actions", value: "actions" }
           ]
       onMounted(() => {
        doFetchBanners();
       })

       const doFetchBanners = () => {
            loading.value = true;
            fetchBanners(current_page.value,item_per_page.value,search.value).then((res) => {
                lstBanners.value = res.data.data
               total_items.value= res.data.meta.total
               loading.value = false;
               }).catch((err) => {
               toast.error(err.message)
               loading.value = false;
            })
       }
       
  return {
    lstBanners,
    loading,
    headers,
    total_items,
    current_page,
    item_per_page,
    search,
    doFetchBanners,
  }
}
