import { ISocialMedia } from "@/Interfaces/ISocialMedia";
import { IWebsiteList } from "@/Interfaces/IWebsite";
import { fetchAllWebsites } from "@/services/BannersService";
import { fetchSocialMediaByID, saveSocialMedia, updateSocialMedia } from "@/services/SocialMediasService";
import { rand } from "@vueuse/core";
import { toast } from 'vue3-toastify';
export function useSocialMediaOperation (){
    
    const loading = ref<boolean>(false);
    const imageInput = ref<HTMLInputElement | null>(null);
    const lstWebsites = ref<IWebsiteList>([]);
    const formLoading = ref<boolean>(false);
    const isCompleted = ref<number>(0);
    const isSelectAllWebsites = ref<boolean>(false);
    const form = ref<ISocialMedia>({
        title:'',
        class:'',
        url:'',
        websites:[]
    });

    const errorMessages = ref<[
        title:string, 
        classes: string, 
        countries:string
    ]>([]);


    const getSocialMediaByID =  (id:number) => {
      fetchSocialMediaByID(id).then((res) => {
        form.value = res.data.data;
      }).catch((err) => {
        toast.error(err.message);
      })
    }
    const handleSubmit = (id:number, isActive:Ref<boolean>) => {
        formLoading.value = true;
        if(id == 0){
            saveSocialMedia(form.value).then((res) => {
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
            updateSocialMedia(id,form.value).then((res) => {
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

    const selectAllWebsites = () => {
        if(isSelectAllWebsites.value == true){
            isSelectAllWebsites.value = true;
            form.value.websites = lstWebsites.value.map(({id}) => id);
        }
        if(isSelectAllWebsites.value == false){
            form.value.websites = []
            isSelectAllWebsites.value = false;
        }
        
    }

    const getAllWebsites = (id:number) => {
            form.value.websites=[];
            form.value.title='';
            form.value.class='';
            loading.value = true;
    
            //get all permissions
            fetchAllWebsites().then((res) => {
                lstWebsites.value = res.data.data
                //get selected permissions in role edit case
                if(id != 0){
                    fetchSocialMediaByID(id).then((res) => {
                        let data = res.data.data;
                        form.value.title = data.title;
                        form.value.class = data.class;
                        form.value.url = data.url;
                        form.value.websites = data.websites.map(({id}) => id);
    
                        if(form.value.websites.length  == lstWebsites.value.length){
                            isSelectAllWebsites.value = true;
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
        getSocialMediaByID,
        selectAllWebsites,
        isSelectAllWebsites,
        getAllWebsites,
        form,
        lstWebsites,
        isCompleted
    }
}
