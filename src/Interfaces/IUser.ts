
export interface IUser {
    id: number,
    name: string,
    email: string,
    password: string,
    password_confirmation: string,
    type: string,
    roles: number[]
}

export type IUserList = IUser[];

export interface IRole {
    id: number,
    name: string
}

export type IRoleList = IRole[];
