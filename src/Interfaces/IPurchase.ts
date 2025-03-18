export interface IPurchase {
    invoice_id: number | string,
    invoice_date: number |string,
    supplier_id: number | string,
    total_qty: number | string,
    total_price: number | string,
    product_id: number | string,
    purchase_detail: IPurchaseObj[]
}


export interface IPurchaseDetail {
    purchase_id: number,
    product_head_id: number,
    product_color_id: number,
    qty: number,
    net_price: number
}

export interface IPurchaseObj {
    id: number,
    list_id: number,
    title: string,
    code: string,
    net_price: number,
    color_name:string,
    qty: number,
    product_color_id: number
}

