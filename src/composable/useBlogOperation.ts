import { IBlog } from "@/Interfaces/IBlog";
import { ICountriesList } from "@/Interfaces/ICountry";
import { fetchAllCountries, fetchBlogByID, saveBlog, updateBlog } from "@/services/BlogsService";

import { rand } from "@vueuse/core";
import { toast } from 'vue3-toastify';
export function useBlogOperation (){
    
    const loading = ref<boolean>(false);
    const imageInput = ref<HTMLInputElement | null>(null);
    const lstCountries = ref<ICountriesList>([]);
    const formLoading = ref<boolean>(false);
    const isCompleted = ref<number>(0);
    const isSelectAllCountries = ref<boolean>(false);
    const form = ref<IBlog>({
        title:'',
        slug:'',
        image:'',
        description:'',
        seo_title:'',
        seo_desc:'',
        status:'',
        countries:[]
    });

    const errorMessages = ref<[
        title:string, 
        slug:string, 
        image:string, 
        description:string, 
        seo_title:string, 
        seo_desc:string, 
        status: string, 
        countries:string
    ]>([]);


    const getBlogsByID =  (id:number) => {
      fetchBlogByID(id).then((res) => {
        form.value = res.data.data;
      }).catch((err) => {
        toast.error(err.message);
      })
    }
    const handleSubmit = (id:number, isActive:Ref<boolean>) => {
        formLoading.value = true;
        if(id == 0){
            saveBlog(form.value).then((res) => {
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
                errorMessages.value = ['','','','','','','','']
              }else{
                toast.error(err.message)
                formLoading.value = false;
              }
            })
        }else{
            updateBlog(id,form.value).then((res) => {
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
                errorMessages.value = ['','','','','','','','']
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
            form.value.image='';
            form.value.description='';
            form.value.seo_title='';
            form.value.seo_desc='';
            form.value.status='';
            loading.value = true;
    
            //get all countries
            fetchAllCountries().then((res) => {
                lstCountries.value = res.data.data
                //get selected permissions in role edit case
                if(id != 0){
                    fetchBlogByID(id).then((res) => {
                        let data = res.data.data;
                        form.value.title = data.title;
                        form.value.slug = data.slug;
                        form.value.image = data.image;
                        form.value.description = data.description;
                        form.value.seo_title = data.seo_title;
                        form.value.seo_desc = data.seo_desc;
                        form.value.status = data.status;
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
        imageInput,
        getBlogsByID,
        selectAllCountries,
        isSelectAllCountries,
        getAllCountries,
        form,
        lstCountries,
        isCompleted
    }
}
