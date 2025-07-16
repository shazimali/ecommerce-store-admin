export interface IBanner {
    title: string,
    heading: string,
    sub_heading: string,
    btn_text: string, 
    btn_link: string,
    image: {},
    mob_image: {},
    order: number,
    websites:[],
}
export interface IBannerList {
    banner : [IBanner]
}
