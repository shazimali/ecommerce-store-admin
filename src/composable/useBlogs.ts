import { IBlogList } from '@/Interfaces/IBlog';
import { fetchBlogs } from '@/services/BlogsService';
import { onMounted } from 'vue';
import { toast } from 'vue3-toastify';

export function useBlogs(){
       const lstBlogs = ref<IBlogList>([])
       const total_items = ref<number>()
       const current_page = ref<number>(1)
       const item_per_page = ref<number>(5)
       const search = ref<string>('')
       const loading = ref<boolean>(false)
       const headers = [
               { title: "Title", align: "start",value: "title" },
               { title: "Slug", value: "slug"},
               { title: "Image", value: "image"},
               { title: "Description", value: "description"},
               { title: "Seo Title", value: "seo_title"},
               { title: "Seo Desc", value: "seo_desc"},
               { title: "Status", value: "status"},
               { title: "Countries", value: "countries"},
               { title: "Created At", value: "created_at"},
               { title: "Actions", value: "actions" }
           ]
       onMounted(() => {
        doFetchBlogs();
       })

       const doFetchBlogs = () => {
            loading.value = true;
            fetchBlogs(current_page.value,item_per_page.value,search.value).then((res) => {
                lstBlogs.value = res.data.data
               total_items.value= res.data.meta.total
               loading.value = false;
               }).catch((err) => {
               toast.error(err.message)
               loading.value = false;
            })
       }
       
  return {
    lstBlogs,
    loading,
    headers,
    total_items,
    current_page,
    item_per_page,
    search,
    doFetchBlogs,
  }
}
