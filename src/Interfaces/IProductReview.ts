
export interface IProductReview {
  product_id: number | string,
  user_id: number,
  rating: number ,
  review: string,
  image1: {},
  image2: {},
  image3: {},
  status: string,
  product: [],
}
export interface IProductReviewList{
  productReview : [IProductReviewList]
}

export interface IProductList{
  product : [IProductList]
}

export interface IProduct{
  id: number
  title: string,
}
