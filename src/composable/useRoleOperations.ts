import { IPermissionsList, IRole } from "@/Interfaces/IRole";
import { fetchAllPermissions, fetchRoleByID, saveRole, updateRole } from "@/services/RolesService";
import { rand } from "@vueuse/core";
import { toast } from 'vue3-toastify';

export function useRoleOperations (){
    
    const lstPermissions = ref<IPermissionsList>([]);
    const loading = ref<boolean>(false);
    const formLoading = ref<boolean>(false);
    const isSelectAllPermissions = ref<boolean>(false);
    const isCompleted = ref<number>(0);
    const form = ref<IRole>({
        name:'',
        permissions:[]
    });

    const selectAllPermissions = () => {
        if(isSelectAllPermissions.value == true){
            isSelectAllPermissions.value = true;
            form.value.permissions = lstPermissions.value.map(({id}) => id);
        }
        if(isSelectAllPermissions.value == false){
            form.value.permissions = []
            isSelectAllPermissions.value = false;
        }
        
    }
    const errorMessages = ref<[name:string, permissions: string]>([]);

    const getAllPermissions = (id:number) => {
        form.value.name= '';
        form.value.permissions=[];
        loading.value = true;

        //get all permissions
        fetchAllPermissions().then((res) => {
            
            lstPermissions.value = res.data.data
            
            //get selected permissions in role edit case
            if(id != 0){
                fetchRoleByID(id).then((res) => {
                    let data = res.data.data;
                    form.value.name = data.name;
                    form.value.permissions = data.permissions.map(({id}) => id);

                    if(form.value.permissions.length  == lstPermissions.value.length){
                        isSelectAllPermissions.value = true;
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
            saveRole(form.value).then((res) => {
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
                errorMessages.value = ['','']
              }else{
                toast.error(err.message)
                formLoading.value = false;
              }
            })
        }else{
            updateRole(id,form.value).then((res) => {
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
                errorMessages.value = ['','']
              }else{
                toast.error(err.message)
                formLoading.value = false;
              }
            })
        }
    }
    return {
        lstPermissions,
        loading,
        getAllPermissions,
        selectAllPermissions,
        handleSubmit,
        errorMessages,
        isSelectAllPermissions,
        formLoading,
        form,
        isCompleted
    }
}
