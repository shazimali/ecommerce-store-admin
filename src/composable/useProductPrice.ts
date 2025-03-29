import { ICountriesList } from "@/Interfaces/ICountry";
import { IProductPriceList } from "@/Interfaces/IProduct";
import { IProductPrice } from "@/Interfaces/IProductPrice";
import { fetchAllPricesByProductID, saveProductPrice } from "@/services/ProductsService";
import { toast } from 'vue3-toastify';

export function useProductPrice (){
    
    const loading = ref<boolean>(false);
    const lstPrices = ref<IProductPriceList[]>([]);
    const priceLoading = ref<boolean>(false);
    const lstCountries = ref<ICountriesList[]>([]);
    const lstDiscounts = ref<[]>(Array.from(Array(99).keys(), item => item + 1));
    const formLoading = ref<boolean>(false);
    const isCompleted = ref<number>(0);
    const form = ref<IProductPrice>({
        product_head_id:null,
        country_id:null,
        price:null,
        discount:0,
        discount_from:null,
        discount_to:null
    });

    const errorMessages = ref<[country_id:string, price: string, discount:string, discount_from:string, discount_to:string]>([]);

    const handleSubmit = (id:number, isActive:Ref<boolean>) => {
        formLoading.value = true;
        form.value.product_head_id=id;
            saveProductPrice(form.value).then((res) => {
                formLoading.value = false;
                toast.success(res.data.message)
                getAllPrices(form.value.product_head_id);
                errorMessages.value = ['','','','',''];
                form.value.country_id = null;
                form.value.price = null;
                form.value.discount = 0;
                form.value.discount_from = null;
                form.value.discount_to = null;
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

    const getAllPrices = (id:number) => {
        priceLoading.value = true;
        fetchAllPricesByProductID(id).then((res) => {
            priceLoading.value = false;
            lstPrices.value = res.data.prices
            lstCountries.value = res.data.countries
        }).catch((err) => {
                toast.error(err.message)
                priceLoading.value = false;
            })
    }
    return {
        loading,
        priceLoading,
        handleSubmit,
        errorMessages,
        lstPrices,
        lstCountries,
        formLoading,
        lstDiscounts,
        getAllPrices,
        form
    }
}
