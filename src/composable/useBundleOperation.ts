import { slugify } from "@/@core/utils/helpers";
import { IBundle } from "@/Interfaces/IBundle";
import httpClient from "@/plugins/httpClient";
import { fetchBundleByID, saveBundle, updateBundle } from "@/services/BundlesService";
import { rand } from "@vueuse/core";
import { Ref, ref } from "vue";
import { toast } from 'vue3-toastify';

export function useBundleOperation() {
    const loading = ref<boolean>(false);
    const imageInput = ref<HTMLInputElement | null>(null);
    const imageInput1 = ref<HTMLInputElement | null>(null);
    const imageInput2 = ref<HTMLInputElement | null>(null);
    const imageInput3 = ref<HTMLInputElement | null>(null);
    const imageInput4 = ref<HTMLInputElement | null>(null);
    const imageInput5 = ref<HTMLInputElement | null>(null);
    const imageSrc = ref<string>('');
    const imageSrc1 = ref<string>('');
    const imageSrc2 = ref<string>('');
    const imageSrc3 = ref<string>('');
    const imageSrc4 = ref<string>('');
    const imageSrc5 = ref<string>('');
    const formLoading = ref<boolean>(false);
    const isCompleted = ref<number>(0);
    const form = ref<IBundle>({
        id: 0,
        title: '',
        slug: '',
        sku: '',
        short_desc: '',
        description: '',
        youtube_link: '',
        seo_title: '',
        seo_desc: '',
        status: '',
        coming_soon: false,
        image: imageInput,
        image1: imageInput1,
        image2: imageInput2,
        image3: imageInput3,
        image4: imageInput4,
        image5: imageInput5,
        order: 0,
    });

    const errorMessages = ref<any>({});

    const handleSlug = () => {
        form.value.slug = slugify(form.value.title);
    }

    const handleImageChange = (e: any, type: string) => {
        const files = e.target.files;
        if (!files.length) return;

        if (type === 'image') imageInput.value = e.target.files[0];
        if (type === 'image1') imageInput1.value = e.target.files[0];
        if (type === 'image2') imageInput2.value = e.target.files[0];
        if (type === 'image3') imageInput3.value = e.target.files[0];
        if (type === 'image4') imageInput4.value = e.target.files[0];
        if (type === 'image5') imageInput5.value = e.target.files[0];
    }


    const handleSubmit = (id: number, isActive: Ref<boolean>) => {
        formLoading.value = true;
        if (id === 0) {
            saveBundle(httpClient, form.value).then((res) => {
                formLoading.value = false;
                isActive.value = false;
                isCompleted.value = rand(1, 10);
                toast.success(res.data.message);
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
        } else {
            updateBundle(httpClient, id, form.value).then((res) => {
                formLoading.value = false;
                isActive.value = false;
                isCompleted.value = rand(1, 10);
                toast.success(res.data.message);
            })
            .catch((err) => {
                if (err.response && err.response.status === 422) {
                    errorMessages.value = err.response.data.errors;
                } else if (err.response && err.response.status === 401) {
                    toast.error(err.response.data.message);
                } else {
                    toast.error(err.message);
                }
                formLoading.value = false;
            });
        }
    }

    const getBundleDetails = (id: number) => {
        form.value.title = '';
        form.value.slug = '';
        imageInput.value = null;
        form.value.order = 0;
        loading.value = true;

        if (id !== 0) {
            fetchBundleByID(httpClient, id).then((res) => {
                const data = res.data.data;
                form.value = data;
                imageInput.value = null;
                imageSrc.value = data.image_src;
                imageInput1.value = null;
                imageSrc1.value = data.image_src1;
                imageInput2.value = null;
                imageSrc2.value = data.image_src2;
                imageInput3.value = null;
                imageSrc3.value = data.image_src3;
                imageInput4.value = null;
                imageSrc4.value = data.image_src4;
                imageInput5.value = null;
                imageSrc5.value = data.image_src5;
                loading.value = false;
            }).catch((err) => {
                toast.error(err.message);
                loading.value = false;
            });
        } else {
            loading.value = false;
        }
    }

    return {
        loading,
        handleSubmit,
        errorMessages,
        handleImageChange,
        formLoading,
        getBundleDetails,
        form,
        imageSrc,
        imageSrc1,
        imageSrc2,
        imageSrc3,
        imageSrc4,
        imageSrc5,
        handleSlug,
        isCompleted
    }
}
