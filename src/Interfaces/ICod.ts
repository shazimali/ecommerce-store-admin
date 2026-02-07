export interface ICod {
  id: number,
  title: string,
  api_test_url: string,
  api_url: string,
  api_key: string,
  api_password: string,
  status: string,
  countries: number[]
}
export type ICodList = ICod[];
