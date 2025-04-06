import { ICountriesList } from "@/Interfaces/ICountry";
import { ISetting } from "@/Interfaces/ISetting";
import { fetchAllCountries, fetchSettingByID, saveSetting, updateSetting } from "@/services/SettingsService";
import { rand } from "@vueuse/core";
import { toast } from "vue3-toastify";

export function useSettingOperation (){
    
  const loading = ref<boolean>(false);
  const lstCountries = ref<ICountriesList>([]);
  const formLoading = ref<boolean>(false);
  const isCompleted = ref<number>(0);
  
  const form = ref<ISetting>({
      title:'',
      key:'',
      value:'',
      country_id:''
  });

  const errorMessages = ref<[
      title:string,  
      key:string,  
      value:string, 
      country:string
  ]>([]);


  const getSettingByID =  (id:number) => {
    fetchSettingByID(id).then((res) => {
      form.value = res.data.data;
    }).catch((err) => {
      toast.error(err.message);
    })
  }

  
  const handleSubmit = (id:number, isActive:Ref<boolean>) => {
      formLoading.value = true;
      if(id == 0){
          saveSetting(form.value).then((res) => {
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
              errorMessages.value = ['','','','']
            }else{
              toast.error(err.message)
              formLoading.value = false;
            }
          })
      }else{
          updateSetting(id,form.value).then((res) => {
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
              errorMessages.value = ['','','','']
            }else{
              toast.error(err.message)
              formLoading.value = false;
            }
          })
      }
  }

  

  const getAllCountries = (id:number) => {
         
          form.value.title='';
          form.value.key='';
          form.value.value='';
          form.value.country_id='';
          loading.value = true;
  
          //get all countries
          fetchAllCountries().then((res) => {
              lstCountries.value = res.data.data
              if(id != 0){
                  fetchSettingByID(id).then((res) => {
                      let data = res.data.data;
                      form.value.title = data.title;
                      form.value.key = data.key;
                      form.value.value = data.value;
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
      getSettingByID,
      getAllCountries,
      form,
      lstCountries,
      isCompleted
  }
}
