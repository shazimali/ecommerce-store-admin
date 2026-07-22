import { ICountriesList } from "@/Interfaces/ICountry";
import { IBundlePriceList } from "@/Interfaces/IBundle";
import { IBundlePrice } from "@/Interfaces/IBundle";
import httpClient from "@/plugins/httpClient";
import { fetchAllPricesByBundleID, saveBundlePrice } from "@/services/BundlesService";
import { Ref, ref } from "vue";
import { toast } from 'vue3-toastify';

export function useBundlePrice() {
    const loading = ref<boolean>(false);
    const lstPrices = ref<IBundlePriceList[]>([]);
    const priceLoading = ref<boolean>(false);
    const lstCountries = ref<ICountriesList[]>([]);
    const formLoading = ref<boolean>(false);
    const isCompleted = ref<number>(0);
    const form = ref<IBundlePrice>({
        bundle_id: null,
        country_id: null,
        price: null,
        discount: 0,
        discount_from: null,
        discount_to: null
    });

    const errorMessages = ref<any>({});

    const handleSubmit = (id: number, isActive: Ref<boolean>) => {
        formLoading.value = true;
        form.value.bundle_id = id;
        saveBundlePrice(httpClient, form.value).then((res) => {
            formLoading.value = false;
            toast.success(res.data.message);
            getAllPrices(form.value.bundle_id!);
            errorMessages.value = {};
            form.value.country_id = null;
            form.value.price = null;
            form.value.discount = 0;
            form.value.discount_from = null;
            form.value.discount_to = null;
        })
        .catch((err) => {
            if (err.response && err.response.status === 422) {
                errorMessages.value = err.response.data.errors;
            } else if (err.response && err.response.status === 401) {
                toast.error(err.response.data.message);
                errorMessages.value = {};
            } else {
                toast.error(err.message);
            }
            formLoading.value = false;
        });
    }

    const getAllPrices = (id: number) => {
        priceLoading.value = true;
        fetchAllPricesByBundleID(httpClient, id).then((res) => {
            priceLoading.value = false;
            lstPrices.value = res.data.prices;
            lstCountries.value = res.data.countries;
        }).catch((err) => {
            toast.error(err.message);
            priceLoading.value = false;
        });
    }

    return {
        loading,
        priceLoading,
        handleSubmit,
        errorMessages,
        lstPrices,
        lstCountries,
        formLoading,
        getAllPrices,
        form
    }
}
