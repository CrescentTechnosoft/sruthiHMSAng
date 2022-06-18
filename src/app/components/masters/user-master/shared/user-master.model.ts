export interface User {
    id: number,
    name: string
}

export interface Inputs {
    addUser: string,
    addLoginName: string,
    addPass: string,
    addCPass: string,
    updateUser: string,
    updateNewUser: string,
    updateLogin: string,
    updatePass: string,
    deleteUser: string
}

export interface ResponseValues {
    user: string,
    login: string,
    pass: string
}

export interface ResponseStatus {
    status: boolean,
    message: string,
    id: number
}