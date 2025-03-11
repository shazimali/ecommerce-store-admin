import { IFacilityList } from '@/Interfaces/IFacility';
import { fetchFacilities } from '@/services/FacilitiesService';
import { onMounted } from 'vue';
import { toast } from 'vue3-toastify';

export function useFacilities(){
       const lstFacilities = ref<IFacilityList>([])
       const total_items = ref<number>()
       const current_page = ref<number>(1)
       const item_per_page = ref<number>(5)
       const search = ref<string>('')
       const loading = ref<boolean>(false)
       const headers = [
               { title: "Title", align: "start",value: "title" },
               { title: "Class", value: "class"},
               { title: "Countries", value: "countries"},
               { title: "Created At", value: "created_at"},
               { title: "Actions", value: "actions" }
           ]
       onMounted(() => {
        doFetchFacilities();
       })

       const doFetchFacilities = () => {
            loading.value = true;
            fetchFacilities(current_page.value,item_per_page.value,search.value).then((res) => {
                lstFacilities.value = res.data.data
               total_items.value= res.data.meta.total
               loading.value = false;
               }).catch((err) => {
               toast.error(err.message)
               loading.value = false;
            })
       }
       
  return {
    lstFacilities,
    loading,
    headers,
    total_items,
    current_page,
    item_per_page,
    search,
    doFetchFacilities,
  }
}
