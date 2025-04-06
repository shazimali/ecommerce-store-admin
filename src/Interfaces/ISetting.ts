export interface ISetting{
   title: string,
   key: string,
   value: string,
   country_id: number | string
}
export interface ISettingList {
  setting : [ISetting] 
}
