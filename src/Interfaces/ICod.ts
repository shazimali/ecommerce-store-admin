export interface ICod {
  title: string
  api_test_url: string,
  api_url: string,
  api_key: string,
  api_password: string,
  status: string,
  countries: []
}
export interface ICodList {
  cod : [ICod]
}
