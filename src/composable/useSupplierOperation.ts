import { ISupplier } from "@/Interfaces/ISupplier";
import { fetchSupplierByID, saveSupplier, updateSupplier } from "@/services/SuppliersService";
import { rand } from "@vueuse/core";
import { toast } from 'vue3-toastify';

export function useSupplierOperation (){
    
    const loading = ref<boolean>(false);
    const logoInput = ref<HTMLInputElement | null>(null);
    const logoSrc = ref<string>('');
    const formLoading = ref<boolean>(false);
    const isCompleted = ref<number>(0);
    const form = ref<ISupplier>({
        name:'',
        phone:'',
        address:'',
        email:''
    });

    const errorMessages = ref<[
        name:string, 
        phone:string,
        email:string,
        address:string
    ]>([]);

    const getSupplierByID =  (id:number) => {
      fetchSupplierByID(id).then((res) => {
        form.value = res.data.data;
      }).catch((err) => {
        toast.error(err.message);
      })
    }
    const handleSubmit = (id:number, isActive:Ref<boolean>) => {
        formLoading.value = true;
        if(id == 0){
            saveSupplier(form.value).then((res) => {
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
                errorMessages.value = ['','','']
              }else{
                toast.error(err.message)
                formLoading.value = false;
              }
            })
        }else{
            updateSupplier(id,form.value).then((res) => {
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
                errorMessages.value = ['','','']
              }else{
                toast.error(err.message)
                formLoading.value = false;
              }
            })
        }
    }
    return {
        loading,
        handleSubmit,
        errorMessages,
        formLoading,
        getSupplierByID,
        form,
        logoSrc,
        isCompleted
    }
}
