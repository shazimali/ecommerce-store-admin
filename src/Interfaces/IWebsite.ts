export interface IWebsite {
    id: number,
    title: string,
    domain: string,
    phone: string,
    phone1: string,
    address: string,
    logo: object,
    news: string,
    email: string,
    status: string,
    order: number,
    wel_msg: string,
    about: string
}

export type IWebsiteList = IWebsite[];

