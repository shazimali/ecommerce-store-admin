import { ISubCategory } from '@/Interfaces/ISubCategory';
import { fetchSubCategories } from '@/services/SubCategoriesService';
import { onMounted } from 'vue';
import { toast } from 'vue3-toastify';

export function useSubCategories(){
       const lstSubCategories = ref<ISubCategory>([])
       const total_items = ref<number>()
       const current_page = ref<number>(1)
       const item_per_page = ref<number>(5)
       const search = ref<string>('')
       const loading = ref<boolean>(false)
       const headers = [
               { title: "Title", align: "start",value: "title" },
               { title: "Slug", value: "slug"},
               { title: "Image", value: "image"},
               { title: "Order", value: "order"},
               { title: "Categories", value: "categories"},
               { title: "Created At", value: "created_at"},
               { title: "Actions", value: "actions" }
           ]
       onMounted(() => {
        doFetchSubCategories();
       })

       const doFetchSubCategories = () => {
            loading.value = true;
            fetchSubCategories(current_page.value,item_per_page.value,search.value).then((res) => {
                lstSubCategories.value = res.data.data
               total_items.value= res.data.meta.total
               loading.value = false;
               }).catch((err) => {
               toast.error(err.message)
               loading.value = false;
            })
       }
       
  return {
    lstSubCategories,
    loading,
    headers,
    total_items,
    current_page,
    item_per_page,
    search,
    doFetchSubCategories,
  }
}
