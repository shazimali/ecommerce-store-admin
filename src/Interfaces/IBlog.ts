export interface IBlog {
    id: number,
    title: string,
    slug: string,
    image: {},
    description: string,
    seo_title: string,
    seo_desc: string,
    status: string,
    countries: number[],
}
export type IBlogList = IBlog[];
