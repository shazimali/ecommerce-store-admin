export interface ICollection {
    id: number,
    title: string,
    slug: string,
    status: string,
    position: string,
    image: {},
    mob_image: {},
    order: number,
    websites:number[],
    products:number[],
}
export type ICollectionList = ICollection[];
