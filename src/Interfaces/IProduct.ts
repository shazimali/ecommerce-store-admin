export interface IProduct {
    title: string,
    slug: string,
    code: string|number,
    sku: string|number,
    short_desc: string,
    description: string,
    youtube_link: string,
    seo_title: string,
    seo_desc: string,
    status: string,
    is_new: boolean,
    is_featured: boolean,
    coming_soon: boolean,
    image: {},
    order: number,
    sub_categories:[],
}
export interface IProductList {
    product : [IProduct]
}

export interface IProductPrice {
    id: number,
    product_head_id: number,
    country_head_id: number,
    price: number,
    discount:number,
    discount_from:number,
    discount_to:number
}

export interface IProductFetchPrice {
    id: number,
    product: string,
    country: string,
    price: number,
    discount:number,
    discount_from:number,
    discount_to:number
}

export interface IProductPriceList {
    product_price : [IProductFetchPrice]
}

export interface IProductColor {
    id: number,
    product_head_id: number,
    color_name: string,
    color_image: {},
    image1: {},
    image2: {},
    image3: {},
    image4: {},
    image5: {},
}

export interface IProductFetchColor {
    id: number,
    product_head_id: number,
    color_name: string,
    color_image_src: string,
    image1_src:string,
    image2_src:string,
    image3_src:string,
    image4_src:string,
    image5_src:string
}


export interface IProductColorList {
    product_color : [IProductFetchColor]
}
