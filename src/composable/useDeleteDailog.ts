import { deleteCategory } from "@/services/CategoriesService";
import { deletePermission } from "@/services/PermissionsService";
import { deleteProduct, deleteProductPrice } from "@/services/ProductsService";
import { deleteRole } from "@/services/RolesService";
import { deleteSubCategory } from "@/services/SubCategoriesService";
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

    }


    return {
        doDelete,
        isCompleted,
        formLoading
    }
}
