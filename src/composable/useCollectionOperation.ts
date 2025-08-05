import { slugify } from "@/@core/utils/helpers";
import { ICollection } from "@/Interfaces/ICollection";
import { IProductList } from "@/Interfaces/IProduct";
import { IWebsiteList } from "@/Interfaces/IWebsite";
import { fetchAllExtra, fetchCollectionByID, saveCollection, updateCollection } from "@/services/CollectionsService";
import { rand } from "@vueuse/core";
import { toast } from 'vue3-toastify';
export function useCollectionOperation (){
    
    const loading = ref<boolean>(false);
    const imageInput = ref<HTMLInputElement | null>(null);
    const imageMobInput = ref<HTMLInputElement | null>(null);
    const imageSrc = ref<string>('');
    const imageMobSrc = ref<string>('');
    const lstWebsites = ref<IWebsiteList>([]);
    const lstProducts = ref<IProductList>([]);
    const formLoading = ref<boolean>(false);
    const isCompleted = ref<number>(0);
    const isSelectAllWebsites = ref<boolean>(false);
    const isSelectAllProducts= ref<boolean>(false);
    const form = ref<ICollection>({
        title:'',
        slug:'',
        status:'',
        position:'',
        image:imageInput,
        mob_image:imageMobInput,
        order:0,
        websites:[],
        products:[],
    });

    const errorMessages = ref<[
        title:string, 
        slug: string, 
        image:string,
        mob_image:string,
        order:string,
        position:string,
        products:string,
        websites:string
    ]>([]);

    const handleSlug = () => {
        form.value.slug = slugify(form.value.title);
    }

    const handleImageChange = (e:HTMLInputElement) => {
      var files = e.target.files;
      if (!files.length) return;
      imageInput.value = e.target.files[0];
    }

    const handleMobImageChange = (e:HTMLInputElement) => {
      var files = e.target.files;
      if (!files.length) return;
      imageMobInput.value = e.target.files[0];
    }

    const getCollectionByID =  (id:number) => {
      fetchCollectionByID(id).then((res) => {
        form.value = res.data.data;
        imageSrc.value = res.data.data.image_src
        imageMobSrc.value = res.data.data.mob_image_src
      }).catch((err) => {
        toast.error(err.message);
      })
    }
    const handleSubmit = (id:number, isActive:Ref<boolean>) => {
        formLoading.value = true;
        if(id == 0){
            saveCollection(form.value).then((res) => {
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
            updateCollection(id,form.value).then((res) => {
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

    const selectAllProducts = () => {
        if(isSelectAllProducts.value == true){
            isSelectAllProducts.value = true;
            form.value.products = lstProducts.value.map(({id}) => id);
        }
        if(isSelectAllProducts.value == false){
            form.value.products = []
            isSelectAllProducts.value = false;
        }
        
    }

    const getAllExtra = (id:number) => {
            form.value.websites=[];
            form.value.products=[];
            form.value.title='';
            form.value.slug='';
            form.value.status='';
            imageInput.value=null;
            form.value.order = 0;
            loading.value = true;
    
            //get all permissions
            fetchAllExtra().then((res) => {
                lstWebsites.value = res.data.websites
                lstProducts.value = res.data.products
                if(id != 0){
                    fetchCollectionByID(id).then((res) => {
                        let data = res.data.data;
                        form.value.title = data.title;
                        form.value.slug = data.slug;
                        form.value.position = data.position;
                        form.value.status = data.status;
                        form.value.order = data.order;
                        imageInput.value = null;
                        imageMobInput.value = null;
                        imageSrc.value = data.image_src;
                        imageMobSrc.value = data.mob_image_src;
                        form.value.websites = data.websites.map(({id}) => id);
                        form.value.products = data.products.map(({id}) => id);
    
                        if(form.value.websites.length  == lstWebsites.value.length){
                            isSelectAllWebsites.value = true;
                        }
                        if(form.value.products.length  == lstProducts.value.length){
                            isSelectAllProducts.value = true;
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
        getCollectionByID,
        selectAllWebsites,
        selectAllProducts,
        isSelectAllWebsites,
        isSelectAllProducts,
        getAllExtra,
        form,
        lstWebsites,
        lstProducts,
        imageSrc,
        imageMobSrc,
        handleSlug,
        isCompleted
    }
}
