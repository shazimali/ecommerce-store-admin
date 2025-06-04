import { IBookOrder, ICODCompanyList } from '@/Interfaces/IOrder';
import { fetchCODCompanies, sendBookOrder, updateBookedOrderStatus } from '@/services/OrderService';
import { rand } from '@vueuse/core';
import { toast } from 'vue3-toastify';

export function useBookOrder(){
       const lstCODCompanies = ref<ICODCompanyList>([])
       const loading = ref<boolean>(false)
        const formLoading = ref<boolean>(false);
      const isCompleted = ref<number>(0);
        const fetchAllCODCompanies = () => {
            form.value.cod_company = '';
            form.value.track_number = '';
            form.value.special_instruction = '';
            form.value.piece = '';
            form.value.weight = '';
            loading.value = true;
            fetchCODCompanies().then((res) => {
                lstCODCompanies.value = res.data.data
                loading.value = false;
               }).catch((err) => {
               toast.error(err.message)
               loading.value = false;
            })
       }

       const form = ref<IBookOrder>({
               cod_company:'',
               weight:'',
               piece:'',
               status:'',
               track_number:'',
               order_id:'',
               special_instruction:''
           });
       
           const errorMessages = ref<[
               cod_company:string, 
               weight: string, 
               piece:string,
               status:string,
               track_number:string,
               special_instruction:string
           ]>([]);

          const handleSubmit = (orderId:number,status:string,isActive:Ref<boolean>) => {
              formLoading.value = true;
              form.value.order_id  = orderId;
              if(status == 'PLACED'){

                sendBookOrder(form.value).then((res) => {
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
                    errorMessages.value = ['','','','','','']
                  }else{
                    toast.error(err.message)
                    formLoading.value = false;
                  }
                })
              }else{
                 updateBookedOrderStatus(form.value).then((res) => {
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
                    errorMessages.value = ['','','','','','']
                  }else{
                    toast.error(err.message)
                    formLoading.value = false;
                  }
                })
              }
    }
       
  return {
    fetchAllCODCompanies,
    handleSubmit,
    isCompleted,
    form,
    formLoading,
    errorMessages,
    loading,
    lstCODCompanies
  }
}
