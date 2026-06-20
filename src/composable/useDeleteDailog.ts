import httpClient from "@/plugins/httpClient";
import { deleteBanner } from "@/services/BannersService";
import { deleteBadge } from "@/services/BadgesService";
import { deleteBlog } from "@/services/BlogsService";
import { deleteCategory } from "@/services/CategoriesService";
import { deleteCod } from "@/services/CodService";
import { deleteCollection } from "@/services/CollectionsService";
import { deleteCoupon } from "@/services/CouponsService";
import { deleteFacility } from "@/services/FacilitiesService";
import { deleteOrder } from "@/services/OrderService";
import { deletePage } from "@/services/PagesService";
import { deletePermission } from "@/services/PermissionsService";
import { deleteProductReview } from "@/services/ProductReviewService";
import { deleteProduct, deleteProductColor, deleteProductPrice } from "@/services/ProductsService";
import { deleteBundle, deleteBundlePrice, deleteBundleColor } from "@/services/BundlesService";
import { deletePurchase } from "@/services/PurchaseService";
import { deleteRole } from "@/services/RolesService";
import { deleteSetting } from "@/services/SettingsService";
import { deleteSocialMedia } from "@/services/SocialMediasService";
import { deleteSubCategory } from "@/services/SubCategoriesService";
import { deleteSupplier } from "@/services/SuppliersService";
import { deleteUser } from "@/services/UsersService";
import { deleteWebsite } from "@/services/WebsiteService";
import { rand } from "@vueuse/core";
import { Ref, ref } from "vue";
import { toast } from "vue3-toastify";

