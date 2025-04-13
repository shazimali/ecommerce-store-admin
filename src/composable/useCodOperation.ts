import { ICod } from "@/Interfaces/ICod";
import { ICountriesList } from "@/Interfaces/ICountry";
import { fetchAllCountries, fetchCodByID, saveCod, updateCod } from "@/services/CodService";



import { rand } from "@vueuse/core";
import { toast } from "vue3-toastify";

export function useCodOperation (){
    
  const loading = ref<boolean>(false);
  const lstCountries = ref<ICountriesList>([]);
  const formLoading = ref<boolean>(false);
  const isCompleted = ref<number>(0);
  const isSelectAllCountries = ref<boolean>(false);
  
  const form = ref<ICod>({
      title:'',
      api_test_url:'',
      api_url: '',
      api_key:'',
      api_password:'',
      status:'',
      countries: []
  });

  const errorMessages = ref<[
      title:string,  
      api_test_url:string,  
      api_url:number, 
      api_key:string, 
      api_password:string,
      status :string,
      countries: string
  ]>([]);


  const getCodByID =  (id:number) => {
    fetchCodByID(id).then((res) => {
      form.value = res.data.data;
    }).catch((err) => {
      toast.error(err.message);
    })
  }

  
  const handleSubmit = (id:number, isActive:Ref<boolean>) => {
      formLoading.value = true;
      if(id == 0){
          saveCod(form.value).then((res) => {
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
              errorMessages.value = ['','','','','','','']
            }else{
              toast.error(err.message)
              formLoading.value = false;
            }
          })
      }else{
          updateCod(id,form.value).then((res) => {
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
              errorMessages.value = ['','','','','','','']
            }else{
              toast.error(err.message)
              formLoading.value = false;
            }
          })
      }
  }

  const selectAllCountries = () => {
    if(isSelectAllCountries.value == true){
        isSelectAllCountries.value = true;
        form.value.countries = lstCountries.value.map(({id}) => id);
    }
    if(isSelectAllCountries.value == false){
        form.value.countries = []
        isSelectAllCountries.value = false;
    }
    
  }

  

  const getAllCountries = (id:number) => {
         
          form.value.title='';
          form.value.api_test_url='';
          form.value.api_url='';
          form.value.api_key='';
          form.value.api_password='';
          form.value.status='';
          loading.value = true;
  
          //get all countries
          fetchAllCountries().then((res) => {
              lstCountries.value = res.data.data
              if(id != 0){
                  fetchCodByID(id).then((res) => {
                      let data = res.data.data;
                      form.value = data;
                      form.value.countries = data.countries.map(({id}) => id);
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
      selectAllCountries,
      isSelectAllCountries,
      getCodByID,
      getAllCountries,
      form,
      lstCountries,
      isCompleted
  }
}
