import { deleteBanner } from "@/services/BannersService";
import { deleteCategory } from "@/services/CategoriesService";
import { deleteFacility } from "@/services/FacilitiesService";
import { deletePermission } from "@/services/PermissionsService";
import { deleteProduct, deleteProductColor, deleteProductPrice } from "@/services/ProductsService";
import { deletePurchase } from "@/services/PurchaseService";
import { deleteRole } from "@/services/RolesService";
import { deleteSocialMedia } from "@/services/SocialMediasService";
import { deleteSubCategory } from "@/services/SubCategoriesService";
import { deleteSupplier } from "@/services/SuppliersService";
import { deleteUser } from "@/services/UsersService";
import { deleteWebsite } from "@/services/WebsiteService";
import { rand } from "@vueuse/core";
import { toast } from "vue3-toastify";

export function useDeleteDailog(){
    const isCompleted = ref<number>(0);
    const formLoading = ref<boolean>(false);
    const doDelete = (id:number,action:string,isActive:Ref<boolean>) => {
        if(action == 'permission'){
            deletePermission(id).then((res) => {
                formLoading.value = false;
                isActive.value = false;
                isCompleted.value = rand(1,10);
                toast.success(res.data.message)
            }).catch((err) => {
                console.log(err)
            })
        }
        if(action == 'role'){
            deleteRole(id).then((res) => {
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
            deleteUser(id).then((res) => {
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
            deleteWebsite(id).then((res) => {
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
            deleteCategory(id).then((res) => {
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
            deleteSubCategory(id).then((res) => {
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
            deleteProduct(id).then((res) => {
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
            deleteProductPrice(id).then((res) => {
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
            deleteProductColor(id).then((res) => {
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
            deleteBanner(id).then((res) => {
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
            deleteFacility(id).then((res) => {
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
            deleteSocialMedia(id).then((res) => {
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
            deleteSupplier(id).then((res) => {
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
            deletePurchase(id).then((res) => {
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
