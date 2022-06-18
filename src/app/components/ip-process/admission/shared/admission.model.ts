export interface Response {
    id: number[],
    cons: Doctor[],
    specs: string[],
    insCat: string[],
    rooms: Array<Room>,
    years: string[],
    ipNos: IPNo[]
}

export interface Room {
    id: number,
    floor: string,
    ward: string,
    room: string,
    bed: string,
    rent: number
}

export interface Patient {
    id: number,
    name: string,
    contact: string
}

export interface Doctor {
    id: number,
    name: string
}

export interface IPNo {
    id: number,
    ipNo: number
}

export interface Input {
    year: string,
    ipNo: string,
    ddlID: string,
    txtID: string,
    name: string,
    age: string,
    gender: string,
    contact: string,
    address: string,
    fees: number,
    admType: string,
    diagnosis: string,
    ref: string,
    department: string,
    cons: string,
    rName: string,
    rContact: string,
    rType: string,
    rAddress: string,
    insCat: string,
    insID: string,
    insName: string,
    search: string,
    room: number
}

export interface Status {
    status: boolean,
    message: string,
    year: string,
    ip_no: number,
    ip_id: number
}