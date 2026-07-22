export interface IBundle {
    id: number;
    title: string;
    slug: string;
    sku: string | number;
    short_desc: string;
    description: string;
    youtube_link: string;
    seo_title: string;
    seo_desc: string;
    status: string;
    coming_soon: boolean;
    image: any;
    image1: any;
    image2: any;
    image3: any;
    image4: any;
    image5: any;
    order: number;
}
export type IBundleList = IBundle[];

export interface IBundlePrice {
    id?: number;
    bundle_id: number | null;
    country_id: number | null;
    price: number | null;
    discount: number;
    discount_from: string | null;
    discount_to: string | null;
}

export interface IBundleFetchPrice {
    id: number;
    product: string;
    product_id: number;
    country: string;
    price: number;
    discount: number;
    discount_from: string | null;
    discount_to: string | null;
}

export type IBundlePriceList = IBundleFetchPrice[];

export interface IBundleColor {
    id: number;
    bundle_id: number;
    color_name: string;
    color_image: any;
    image1: any;
    image2: any;
    image3: any;
    image4: any;
    image5: any;
}

export interface IBundleFetchColor {
    id: number;
    bundle_id: number;
    color_name: string;
    color_image_src: string;
    image1_src: string;
    image2_src: string;
    image3_src: string;
    image4_src: string;
    image5_src: string;
}

export type IBundleColorList = IBundleFetchColor[];
