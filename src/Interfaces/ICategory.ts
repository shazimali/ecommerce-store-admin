export interface ICategory {
    title: string,
    slug: string,
    image: {},
    order: number,
    websites:[],
}
export interface ICategoryList {
    category : [ICategory]
}
