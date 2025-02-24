export interface ISubCategory {
    title: string,
    slug: string,
    image: {},
    order: number,
    categories:[],
}
export interface ISubCategoryList {
    category : [ISubCategory]
}
