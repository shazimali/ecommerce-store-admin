
export interface IUser {
    name: string,
    email: string,
    password: string,
    password_confirmation: string,
    type: string,
    roles: []
}

export interface IUserList {
    users : [IUser]
}

export interface IRole {
    id: number,
    name: string
}

export interface  IRoleList {
    roles : [IRole]
}
