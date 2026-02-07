import { ISupplier } from "@/Interfaces/ISupplier";
import httpClient from "@/plugins/httpClient";
import { fetchSupplierByID, saveSupplier, updateSupplier } from "@/services/SuppliersService";
import { rand } from "@vueuse/core";
import { Ref, ref } from "vue";
import { toast } from 'vue3-toastify';

export function useSupplierOperation (){
    
    const loading = ref<boolean>(false);
    const logoInput = ref<HTMLInputElement | null>(null);
    const logoSrc = ref<string>('');
    const formLoading = ref<boolean>(false);
    const isCompleted = ref<number>(0);
    const form = ref<ISupplier>({
        id: 0,
        name:'',
        phone:'',
        address:'',
        email:''
    });

    const errorMessages = ref<string[]>([]);

    const getSupplierByID =  (id:number) => {
      fetchSupplierByID(httpClient, id).then((res) => {
        form.value = res.data.data;
      }).catch((err) => {
        toast.error(err.message);
      })
    }
    const handleSubmit = (id:number, isActive:Ref<boolean>) => {
        formLoading.value = true;
        if(id == 0){
            saveSupplier(httpClient, form.value).then((res) => {
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
                errorMessages.value = []
              }else{
                toast.error(err.message)
                formLoading.value = false;
              }
            })
        }else{
            updateSupplier(httpClient, id,form.value).then((res) => {
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
                errorMessages.value = []
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
