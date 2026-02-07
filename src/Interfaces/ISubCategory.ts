export interface ISubCategory {
    id: number,
    title: string,
    slug: string,
    image: {},
    order: number,
    categories: number[],
}
export type ISubCategoryList = ISubCategory[];
