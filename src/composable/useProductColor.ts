import { IProductColor, IProductColorList } from "@/Interfaces/IProduct";
import { fetchAllColorsByProductID, saveProductColor } from "@/services/ProductsService";
import { toast } from 'vue3-toastify';

export function useProductColor (){
    
    const loading = ref<boolean>(false);
    const lstColors = ref<IProductColorList[]>([]);
    const image1Input = ref<HTMLInputElement | null>(null);
    const colorImageInput = ref<HTMLInputElement | null>(null);
    const colorImageSrc = ref<string>('');
    const image2Input = ref<HTMLInputElement | null>(null);
    const image3Input = ref<HTMLInputElement | null>(null);
    const image4Input = ref<HTMLInputElement | null>(null);
    const image5Input = ref<HTMLInputElement | null>(null);
    const image1InputSrc = ref<HTMLInputElement | null>(null);
    const image2InputSrc = ref<HTMLInputElement | null>(null);
    const image3InputSrc = ref<HTMLInputElement | null>(null);
    const image4InputSrc = ref<HTMLInputElement | null>(null);
    const image5InputSrc = ref<HTMLInputElement | null>(null);
    const colorLoading = ref<boolean>(false);
    const formLoading = ref<boolean>(false);
    const isCompleted = ref<number>(0);
    const form = ref<IProductColor>({
        product_head_id:null,
        color_name: '',
        color_image: colorImageInput,
        image1: image1Input,
        image2: image2Input,
        image3: image3Input,
        image4: image4Input,
        image5: image5Input,
    });

    const errorMessages = ref<[country_id:string, price: string, discount:string, discount_from:string, discount_to:string]>([]);

    const handleSubmit = (id:number, isActive:Ref<boolean>) => {
        formLoading.value = true;
        form.value.product_head_id=id;
            saveProductColor(form.value).then((res) => {
                formLoading.value = false;
                toast.success(res.data.message)
                getAllColors(form.value.product_head_id);
                errorMessages.value = ['','','','',''];
                form.value.color_name= '';
                form.value.color_image= null;
                form.value.image1= null;
                form.value.image2= null;
                form.value.image3= null;
                form.value.image4= null;
                form.value.image5= null;
            })
            .catch((err) => {
              if(err.response.status == "422"){
                errorMessages.value =  err.response.data.errors
                formLoading.value = false;
              }else if(err.response.status == "401"){  
                toast.error(err.response.data.message);
                formLoading.value = false;
                errorMessages.value = ['','','','',''];
              }else{
                toast.error(err.message)
                formLoading.value = false;
              }
            })
    }
    const handleImageChange = (e:HTMLInputElement, type:string) => {
        var files = e.target.files;
        if (!files.length) return;


        if(type == 'color_image'){
            colorImageInput.value =  e.target.files[0];
        }
        if(type == 'image1'){
            image1Input.value =  e.target.files[0];
        }
        if(type == 'image2'){
            image2Input.value =  e.target.files[0];
        }
        if(type == 'image3'){
            image3Input.value =  e.target.files[0];
        }
        if(type == 'image1'){
            image4Input.value =  e.target.files[0];
        }
        if(type == 'image1'){
            image5Input.value =  e.target.files[0];
        }
    }

    const getAllColors = (id:number) => {
        colorLoading.value = true;
        fetchAllColorsByProductID(id).then((res) => {
            colorLoading.value = false;
            lstColors.value = res.data.data
        }).catch((err) => {
                toast.error(err.message)
                colorLoading.value = false;
            })
    }
    return {
        loading,
        colorLoading,
        handleSubmit,
        errorMessages,
        lstColors,
        formLoading,
        getAllColors,
        handleImageChange,
        colorImageSrc,
        image1InputSrc,
        image2InputSrc,
        image3InputSrc,
        image4InputSrc,
        image5InputSrc,
        form
    }
}
