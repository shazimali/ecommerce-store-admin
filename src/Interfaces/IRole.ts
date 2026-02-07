export interface IRole {
    id: number,
    name: string,
    permissions: number[]
}

export type IRoleList = IRole[];

export interface IPermission {
    id: number,
    name: string,
    key: string
}

export type IPermissionsList = IPermission[];
