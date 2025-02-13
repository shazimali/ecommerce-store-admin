
export interface IRole {
    name: string,
    permissions: []
}

export interface IRoleList {
    roles : [IRole]
}

export interface IPermission {
    id: number,
    name: string,
    key: string
}

export interface  IPermissionsList {
    permissions : [IPermission]
}
