export interface ISupplier {
    name: string,
    email: string,
    phone: string,
    address: string
}

export interface ISupplierList {
    website : [ISupplier]
}

