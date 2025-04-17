import { IProductList, IProductReview } from "@/Interfaces/IProductReview";
import { fetchAllProductReview, fetchProductReviewByID, saveProductReview, updateProductReview } from "@/services/ProductReviewService";
import { rand } from "@vueuse/core";
import { toast } from 'vue3-toastify';
export function useProductReviewOperation (){
    
    const loading = ref<boolean>(false);
    const imageInput1 = ref<HTMLInputElement | null>(null);
    const imageInput2 = ref<HTMLInputElement | null>(null);
    const imageInput3 = ref<HTMLInputElement | null>(null);
    const imageSrc1 = ref<string>('');
    const imageSrc2 = ref<string>('');
    const imageSrc3 = ref<string>('');
    const lstProduct = ref<IProductList>([]);
    const formLoading = ref<boolean>(false);
    const isCompleted = ref<number>(0);
    const form = ref<IProductReview>({
        product_id: '',
        user_id: 0,
        rating: 1,
        review:'',
        image1:imageInput1,
        image2:imageInput2,
        image3:imageInput3,
        status:'',
        product: []
    });

    const errorMessages = ref<[
       product_id: '', 
        user_id: number, 
        rating: number, 
        review: string,
        image1:string,
        image2:string,
        image3:string,
        status:string,
    ]>([]);

    

    const handleImageChange = (e:HTMLInputElement, type: string) => {
      
      var files = e.target.files;
      if (!files.length) return;

      if(type == 'image1')
        imageInput1.value = e.target.files[0];

      if(type == 'image2')
        imageInput2.value = e.target.files[0];

      if(type == 'image3')
        imageInput3.value = e.target.files[0];

      
    }

   

    const getProductReviewByID =  (id:number) => {
      fetchProductReviewByID(id).then((res) => {
        form.value = res.data.data;
        imageSrc1.value = res.data.data.image_src1;
        imageSrc2.value = res.data.data.image_src2;
        imageSrc3.value = res.data.data.image_src3;
      }).catch((err) => {
        toast.error(err.message);
      })
    }
    const handleSubmit = (id:number, isActive:Ref<boolean>) => {
        formLoading.value = true;
        if(id == 0){
            saveProductReview(form.value).then((res) => {
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
            updateProductReview(id,form.value).then((res) => {
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

    

    const getAllProductReview = (id:number) => {
            form.value.product_id= '';
            form.value.user_id= 0;
            form.value.rating= 1;
            form.value.review='';
            imageInput1.value=null;
            imageInput2.value=null;
            imageInput3.value=null;
            form.value.status = '';
            loading.value = true;
    
            //get all Products
            fetchAllProductReview().then((res) => {
                lstProduct.value = res.data.data
                //get selected permissions in role edit case
                if(id != 0){
                    fetchProductReviewByID(id).then((res) => {
                        let data = res.data.data;
                        form.value = data;
                        imageInput1.value = null;
                        imageSrc1.value = data.image_src1;
                        imageInput2.value = null;
                        imageSrc2.value = data.image_src2;
                        imageInput3.value = null;
                        imageSrc3.value = data.image_src3;
                       
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
        getProductReviewByID,
        getAllProductReview,
        form,
        imageSrc1,
        lstProduct,
        imageSrc2,
        imageSrc3,
        isCompleted
    }
}
