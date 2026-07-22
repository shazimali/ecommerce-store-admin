import { IBadge } from "@/Interfaces/IBadge";
import { ISubCategory } from "@/Interfaces/ISubCategory";
import httpClient from "@/plugins/httpClient";
import { fetchAllSubCategories, fetchBadgeByID, saveBadges, updateBadge } from "@/services/BadgesService";
import { rand } from "@vueuse/core";
import { Ref, ref } from "vue";
import { toast } from 'vue3-toastify';

export function useBadgeOperation (){
    
    const loading = ref<boolean>(false);
    const imageInput = ref<HTMLInputElement | null>(null);
    const imageSrc = ref<string>('');
    const lstSubCategories = ref<ISubCategory[]>([]);
    const formLoading = ref<boolean>(false);
    const isCompleted = ref<number>(0);
    const isSelectAllSubCategories = ref<boolean>(false);
    const form = ref<IBadge>({
        id: 0,
        title:'',
        status:'ACTIVE',
        image:imageInput,
        sub_categories:[]
    });

    const errorMessages = ref<any>({});

    const handleImageChange = (e:any) => {
      var files = e.target.files;
      if (!files.length) return;
      imageInput.value = e.target.files[0];
    }

    const getBadgeByID =  (id:number) => {
      fetchBadgeByID(httpClient, id).then((res) => {
        form.value = res.data.data;
        imageSrc.value = res.data.data.image
      }).catch((err) => {
        toast.error(err.message);
      })
    }
    
    const handleSubmit = (id:number, isActive:Ref<boolean>) => {
        formLoading.value = true;
        
        if(id == 0){
            saveBadges(httpClient, form.value).then((res) => {
                formLoading.value = false;
                isActive.value = false;
                isCompleted.value = rand(1,10);
                toast.success(res.data.message)
            })
            .catch((err) => {
              if (err.response && err.response.status == "422") {
                errorMessages.value = err.response.data.errors
                formLoading.value = false;
              } else if (err.response && err.response.status == "401") {  
                toast.error(err.response.data.message);
                formLoading.value = false;
                errorMessages.value = {}
              } else {
                toast.error(err.message || 'An error occurred')
                formLoading.value = false;
              }
            })
        }else{
            updateBadge(httpClient, id,form.value).then((res) => {
                formLoading.value = false;
                isActive.value = false;
                isCompleted.value = rand(1,10);
                toast.success(res.data.message)
            }).catch((err) => {
              if (err.response && err.response.status == "422") {
                errorMessages.value = err.response.data.errors
                formLoading.value = false;
              } else if (err.response && err.response.status == "401") {  
                toast.error(err.response.data.message);
                formLoading.value = false;
                errorMessages.value = {}
              } else {
                toast.error(err.message || 'An error occurred')
                formLoading.value = false;
              }
            })
        }
    }

    const selectAllSubCategories = () => {
        if(isSelectAllSubCategories.value == true){
            isSelectAllSubCategories.value = true;
            form.value.sub_categories = lstSubCategories.value.map(({id}:any) => id);
        }
        if(isSelectAllSubCategories.value == false){
            form.value.sub_categories = []
            isSelectAllSubCategories.value = false;
        }
    }

    const getAllSubCategories = (id:number) => {
        form.value.sub_categories = [];
        form.value.title = '';
        form.value.status = 'ACTIVE';
        imageInput.value = null;
        imageSrc.value = '';
        loading.value = true;
        errorMessages.value = {};
        isSelectAllSubCategories.value = false;

        fetchAllSubCategories(httpClient).then((res) => {
            lstSubCategories.value = res.data
            if(id != 0){
                fetchBadgeByID(httpClient, id).then((res) => {
                    let data = res.data.data;
                    form.value.title = data.title;
                    form.value.status = data.status;
                    imageInput.value = null;
                    imageSrc.value = data.image;
                    form.value.sub_categories = data.sub_categories;

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
        getBadgeByID,
        selectAllSubCategories,
        isSelectAllSubCategories,
        getAllSubCategories,
        form,
        lstSubCategories,
        imageSrc,
        isCompleted
    }
}
