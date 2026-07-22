import { IBundle, IBundleColor, IBundlePrice } from "@/Interfaces/IBundle";
import { AxiosInstance } from "axios";

export const fetchBundles = async (axiosInstance: AxiosInstance, current_page: number, item_per_page: number, search: string) => {
    return await axiosInstance.get('/bundles?page=' + current_page + '&item_per_page=' + item_per_page + '&search=' + search);
}

export const saveBundle = async (axiosInstance: AxiosInstance, data: IBundle) => {
    return await axiosInstance.post('/bundles/store', { ...data }, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
}

export const fetchBundleByID = async (axiosInstance: AxiosInstance, id: number) => {
    return await axiosInstance.get('/bundles/edit/' + id);
}

export const updateBundle = async (axiosInstance: AxiosInstance, id: number, data: IBundle) => {
    return await axiosInstance.post('/bundles/update/' + id, { ...data }, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
}

export const deleteBundle = async (axiosInstance: AxiosInstance, id: number) => {
    return await axiosInstance.delete('/bundles/delete/' + id);
}

export const fetchAllPricesByBundleID = async (axiosInstance: AxiosInstance, id: number) => {
    return await axiosInstance.get('/bundles/prices/' + id);
}

export const saveBundlePrice = async (axiosInstance: AxiosInstance, data: IBundlePrice) => {
    return await axiosInstance.post('/bundles/prices/store', { ...data });
}

export const deleteBundlePrice = async (axiosInstance: AxiosInstance, id: number) => {
    return await axiosInstance.delete('/bundles/prices/delete/' + id);
}

export const fetchAllColorsByBundleID = async (axiosInstance: AxiosInstance, id: number) => {
    return await axiosInstance.get('/bundles/colors/' + id);
}

export const saveBundleColor = async (axiosInstance: AxiosInstance, data: IBundleColor) => {
    return await axiosInstance.post('/bundles/colors/store', { ...data }, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
}

export const deleteBundleColor = async (axiosInstance: AxiosInstance, id: number) => {
    return await axiosInstance.delete('/bundles/colors/delete/' + id);
}
