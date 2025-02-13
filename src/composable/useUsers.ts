import { IUserList } from '@/interfaces/IUser';
import { deleteUser, fetchUsers } from '@/services/UsersService';
import { onMounted } from 'vue';
import { toast } from 'vue3-toastify';

export function useUsers(){

       const lstUsers = ref<IUserList>([])
       const total_items = ref<number>()
       const current_page = ref<number>(1)
       const item_per_page = ref<number>(5)
       const search = ref<string>('')
       const loading = ref<boolean>(false)
        const router = useRouter();
       const headers = [
               { title: "Name", align: "start",value: "name" },
               { title: "Email", value: "email"},
               { title: "Roles", value: "roles"},
               { title: "Created At", value: "created_at"},
               { title: "Actions", value: "actions" }
           ]
       onMounted(() => {
          fetchUsersList();
       })

       const handleEdit = (id: number) => {
            router.push('/roles/'+id)
       }

       const  handleDelete = (id:number)=>{
        
            if(confirm("Do you really want to delete?")){
                deleteUser(id).then((res) => {
                if(res.data.status == 200){
                    toast.success(res.data.message);
                    fetchUsers();
                }if(res.data.status == 201){
                    toast.error(res.data.message);
                }
               }).catch((err) => {
                toast.error(err.response?.data || err.message);
               })
            }
       }

       const fetchUsersList = () => {
            loading.value = true;
            fetchUsers(current_page.value,item_per_page.value,search.value).then((res:any) => {
               lstUsers.value = res.data.data
               total_items.value = res.data.meta.total
               loading.value = false;
               }).catch((err:any) => {
               toast.error(err.message)
               loading.value = false;
            })
       }
       
  return {
    lstUsers,
    loading,
    headers,
    handleEdit,
    handleDelete,
    total_items,
    current_page,
    item_per_page,
    search,
    fetchUsersList,
  }
}
