import { ISocialMediaList } from '@/Interfaces/ISocialMedia';
import { fetchSocialMedias } from '@/services/SocialMediasService';
import { onMounted } from 'vue';
import { toast } from 'vue3-toastify';

export function useSocialMedias(){
       const lstSocialMedias = ref<ISocialMediaList>([])
       const total_items = ref<number>()
       const current_page = ref<number>(1)
       const item_per_page = ref<number>(5)
       const search = ref<string>('')
       const loading = ref<boolean>(false)
       const headers = [
               { title: "Title", align: "start",value: "title" },
               { title: "Class", value: "class"},
               { title: "Websites", value: "websites"},
               { title: "Created At", value: "created_at"},
               { title: "Actions", value: "actions" }
           ]
       onMounted(() => {
        doFetchSocialMedias();
       })

       const doFetchSocialMedias = () => {
            loading.value = true;
            fetchSocialMedias(current_page.value,item_per_page.value,search.value).then((res) => {
                lstSocialMedias.value = res.data.data
               total_items.value= res.data.meta.total
               loading.value = false;
               }).catch((err) => {
               toast.error(err.message)
               loading.value = false;
            })
       }
       
  return {
    lstSocialMedias,
    loading,
    headers,
    total_items,
    current_page,
    item_per_page,
    search,
    doFetchSocialMedias,
  }
}
