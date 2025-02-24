import { slugify } from "@/@core/utils/helpers";
import { ICategoryList } from "@/Interfaces/ICategory";
import { ISubCategory } from "@/Interfaces/ISubCategory";
import { fetchAllCategories, fetchSubCategoryByID, saveSubCategory, updateSubCategory } from "@/services/SubCategoriesService";
import { rand } from "@vueuse/core";
import { toast } from 'vue3-toastify';
export function useSubCategoryOperation (){
    
    const loading = ref<boolean>(false);
    const imageInput = ref<HTMLInputElement | null>(null);
    const imageSrc = ref<string>('');
    const lstCategories = ref<ICategoryList>([]);
    const formLoading = ref<boolean>(false);
    const isCompleted = ref<number>(0);
    const isSelectAllCategories = ref<boolean>(false);
    const form = ref<ISubCategory>({
        title:'',
        slug:'',
        image:imageInput,
        order:0,
        categories:[]
    });

    const errorMessages = ref<[
        title:string, 
        slug: string, 
        image:string,
        order:string,
        categories:string
    ]>([]);

    const handleSlug = () => {
        form.value.slug = slugify(form.value.title);
    }

    const handleImageChange = (e:HTMLInputElement) => {
      var files = e.target.files;
      if (!files.length) return;
      imageInput.value = e.target.files[0];
    }

    const getSubCategoryByID =  (id:number) => {
      fetchSubCategoryByID(id).then((res) => {
        form.value = res.data.data;
        imageSrc.value = res.data.data.logo_src
      }).catch((err) => {
        toast.error(err.message);
      })
    }
    const handleSubmit = (id:number, isActive:Ref<boolean>) => {
        formLoading.value = true;
        if(id == 0){
            saveSubCategory(form.value).then((res) => {
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
            updateSubCategory(id,form.value).then((res) => {
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

    const selectAllCategories = () => {
        if(isSelectAllCategories.value == true){
            isSelectAllCategories.value = true;
            form.value.categories = lstCategories.value.map(({id}) => id);
        }
        if(isSelectAllCategories.value == false){
            form.value.categories = []
            isSelectAllCategories.value = false;
        }
        
    }

    const getAllCategories = (id:number) => {
            form.value.categories=[];
            form.value.title='';
            form.value.slug='';
            imageInput.value=null;
            form.value.order = 0;
            loading.value = true;
    
            //get all permissions
            fetchAllCategories().then((res) => {
                lstCategories.value = res.data.data
                //get selected permissions in role edit case
                if(id != 0){
                    fetchSubCategoryByID(id).then((res) => {
                        let data = res.data.data;
                        form.value.title = data.title;
                        form.value.slug = data.slug;
                        form.value.order = data.order;
                        imageInput.value = null;
                        imageSrc.value = data.image_src;
                        form.value.categories = data.categories.map(({id}) => id);
    
                        if(form.value.categories.length  == lstCategories.value.length){
                            isSelectAllCategories.value = true;
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
        getSubCategoryByID,
        selectAllCategories,
        isSelectAllCategories,
        getAllCategories,
        form,
        lstCategories,
        imageSrc,
        handleSlug,
        isCompleted
    }
}