export function useDeleteDailog(){
    const isCompleted = ref<number>(0);
    const formLoading = ref<boolean>(false);
    const doDelete = (id:number,action:string,isActive:Ref<boolean>) => {
        if(action == 'permission'){
            deletePermission(httpClient, id).then((res) => {
                formLoading.value = false;
                isActive.value = false;
                isCompleted.value = rand(1,10);
                toast.success(res.data.message)
            }).catch((err) => {
                console.log(err)
            })
        }
        if(action == 'role'){
            deleteRole(httpClient, id).then((res) => {
                if(res.status == 201){
                    toast.error(res.data.message)
                }else{
                    toast.success(res.data.message)
                }
                isCompleted.value = rand(1,10);
                formLoading.value = false;
                isActive.value = false;
            }).catch((err) => {
                console.log(err)
            })
        }
        if(action == 'user'){
            deleteUser(httpClient, id).then((res) => {
                if(res.status == 201){
                    toast.error(res.data.message)
                }else{
                    toast.success(res.data.message)
                }
                isCompleted.value = rand(1,10);
                formLoading.value = false;
                isActive.value = false;
            }).catch((err) => {
                console.log(err)
            })
        }
        if(action == 'website'){
            deleteWebsite(httpClient, id).then((res) => {
                if(res.status == 201){
                    toast.error(res.data.message)
                }else{
                    toast.success(res.data.message)
                }
                isCompleted.value = rand(1,10);
                formLoading.value = false;
                isActive.value = false;
            }).catch((err) => {
                console.log(err)
            })
        }
        if(action == 'category'){
            deleteCategory(httpClient, id).then((res) => {
                if(res.status == 201){
                    toast.error(res.data.message)
                }else{
                    toast.success(res.data.message)
                }
                isCompleted.value = rand(1,10);
                formLoading.value = false;
                isActive.value = false;
            }).catch((err) => {
                console.log(err)
            })
        }
        if(action == 'subcategory'){
            deleteSubCategory(httpClient, id).then((res) => {
                if(res.status == 201){
                    toast.error(res.data.message)
                }else{
                    toast.success(res.data.message)
                }
                isCompleted.value = rand(1,10);
                formLoading.value = false;
                isActive.value = false;
            }).catch((err) => {
                console.log(err)
            })
        }
        if(action == 'product'){
            deleteProduct(httpClient, id).then((res) => {
                if(res.status == 201){
                    toast.error(res.data.message)
                }else{
                    toast.success(res.data.message)
                }
                isCompleted.value = rand(1,10);
                formLoading.value = false;
                isActive.value = false;
            }).catch((err) => {
                console.log(err)
            })
        }
        if(action == 'product_price'){
            deleteProductPrice(httpClient, id).then((res) => {
                if(res.status == 201){
                    toast.error(res.data.message)
                }else{
                    toast.success(res.data.message)
                }
                isCompleted.value = rand(1,10);
                formLoading.value = false;
            }).catch((err) => {
                console.log(err)
            })
        }
        if(action == 'product_color'){
            deleteProductColor(httpClient, id).then((res) => {
                if(res.status == 201){
                    toast.error(res.data.message)
                }else{
                    toast.success(res.data.message)
                }
                isCompleted.value = rand(1,10);
                formLoading.value = false;
            }).catch((err) => {
                console.log(err)
            })
        }
        if(action == 'bundle'){
            deleteBundle(httpClient, id).then((res) => {
                if(res.status == 201){
                    toast.error(res.data.message)
                }else{
                    toast.success(res.data.message)
                }
                isCompleted.value = rand(1,10);
                formLoading.value = false;
                isActive.value = false;
            }).catch((err) => {
                console.log(err)
            })
        }
        if(action == 'bundle_price'){
            deleteBundlePrice(httpClient, id).then((res) => {
                if(res.status == 201){
                    toast.error(res.data.message)
                }else{
                    toast.success(res.data.message)
                }
                isCompleted.value = rand(1,10);
                formLoading.value = false;
            }).catch((err) => {
                console.log(err)
            })
        }
        if(action == 'bundle_color'){
            deleteBundleColor(httpClient, id).then((res) => {
                if(res.status == 201){
                    toast.error(res.data.message)
                }else{
                    toast.success(res.data.message)
                }
                isCompleted.value = rand(1,10);
                formLoading.value = false;
            }).catch((err) => {
                console.log(err)
            })
        }
        if(action == 'banner'){
            deleteBanner(httpClient, id).then((res) => {
                if(res.status == 201){
                    toast.error(res.data.message)
                }else{
                    toast.success(res.data.message)
                }
                isCompleted.value = rand(1,10);
                formLoading.value = false;
            }).catch((err) => {
                console.log(err)
            })
        }
        if(action == 'facility'){
            deleteFacility(httpClient, id).then((res) => {
                if(res.status == 201){
                    toast.error(res.data.message)
                }else{
                    toast.success(res.data.message)
                }
                isCompleted.value = rand(1,10);
                formLoading.value = false;
            }).catch((err) => {
                console.log(err)
            })
        }
        if(action == 'social_media'){
            deleteSocialMedia(httpClient, id).then((res) => {
                if(res.status == 201){
                    toast.error(res.data.message)
                }else{
                    toast.success(res.data.message)
                }
                isCompleted.value = rand(1,10);
                formLoading.value = false;
            }).catch((err) => {
                console.log(err)
            })
        }
        if(action == 'supplier'){
            deleteSupplier(httpClient, id).then((res) => {
                if(res.status == 201){
                    toast.error(res.data.message)
                }else{
                    toast.success(res.data.message)
                }
                isCompleted.value = rand(1,10);
                formLoading.value = false;
            }).catch((err) => {
                console.log(err)
            })
        }
        if(action == 'purchase'){
            deletePurchase(httpClient, id).then((res) => {
                if(res.status == 201){
                    toast.error(res.data.message)
                }else{
                    toast.success(res.data.message)
                }
                isCompleted.value = rand(1,10);
                formLoading.value = false;
            }).catch((err) => {
                console.log(err)
            })
        }
        if(action == 'setting'){
          deleteSetting(httpClient, id).then((res) => {
              if(res.status == 201){
                  toast.error(res.data.message)
              }else{
                  toast.success(res.data.message)
              }
              isCompleted.value = rand(1,10);
              formLoading.value = false;
          }).catch((err) => {
              console.log(err)
          })
        }
        if(action == 'coupon'){
          deleteCoupon(httpClient, id).then((res) => {
              if(res.status == 201){
                  toast.error(res.data.message)
              }else{
                  toast.success(res.data.message)
              }
              isCompleted.value = rand(1,10);
              formLoading.value = false;
          }).catch((err) => {
              console.log(err)
          })
        }
        if(action == 'blog'){
          deleteBlog(httpClient, id).then((res) => {
              if(res.status == 201){
                  toast.error(res.data.message)
              }else{
                  toast.success(res.data.message)
              }
              isCompleted.value = rand(1,10);
              formLoading.value = false;
          }).catch((err) => {
              console.log(err)
          })
        }
        if(action == 'cod'){
            deleteCod(httpClient, id).then((res) => {
                if(res.status == 201){
                    toast.error(res.data.message)
                }else{
                    toast.success(res.data.message)
                }
                isCompleted.value = rand(1,10);
                formLoading.value = false;
            }).catch((err) => {
                console.log(err)
            })
          }
        if(action == 'page'){
          deletePage(httpClient, id).then((res) => {
              if(res.status == 201){
                  toast.error(res.data.message)
              }else{
                  toast.success(res.data.message)
              }
              isCompleted.value = rand(1,10);
              formLoading.value = false;
          }).catch((err) => {
              console.log(err)
          })
        }
        if(action == 'product_review'){
          deleteProductReview(httpClient, id).then((res) => {
              if(res.status == 201){
                  toast.error(res.data.message)
              }else{
                  toast.success(res.data.message)
              }
              isCompleted.value = rand(1,10);
              formLoading.value = false;
          }).catch((err) => {
              console.log(err)
          })
        }
        if(action == 'order'){
          deleteOrder(httpClient, id).then((res) => {
              if(res.status == 201){
                  toast.error(res.data.message)
              }else{
                  toast.success(res.data.message)
              }
              isCompleted.value = rand(1,10);
              formLoading.value = false;
          }).catch((err) => {
              console.log(err)
          })
        }
         if(action == 'collection'){
          deleteCollection(httpClient, id).then((res) => {
              if(res.status == 201){
                  toast.error(res.data.message)
              }else{
                  toast.success(res.data.message)
              }
              isCompleted.value = rand(1,10);
              formLoading.value = false;
          }).catch((err) => {
              console.log(err)
          })
        }
         if(action == 'badge'){
          deleteBadge(httpClient, id).then((res) => {
              if(res.status == 201){
                  toast.error(res.data.message)
              }else{
                  toast.success(res.data.message)
              }
              isCompleted.value = rand(1,10);
              formLoading.value = false;
          }).catch((err) => {
              console.log(err)
          })
        }

    }


    return {
        doDelete,
        isCompleted,
        formLoading
    }
}
