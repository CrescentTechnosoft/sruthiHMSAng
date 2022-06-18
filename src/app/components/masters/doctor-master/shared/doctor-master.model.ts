export interface IStatus {
    status: boolean,
    message: string,
    id: string
}

export interface Response {
    doctors: Array<Inputs>,
    specs: Array<string>
}

export interface Inputs {
    id: number,
    name: string,
    age: string,
    gender: string,
    specs: string,
    contact: string,
    email: string,
    qualification: string,
    status: string,
    address: string
}