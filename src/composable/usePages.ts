import { IPagesList } from '@/Interfaces/IPage';
import { fetchPages } from '@/services/PagesService';
import { onMounted } from 'vue';
import { toast } from 'vue3-toastify';


export function usePages(){
       const lstPages = ref<IPagesList>([])
       const total_items = ref<number>()
       const current_page = ref<number>(1)
       const item_per_page = ref<number>(5)
       const search = ref<string>('')
       const loading = ref<boolean>(false)
       const headers = [
               { title: "Title", align: "start",value: "title" },
               { title: "Slug", value: "slug" },
              //  { title: "Content", value: "content" },
              { title: "Seo Title", value: "seo_title"},
              { title: "Seo Desc", value: "seo_description"},
               {title: "Position", value:"position"},
               { title: "Status", value: "status"},
               { title: "Countries", value: "countries"},
               { title: "Created At", value: "created_at"},
               { title: "Actions", value: "actions" }
              
           ]
       onMounted(() => {
        doFetchPages();
       })

       const doFetchPages = () => {
            loading.value = true;
            fetchPages(current_page.value,item_per_page.value,search.value).then((res) => {
              lstPages .value = res.data.data
               total_items.value= res.data.meta.total
               loading.value = false;
               }).catch((err) => {
               toast.error(err.message)
               loading.value = false;
            })
       }
       
  return {
    lstPages, 
    loading,
    headers,
    total_items,
    current_page,
    item_per_page,
    search,
    doFetchPages,
  }
}
