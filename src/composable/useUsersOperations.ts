import { IRoleList, IUser } from "@/Interfaces/IUser";
import { fetchAllRoles, fetchUserByID, saveUser, updateUser } from "@/services/UsersService";
import { rand } from "@vueuse/core";
import { toast } from 'vue3-toastify';

export function useUsersOperations (){
    
    const lstRoles = ref<IRoleList>([]);
    const loading = ref<boolean>(false);
    const formLoading = ref<boolean>(false);
    const isSelectAllRoles = ref<boolean>(false);
    const isCompleted = ref<number>(0);
    const form = ref<IUser>({
        name:'',
        email:'',
        password:'',
        password_confirmation:'',
        type:'ADMIN',
        roles:[]
    });

    const selectAllRoles = () => {
        if(isSelectAllRoles.value == true){
          isSelectAllRoles.value = true;
            form.value.roles = lstRoles.value.map(({id}) => id);
        }
        if(isSelectAllRoles.value == false){
            form.value.roles = []
            isSelectAllRoles.value = false;
        }
        
    }
    const errorMessages = ref<[
      name:string, 
      email:string|number,
      roles: string,
      password: string|number,
      password_confirmation: string|number
    ]>([]);

    const getAllRoles = (id:number) => {
        form.value.name= '';
        form.value.roles=[];
        form.value.password='';
        form.value.password_confirmation='';
        loading.value = true;

        //get all permissions
        fetchAllRoles().then((res) => {
            
            lstRoles.value = res.data.data
            
            //get selected permissions in role edit case
            if(id != 0){
                fetchUserByID(id).then((res) => {
                    let data = res.data.data;
                    form.value = data;
                    form.value.roles = data.roles.map(({id}) => id);

                    if(form.value.roles.length  == lstRoles.value.length){
                      isSelectAllRoles.value = true;
                    }
                }).catch((err) => {
                    toast.error(err.message)
                    loading.value = false;
                 })
            }

            loading.value = false;
            }).catch((err) => {
            toast.error(err.message)
            loading.value = false;
         })
        
    }

    const handleSubmit = (id:number, isActive:Ref<boolean>) => {
        formLoading.value = true;
        if(id == 0){
            saveUser(form.value).then((res) => {
                formLoading.value = false;
                isActive.value = false;
                isCompleted.value = rand(1,10);
                toast.success(res.data.message)
            })
            .catch((err) => {
              if(err.response.status == "422"){
                errorMessages.value =  err.response.data.errors
                formLoading.value = false;
              }else if(err.response.status == "401"){  
                toast.error(err.response.data.message);
                formLoading.value = false;
                errorMessages.value = ['','','','','']
              }else{
                toast.error(err.message)
                formLoading.value = false;
              }
            })
        }else{
            updateUser(id,form.value).then((res) => {
                formLoading.value = false;
                isActive.value = false;
                isCompleted.value = rand(1,10);
                toast.success(res.data.message)
            })
            .catch((err) => {
              if(err.response.status == "422"){
                errorMessages.value =  err.response.data.errors
                formLoading.value = false;
              }else if(err.response.status == "401"){  
                toast.error(err.response.data.message);
                formLoading.value = false;
                errorMessages.value = ['','','','','']
              }else{
                toast.error(err.message)
                formLoading.value = false;
              }
            })
        }
    }
    return {
        lstRoles,
        loading,
        getAllRoles,
        selectAllRoles,
        handleSubmit,
        errorMessages,
        isSelectAllRoles,
        formLoading,
        form,
        isCompleted
    }
}
