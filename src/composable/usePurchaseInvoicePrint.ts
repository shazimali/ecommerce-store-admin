import { IInvoice } from "@/Interfaces/IPurchase";
import httpClient from "@/plugins/httpClient";
import { fetchPurchaseInvoiceByIDForPrint } from "@/services/PurchaseService";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { toast } from "vue3-toastify";

export function usePurchaseForPrint(){
      const route = useRoute();
      const id = route.params.id as string;
      const total_qty= ref<number>(0);
      const total_price=ref<number>(0);
      const invoice = ref<IInvoice>({
       data: {
        invoice_id: '',
        invoice_date: '',
        total_qty: 0,
        total_price: 0,
        sr_number: '',
        products: [],
        supplier: {
             name: '',
             email: '',
             address: '',
             phone:  '',
         }
       }
        
      });

      
       
       onMounted(() => {
        doFetchPurchasesInvoice();
       })

       const doFetchPurchasesInvoice = () => {
        fetchPurchaseInvoiceByIDForPrint(httpClient, Number(id)).then((res) => {
          invoice.value=res.data;
         
               
               }).catch((err) => {
               toast.error(err.message)
               
            })
       }
       
  return {
    invoice,
    total_qty,
    total_price,
    doFetchPurchasesInvoice,
  }
}
