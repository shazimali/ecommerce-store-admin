export interface IPages{
  id: number,
  title: string,
  slug: string,
  content: string,
  status: string,
  seo_title: string,
  seo_description: string,
  position: string,
  countries:number[]

}
export type IPagesList = IPages[];
