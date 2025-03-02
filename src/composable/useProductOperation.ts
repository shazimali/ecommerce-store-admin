import { slugify } from "@/@core/utils/helpers";
import { IProduct } from "@/Interfaces/IProduct";
import { ISubCategoryList } from "@/Interfaces/ISubCategory";
import { fetchCategoryByID } from "@/services/CategoriesService";
import { fetchAllSubCategories, fetchProductByID, saveProduct, updateProduct } from "@/services/ProductsService";
import { rand } from "@vueuse/core";
import { toast } from 'vue3-toastify';
export function useProductOperation (){
    
    const loading = ref<boolean>(false);
    const imageInput = ref<HTMLInputElement | null>(null);
    const imageSrc = ref<string>('');
    const lstSubCategories = ref<ISubCategoryList>([]);
    const formLoading = ref<boolean>(false);
    const isCompleted = ref<number>(0);
    const isSelectAllSubCategories = ref<boolean>(false);
    const form = ref<IProduct>({
        title:'',
        slug:'',
        code:'',
        sku:'',
        short_desc:'',
        description:'',
        youtube_link:'',
        seo_title:'',
        seo_desc:'',
        status:'',
        is_new:false,
        is_featured:false,
        coming_soon:false,
        image:imageInput,
        order:0,
        sub_categories:[]
    });

    const errorMessages = ref<[
        title:string, 
        slug: string, 
        code: string, 
        status:string,
        sku: string, 
        description:string,
        image:string,
        order:string
    ]>([]);

    const handleSlug = () => {
        form.value.slug = slugify(form.value.title);
    }

    const handleImageChange = (e:HTMLInputElement) => {
      var files = e.target.files;
      if (!files.length) return;
      imageInput.value = e.target.files[0];
    }

    const handleState = (type:string) => {
        if(type == 'is_new'){
            form.value.is_new = form.value.is_new == true ? false : true;
        }
        if(type == 'is_featured'){
            form.value.is_featured = form.value.is_featured == true ? false : true;
        }
        if(type == 'coming_soon'){
            form.value.is_featured = form.value.coming_soon == true ? false : true;
        }
    }

    const getCategoryByID =  (id:number) => {
      fetchCategoryByID(id).then((res) => {
        form.value = res.data.data;
        imageSrc.value = res.data.data.logo_src
      }).catch((err) => {
        toast.error(err.message);
      })
    }
    const handleSubmit = (id:number, isActive:Ref<boolean>) => {
        formLoading.value = true;
        if(id == 0){
            saveProduct(form.value).then((res) => {
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
            updateProduct(id,form.value).then((res) => {
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

    const selectAllSubCategories = () => {
        if(isSelectAllSubCategories.value == true){
            isSelectAllSubCategories.value = true;
            form.value.sub_categories = lstSubCategories.value.map(({id}) => id);
        }
        if(isSelectAllSubCategories.value == false){
            form.value.sub_categories = []
            isSelectAllSubCategories.value = false;
        }
        
    }

    const getAllSubCategories = (id:number) => {
            form.value.sub_categories=[];
            form.value.title='';
            form.value.slug='';
            imageInput.value=null;
            form.value.order = 0;
            loading.value = true;
    
            //get all permissions
            fetchAllSubCategories().then((res) => {
                lstSubCategories.value = res.data.data
                //get selected permissions in role edit case
                if(id != 0){
                    fetchProductByID(id).then((res) => {
                        let data = res.data.data;
                        form.value = data;
                        imageInput.value = null;
                        imageSrc.value = data.image_src;
                        form.value.sub_categories = data.sub_categories.map(({id}) => id);
                        if(form.value.sub_categories.length  == lstSubCategories.value.length){
                            isSelectAllSubCategories.value = true;
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
        formLoading,
        getCategoryByID,
        selectAllSubCategories,
        isSelectAllSubCategories,
        getAllSubCategories,
        form,
        handleState,
        lstSubCategories,
        imageSrc,
        handleSlug,
        isCompleted
    }
}
