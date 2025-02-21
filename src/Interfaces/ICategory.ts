export interface ICategory {
    title: string,
    slug: string,
    image: string,
    websites:[],
    countries:[]
}
export interface ICategoryList {
    category : [ICategory]
}
