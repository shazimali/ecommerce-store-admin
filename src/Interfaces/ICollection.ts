export interface ICollection {
    title: string,
    slug: string,
    status: string,
    position: string,
    image: {},
    mob_image: {},
    order: number,
    websites:[],
    products:[],
}
export interface ICollectionList {
    collection : [ICollection]
}
