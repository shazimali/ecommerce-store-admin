import { IBanner } from "@/Interfaces/IBanner";
import { IWebsiteList } from "@/Interfaces/IWebsite";
import { fetchBannerByID, saveBanner, updateBanner } from "@/services/BannersService";
import { fetchAllWebsites } from "@/services/CategoriesService";
import { rand } from "@vueuse/core";
import { toast } from 'vue3-toastify';
export function useBannerOperation (){
    
    const loading = ref<boolean>(false);
    const imageInput = ref<HTMLInputElement | null>(null);
    const mobImageInput = ref<HTMLInputElement | null>(null);
    const imageSrc = ref<string>('');
    const mobImgSrc = ref<string>('');
    const lstWebsites = ref<IWebsiteList>([]);
    const formLoading = ref<boolean>(false);
    const isCompleted = ref<number>(0);
    const isSelectAllWebsites = ref<boolean>(false);
    const form = ref<IBanner>({
        title:'',
        heading:'',
        sub_heading:'',
        btn_text:'',
        btn_link:'',
        image:imageInput,
        mob_image:mobImageInput,
        order:0,
        websites:[]
    });

    const errorMessages = ref<[
        title:string, 
        image:string,
        mob_image:string,
        order:string,
        websites:string
    ]>([]);


    const handleImageChange = (e:HTMLInputElement) => {
      var files = e.target.files;
      if (!files.length) return;
      imageInput.value = e.target.files[0];
    }

    const handleMobImageChange = (e:HTMLInputElement) => {
      var files = e.target.files;
      if (!files.length) return;
      mobImageInput.value = e.target.files[0];
    }

    const getBannerByID =  (id:number) => {
      fetchBannerByID(id).then((res) => {
        form.value = res.data.data;
        imageSrc.value = res.data.data.img_src
        mobImgSrc.value = res.data.data.mob_image_src
      }).catch((err) => {
        toast.error(err.message);
      })
    }
    const handleSubmit = (id:number, isActive:Ref<boolean>) => {
        formLoading.value = true;
        if(id == 0){
            saveBanner(form.value).then((res) => {
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
            updateBanner(id,form.value).then((res) => {
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
            form.value.heading='';
            form.value.sub_heading='';
            form.value.btn_text='';
            form.value.btn_link='';
            imageInput.value=null;
            mobImageInput.value=null;
            form.value.order = 0;
            loading.value = true;
    
            //get all permissions
            fetchAllWebsites().then((res) => {
                lstWebsites.value = res.data.data
                //get selected permissions in role edit case
                if(id != 0){
                    fetchBannerByID(id).then((res) => {
                        let data = res.data.data;
                        form.value = data;
                        imageSrc.value = data.image_src;
                        mobImgSrc.value = data.mob_image_src;
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
        handleImageChange,
        handleMobImageChange,
        formLoading,
        getBannerByID,
        selectAllWebsites,
        isSelectAllWebsites,
        getAllWebsites,
        form,
        lstWebsites,
        imageSrc,
        mobImgSrc,
        isCompleted
    }
}
