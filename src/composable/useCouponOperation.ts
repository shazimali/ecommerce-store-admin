import { ICountriesList } from "@/Interfaces/ICountry";
import { ICoupon } from "@/Interfaces/ICoupon";
import { fetchAllCountries, fetchCouponByID, saveCoupon, updateCoupon } from "@/services/CouponsService";


import { rand } from "@vueuse/core";
import { toast } from "vue3-toastify";

export function useCouponOperation (){
    
  const loading = ref<boolean>(false);
  const lstCountries = ref<ICountriesList>([]);
  const formLoading = ref<boolean>(false);
  const isCompleted = ref<number>(0);
  
  const form = ref<ICoupon>({
      title:'',
      code:'',
      discount: '',
      date_from:'',
      date_to:'',
      country_id:''
  });

  const errorMessages = ref<[
      title:string,  
      code:string,  
      discount:number, 
      date_from:string, 
      date_to:string,
      country:string
  ]>([]);


  const getCouponByID =  (id:number) => {
    fetchCouponByID(id).then((res) => {
      form.value = res.data.data;
    }).catch((err) => {
      toast.error(err.message);
    })
  }

  
  const handleSubmit = (id:number, isActive:Ref<boolean>) => {
      formLoading.value = true;
      if(id == 0){
          saveCoupon(form.value).then((res) => {
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
          updateCoupon(id,form.value).then((res) => {
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

  

  const getAllCountries = (id:number) => {
         
          form.value.title='';
          form.value.code='';
          form.value.discount='';
          form.value.date_from='';
          form.value.date_to='';
          form.value.country_id='';
          loading.value = true;
  
          //get all countries
          fetchAllCountries().then((res) => {
              lstCountries.value = res.data.data
              if(id != 0){
                  fetchCouponByID(id).then((res) => {
                      let data = res.data.data;
                      form.value.title = data.title;
                      form.value.code = data.code;
                      form.value.discount = data.discount;
                      form.value.date_from = data.date_from;
                      form.value.date_to = data.date_to;
                      form.value.country_id = data.country_id;
                      
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
  return {
      loading,
      handleSubmit,
      errorMessages,
      formLoading,
      getCouponByID,
      getAllCountries,
      form,
      lstCountries,
      isCompleted
  }
}
