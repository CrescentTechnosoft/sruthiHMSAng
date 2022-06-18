export interface Response {
    years: Array<string>,
    ipNos: Array<IpNo>,
    data: Inputs,
    treatments: Array<Treatment>,
    patients:Array<Patient>
}

export interface Inputs {
    year: string,
    ipNo: string,
    id: string,
    name: string,
    age: string,
    gender: string,
    consultant: string,
    // status: string,
    // ward: string,
    total: number
}

export interface Treatment {
    date: string,
    refNo: number,
    category: string,
    service: string,
    cost: number,
    qty: number,
    total: number
}

export interface IpNo {
    id: number,
    ipNo: number
}

export interface Patient {
    year: string,
    ipNo: number,
    id: number,
    name: string,
    contact: string
}