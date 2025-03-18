import { IProductListForPurchase } from "@/Interfaces/IProduct";
import { IPurchase } from "@/Interfaces/IPurchase";
import { ISupplierList } from "@/Interfaces/ISupplier";
import { fetchCategoryByID } from "@/services/CategoriesService";
import { fetchAllSuppliers, fetchPurchaseByID, savePurchase, updatePurchase } from "@/services/PurchaseService";
import { rand } from "@vueuse/core";
import { toast } from 'vue3-toastify';
export function usePurchaseOperation (){
    
    const loading = ref<boolean>(false);
    const lstSuppliers = ref<ISupplierList>([]);
    const lstProducts = ref<IProductListForPurchase>([]);
    const formLoading = ref<boolean>(false);
    const isCompleted = ref<number>(0);
    const searchInput = ref<string>('')
    const form = ref<IPurchase>({
        invoice_id:0,
        invoice_date:new Date().toISOString().slice(0,10),
        supplier_id:'',
        total_qty:0,
        total_price:0,
        purchase_detail:[],
        product_id:''
    });

    const errorMessages = ref<[
        name:string, 
        email: string, 
        address:string,
        suppliers:string
    ]>([]);

    const getPurchaseByID =  (id:number) => {
      fetchCategoryByID(id).then((res) => {
        form.value = res.data.data;
      }).catch((err) => {
        toast.error(err.message);
      })
    }
    const handleSubmit = (id:number, isActive:Ref<boolean>) => {
        formLoading.value = true;
        if(id == 0){
            savePurchase(form.value).then((res) => {
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
            updatePurchase(id,form.value).then((res) => {
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
                errorMessages.value = ['','','']
              }else{
                toast.error(err.message)
                formLoading.value = false;
              }
            })
        }
    }

    const handleSelectedProducts = () => {
      const  selectedIdx = lstProducts.value.findIndex((item)=>{return item.list_id == form.value.product_id});
       if (selectedIdx != -1){ 
          const isProductAlreadyExistsIndex = form.value.purchase_detail.findIndex((item)=>{return item.list_id == lstProducts.value[selectedIdx].list_id});
  
          if(isProductAlreadyExistsIndex != -1){
              form.value.purchase_detail[isProductAlreadyExistsIndex].qty += 1 
          }else{
              form.value.purchase_detail.push({
                  list_id: lstProducts.value[selectedIdx].list_id,
                  id :lstProducts.value[selectedIdx].product_id,
                  title:lstProducts.value[selectedIdx].product_title,
                  code:lstProducts.value[selectedIdx].product_code,
                  color_name:lstProducts.value[selectedIdx].color_name,
                  product_color_id:lstProducts.value[selectedIdx].color_id,
                  net_price:0,
                  qty:1
               })

          }
       }
      searchInput.value = "";
      form.value.product_id = "";
      handleTotalQty();
      handleTotalPrice();
  }

const handleTotalQty = () => {
    let sum = 0;
    for(let pr of form.value.purchase_detail){
      sum+= parseInt(pr.qty) || 0 ;
    }
    return form.value.total_qty = sum;
}

const handleTotalPrice = () => {
  let sum = 0;
  for(let pr of form.value.purchase_detail){
    sum+= parseInt(pr.net_price * pr.qty) || 0 ;
  }
  return form.value.total_price = sum;
}

const handleDelete = (id:number) => {
  form.value.purchase_detail =  form.value.purchase_detail.filter((item) => item.list_id !== id )
}

const handleChangeProductPrice = (net_price:number, id:number) => {
  const  priceIdx = form.value.purchase_detail.findIndex((item)=> item.list_id == id);
  form.value.purchase_detail[priceIdx].net_price=net_price
  handleTotalPrice();
  handleTotalQty();
}

const handleChangeProductQty = (qty:number,id:number) => {
  const  qtyIdx = form.value.purchase_detail.findIndex((item)=> item.list_id == id);
  form.value.purchase_detail[qtyIdx].qty=qty
  handleTotalQty();
  handleTotalPrice();
}
const getAllSuppliers = (id:number) => {
        form.value.purchase_detail=[];
        form.value.total_price=0;
        form.value.total_qty=0;
        form.value.supplier_id='';
        loading.value = true;

        fetchAllSuppliers().then((res) => {
            lstSuppliers.value = res.data.suppliers,
            lstProducts.value = res.data.products
            if(id != 0){
                fetchPurchaseByID(id).then((res) => {
                    let data = res.data.data;
                    form.value.invoice_id = data.invoice_id;
                    form.value.supplier_id = data.supplier_id;
                    form.value.total_price = data.total_price;
                    form.value.total_qty = data.total_qty;
                    data.purchase_detail.map((purchase_detail_data) => {
                      form.value.purchase_detail.push({
                        list_id: lstProducts.value.find((item)=> item.product_id == purchase_detail_data.product_head_id && item.color_id ==purchase_detail_data.color_id).list_id,
                        id :purchase_detail_data.product_head_id,
                        title:purchase_detail_data.title,
                        code:purchase_detail_data.code,
                        color_name:purchase_detail_data.color_name,
                        product_color_id:purchase_detail_data.color_id,
                        net_price:purchase_detail_data.net_price,
                        qty:purchase_detail_data.qty
                     });
                    })
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
        formLoading,
        getAllSuppliers,
        getPurchaseByID,
        form,
        handleDelete,
        handleChangeProductQty,
        handleChangeProductPrice,
        handleSelectedProducts,
        lstProducts,
        lstSuppliers,
        searchInput,
        isCompleted
    }
}
