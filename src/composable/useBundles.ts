import { IBundleList } from '@/Interfaces/IBundle';
import httpClient from '@/plugins/httpClient';
import { fetchBundles } from '@/services/BundlesService';
import { onMounted, ref } from 'vue';
import { toast } from 'vue3-toastify';

export function useBundles() {
    const lstBundles = ref<IBundleList>([]);
    const total_items = ref<number>();
    const current_page = ref<number>(1);
    const item_per_page = ref<number>(5);
    const search = ref<string>('');
    const loading = ref<boolean>(false);
    const headers = [
        { title: "Title", align: "start", value: "title" },
        { title: "image", value: "image" },
        { title: "SKU", value: "sku" },
        { title: "Coming Soon", value: "coming_soon" },
        { title: "Status", value: "status" },
        { title: "Created At", value: "created_at" },
        { title: "Actions", value: "actions" }
    ];

    onMounted(() => {
        doFetchBundles();
    });

    const doFetchBundles = () => {
        loading.value = true;
        fetchBundles(httpClient, current_page.value, item_per_page.value, search.value).then((res) => {
            lstBundles.value = res.data.data;
            total_items.value = res.data.meta.total;
            loading.value = false;
        }).catch((err) => {
            toast.error(err.message);
            loading.value = false;
        });
    }

    return {
        lstBundles,
        loading,
        headers,
        total_items,
        current_page,
        item_per_page,
        search,
        doFetchBundles,
    }
}
