export interface Profile {
    id: number,
    name: string,
    age: string,
    uhid:string,
    gender: string,
    dob: string,
    contact: string,
    email: string,
    address: string
}

export interface Patient {
    id: number,
    uuid:number,
    uhid:string,
    salutation: string,
    name: string,
    age: string,
    gender: string,
    contact: string
}

export interface PaginatorSetting {
    length: number,
    index: number,
    pageSize: number
}

export interface Response {
    data: Array<Patient>,
    total: number
}