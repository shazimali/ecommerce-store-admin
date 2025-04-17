import { IProductReviewList } from '@/Interfaces/IProductReview';
import { fetchProductReview } from '@/services/ProductReviewService';
import { onMounted } from 'vue';
import { toast } from 'vue3-toastify';

export function useProductReview(){
       const lstProductReview = ref<IProductReviewList>([])
       const total_items = ref<number>()
       const current_page = ref<number>(1)
       const item_per_page = ref<number>(5)
       const search = ref<string>('')
       const loading = ref<boolean>(false)
       const headers = [
               { title: "Product", align: "start",value: "product" },
               { title: "Rating", value: "rating"},
               { title: "Review", value: "review"},
               { title: "Image1", value: "image1"},
               { title: "Image2", value: "image2"},
               { title: "Image3", value: "image3"},
               { title: "Status", value: "status"},
               { title: "Created At", value: "created_at"},
               { title: "Actions", value: "actions" }
           ]
       onMounted(() => {
        doFetchProductReview();
       })

       const  doFetchProductReview = () => {
            loading.value = true;
            fetchProductReview(current_page.value,item_per_page.value,search.value).then((res) => {
                lstProductReview.value = res.data.data
               total_items.value= res.data.meta.total
               loading.value = false;
               }).catch((err) => {
               toast.error(err.message)
               loading.value = false;
            })
       }
       
  return {
    lstProductReview,
    loading,
    headers,
    total_items,
    current_page,
    item_per_page,
    search,
    doFetchProductReview,
  }
}
