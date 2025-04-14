export interface IPages{
  title: string,
  slug: string,
  content: string,
  status: string,
  seo_title: string,
  seo_description: string,
  countries:[]

}
export interface IPagesList {
 page : [IPages] 
}
