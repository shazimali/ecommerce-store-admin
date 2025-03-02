import { IProductList } from '@/Interfaces/IProduct';
import { fetchProducts } from '@/services/ProductsService';
import { onMounted } from 'vue';
import { toast } from 'vue3-toastify';

export function useProducts(){
       const lstProducts = ref<IProductList>([])
       const total_items = ref<number>()
       const current_page = ref<number>(1)
       const item_per_page = ref<number>(5)
       const search = ref<string>('')
       const loading = ref<boolean>(false)
       const headers = [
               { title: "Title", align: "start",value: "title" },
               { title: "image", value: "image"},
               { title: "SKU", value: "sku"},
               { title: "New", value: "is_new"},
               { title: "Featured", value: "is_featured"},
               { title: "Coming Soon", value: "coming_soon"},
               { title: "Sub Categories", value: "sub_categories"},
               { title: "Status", value: "status"},
               { title: "Created At", value: "created_at"},
               { title: "Actions", value: "actions" }
           ]
       onMounted(() => {
        doFetchProducts();
       })

       const doFetchProducts = () => {
            loading.value = true;
            fetchProducts(current_page.value,item_per_page.value,search.value).then((res) => {
                lstProducts.value = res.data.data
               total_items.value= res.data.meta.total
               loading.value = false;
               }).catch((err) => {
               toast.error(err.message)
               loading.value = false;
            })
       }
       
  return {
    lstProducts,
    loading,
    headers,
    total_items,
    current_page,
    item_per_page,
    search,
    doFetchProducts,
  }
}
