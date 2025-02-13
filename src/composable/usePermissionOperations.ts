import { IPermission } from "@/Interfaces/IPermission";
import { fetchPermissionByID, savePermission, updatePermission } from "@/services/PermissionsService";
import { rand } from "@vueuse/core";
import { toast } from 'vue3-toastify';

export function usePermissionOperations (){
    
    const loading = ref<boolean>(false);
    const formLoading = ref<boolean>(false);
    const isCompleted = ref<number>(0);
    const form = ref<IPermission>({
        name:'',
        key:''
    });

    const errorMessages = ref<[name:string, key: string]>([]);

    const handleSubmit = (id:number, isActive:Ref<boolean>) => {
        formLoading.value = true;
        if(id == 0){
            savePermission(form.value).then((res) => {
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
            updatePermission(id,form.value).then((res) => {
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

    const getPermissionById = (id:number) => {
        form.value.name= '';
        form.value.key='';
        loading.value = true;
        fetchPermissionByID(id).then((res) => {
            form.value.name  = res.data.data.name;
            form.value.key  = res.data.data.key;
            loading.value = false;
        }).catch((err) => {
                toast.error(err.message)
                loading.value = false;
            })
    }
    return {
        loading,
        handleSubmit,
        errorMessages,
        formLoading,
        getPermissionById,
        form,
        isCompleted
    }
}
