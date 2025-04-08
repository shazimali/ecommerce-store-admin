export interface IBlog {
    title: string,
    slug: string,
    image: string,
    description: string,
    seo_title: string,
    seo_desc: string,
    status: string,
    countries:[],
}
export interface IBlogList {
    blog : [IBlog]
}
