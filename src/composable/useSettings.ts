import { ISettingList } from '@/Interfaces/ISetting';
import { fetchSettings } from '@/services/SettingsService';
import { onMounted } from 'vue';
import { toast } from 'vue3-toastify';


export function useSettings(){
       const lstSettings = ref<ISettingList>([])
       const total_items = ref<number>()
       const current_page = ref<number>(1)
       const item_per_page = ref<number>(5)
       const search = ref<string>('')
       const loading = ref<boolean>(false)
       const headers = [
               { title: "Title", align: "start",value: "title" },
               { title: "Key", value: "key" },
               { title: "Value", value: "value" },
               { title: "Country", value: "country" },
               { title: "Created At", value: "created_at"},
               { title: "Actions", value: "actions" }
              
           ]
       onMounted(() => {
        doFetchSettings();
       })

       const doFetchSettings = () => {
            loading.value = true;
            fetchSettings(current_page.value,item_per_page.value,search.value).then((res) => {
                lstSettings.value = res.data.data
               total_items.value= res.data.meta.total
               loading.value = false;
               }).catch((err) => {
               toast.error(err.message)
               loading.value = false;
            })
       }
       
  return {
    lstSettings,
    loading,
    headers,
    total_items,
    current_page,
    item_per_page,
    search,
    doFetchSettings,
  }
}
