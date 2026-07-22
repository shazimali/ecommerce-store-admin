import { IPermissionList } from '@/Interfaces/IPermission';
import httpClient from '@/plugins/httpClient';
import { fetchPermissions } from '@/services/PermissionsService';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';

export function usePermissions(){
       const lstPermissions = ref<IPermissionList>([])
       const total_items = ref<number>()
       const current_page = ref<number>(1)
       const item_per_page = ref<number>(20)
       const search = ref<string>('')
       const loading = ref<boolean>(false)
     const router = useRouter();
       const headers = [
               { title: "Name", align: "start",value: "name" },
               { title: "Key", value: "key"},
               { title: "Created At", value: "created_at"},
               { title: "Actions", value: "actions" }
           ]
       onMounted(() => {
            doFetchPermissions();
       })


       const doFetchPermissions = () => {
            loading.value = true;
            fetchPermissions(httpClient, current_page.value,item_per_page.value,search.value).then((res) => {
               lstPermissions.value = res.data.data
               total_items.value= res.data.meta.total
               loading.value = false;
               }).catch((err) => {
               toast.error(err.message)
               loading.value = false;
            })
       }
       
  return {
     lstPermissions,
    loading,
    headers,
    total_items,
    current_page,
    item_per_page,
    search,
    doFetchPermissions,
  }
}
