import { IRoleList } from '@/interfaces/IRole';
import { deleteRole, fetchRoles } from '@/services/RolesService';
import { onMounted } from 'vue';
import { toast } from 'vue3-toastify';
export function useRoles(){

       
       const lstRoles = ref<IRoleList>([])
       const total_items = ref<number>()
       const current_page = ref<number>(1)
       const item_per_page = ref<number>(5)
       const search = ref<string>('')
       const loading = ref<boolean>(false)
        const router = useRouter();
       const headers = [
               { title: "Name", align: "start",value: "name" },
               { title: "Permissions", value: "permissions"},
               { title: "Created At", value: "created_at"},
               { title: "Actions", value: "actions" }
           ]
       onMounted(() => {
            doFetchRoles();
       })

       const handleEdit = (id: number) => {
            router.push('/roles/'+id)
       }

       const  handleDelete = (id:number)=>{
        
            if(confirm("Do you really want to delete?")){
               deleteRole(id).then((res) => {
                if(res.data.status == 200){
                    toast.success(res.data.message);
                    doFetchRoles();
                }if(res.data.status == 201){
                    toast.error(res.data.message);
                }
               }).catch((err) => {
                toast.error(err.response?.data || err.message);
               })
            }
       }

       const doFetchRoles = () => {
            loading.value = true;
            fetchRoles(current_page.value,item_per_page.value,search.value).then((res) => {
               lstRoles.value = res.data.data
               total_items.value = res.data.meta.total
               loading.value = false;
               }).catch((err) => {
               toast.error(err.message)
               loading.value = false;
            })
       }
       
  return {
    lstRoles,
    loading,
    headers,
    handleEdit,
    handleDelete,
    total_items,
    current_page,
    item_per_page,
    search,
    doFetchRoles,
//     operationData
  }
}
