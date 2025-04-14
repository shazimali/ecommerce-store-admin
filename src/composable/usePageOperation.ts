import { slugify } from "@/@core/utils/helpers";
import { ICountriesList } from "@/Interfaces/ICountry";
import { IPages } from "@/Interfaces/IPage";
import { fetchAllCountries } from "@/services/FacilitiesService";
import { fetchPageByID, savePage, updatePage } from "@/services/PagesService";
import { rand } from "@vueuse/core";
import { toast } from 'vue3-toastify';
export function usePageOperation (){
    
    const loading = ref<boolean>(false);
    const lstCountries = ref<ICountriesList>([]);
    const formLoading = ref<boolean>(false);
    const isCompleted = ref<number>(0);
    const isSelectAllCountries = ref<boolean>(false);
    const form = ref<IPages>({
        title:'',
        slug:'',
        content:'',
        status:'',
        seo_title:'',
        seo_description:'',
        countries:[]
    });

    const errorMessages = ref<[
        title:string, 
        slug: string, 
        content: string, 
        status: string, 
        seo_title: string, 
        seo_description: string, 
        countries:string
    ]>([]);


    const getPageByID =  (id:number) => {
      fetchPageByID(id).then((res) => {
        form.value = res.data.data;
      }).catch((err) => {
        toast.error(err.message);
      })
    }
      const handleSlug = () => {
                  form.value.slug = slugify(form.value.title);
          }

    const handleSubmit = (id:number, isActive:Ref<boolean>) => {
        formLoading.value = true;
        if(id == 0){
            savePage(form.value).then((res) => {
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
            updatePage(id,form.value).then((res) => {
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
            form.value.countries=[];
            form.value.title='';
            form.value.slug='';
            form.value.content='';
            form.value.status='';
            form.value.seo_title='';
            form.value.seo_description='';
            loading.value = true;
    
            //get all countries
            fetchAllCountries().then((res) => {
                lstCountries.value = res.data.data
                //get selected permissions in role edit case
                if(id != 0){
                    fetchPageByID(id).then((res) => {
                        let data = res.data.data;
                        form.value.title = data.title;
                        form.value.slug = data.slug;
                        form.value.content = data.content;
                        form.value.status = data.status;
                        form.value.seo_title = data.seo_title;
                        form.value.seo_description = data.seo_description;
                        form.value.countries = data.countries.map(({id}) => id);
    
                        if(form.value.countries.length  == lstCountries.value.length){
                            isSelectAllCountries.value = true;
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
    return {
        loading,
        handleSubmit,
        errorMessages,
        formLoading,
        getPageByID,
        selectAllCountries,
        isSelectAllCountries,
        getAllCountries,
        form,
        handleSlug,
        lstCountries,
        isCompleted
    }
}
