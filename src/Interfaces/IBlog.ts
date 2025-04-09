export interface IBlog {
    title: string,
    slug: string,
    image: {},
    description: string,
    seo_title: string,
    seo_desc: string,
    status: string,
    countries:[],
}
export interface IBlogList {
    blog : [IBlog]
}
