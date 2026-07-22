export interface ICategory {
    id: number,
    title: string,
    slug: string,
    image: {},
    order: number,
    websites: number[],
}
export type ICategoryList = ICategory[];
