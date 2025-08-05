import { ICollectionList } from '@/Interfaces/ICollection';
import { fetchCollections } from '@/services/CollectionsService';
import { onMounted } from 'vue';
import { toast } from 'vue3-toastify';

export function useCollections(){
       const lstCollections = ref<ICollectionList>([])
       const total_items = ref<number>()
       const current_page = ref<number>(1)
       const item_per_page = ref<number>(5)
       const search = ref<string>('')
       const loading = ref<boolean>(false)
       const headers = [
               { title: "Title", align: "start",value: "title" },
               { title: "Slug", value: "slug"},
               { title: "Image", value: "image"},
               { title: "Mob Image", value: "mob_image"},
               { title: "Order", value: "order"},
               { title: "Websites", value: "websites"},
               { title: "Products", value: "products"},
               { title: "Status", value: "status"},
               { title: "Position", value: "position"},
               { title: "Created At", value: "created_at"},
               { title: "Actions", value: "actions" }
           ]
       onMounted(() => {
        doFetchCollections();
       })

       const doFetchCollections = () => {
            loading.value = true;
            fetchCollections(current_page.value,item_per_page.value,search.value).then((res) => {
                lstCollections.value = res.data.data
               total_items.value= res.data.meta.total
               loading.value = false;
               }).catch((err) => {
               toast.error(err.message)
               loading.value = false;
            })
       }
       
  return {
    lstCollections,
    loading,
    headers,
    total_items,
    current_page,
    item_per_page,
    search,
    doFetchCollections,
  }
}
