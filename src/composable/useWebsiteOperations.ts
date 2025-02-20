import { IWebsite } from "@/interfaces/IWebsite";
import { fetchWebsiteByID, saveWebsite, updateWebsite } from "@/services/WebsiteService";
import { rand } from "@vueuse/core";
import { toast } from 'vue3-toastify';

export function useWebsiteOperations (){
    
    const loading = ref<boolean>(false);
    const logoInput = ref<HTMLInputElement | null>(null);
    const logoSrc = ref<string>('');
    const formLoading = ref<boolean>(false);
    const isCompleted = ref<number>(0);
    const form = ref<IWebsite>({
        title:'',
        domain:'',
        phone:'',
        phone1:'',
        address:'',
        logo:logoInput,
        news:'',
        email:'',
        status:'',
        order:0,
        wel_msg:'',
        about:'',


    });

    const errorMessages = ref<[
        title:string, 
        domain: string, 
        phone:string,
        order:string,
        logo:string
    ]>([]);

    const handleLogoChange = (e:HTMLInputElement) => {
      var files = e.target.files;
      if (!files.length) return;
      logoInput.value = e.target.files[0];
    }

    const getWebsiteByID =  (id:number) => {
      fetchWebsiteByID(id).then((res) => {
        form.value = res.data.data;
        logoSrc.value = res.data.data.logo_src
      }).catch((err) => {
        toast.error(err.message);
      })
    }
    const handleSubmit = (id:number, isActive:Ref<boolean>) => {
        formLoading.value = true;
        if(id == 0){
            saveWebsite(form.value).then((res) => {
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
                errorMessages.value = ['','','','','']
              }else{
                toast.error(err.message)
                formLoading.value = false;
              }
            })
        }else{
            updateWebsite(id,form.value).then((res) => {
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
                errorMessages.value = ['','','','','']
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
        handleLogoChange,
        formLoading,
        getWebsiteByID,
        form,
        logoSrc,
        isCompleted
    }
}
