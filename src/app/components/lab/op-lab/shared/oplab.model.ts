export interface Inputs {
    year: string,
    billNo: string,
    ptId: string,
    name: string,
    age: string,
    gender: string,
    consultant: string,
    saved: boolean
}

export interface Field {
    category: string,
    testID: number,
    test: string,
    id: number,
    field: string,
    result: string,
    parameters: Array<string>,
    normal: string,
    method: string,
    norm: string,
    selected: boolean,
    isGroup: boolean
}

export interface Response {
    years: Array<string>,
    bill_nos: Array<BillNo>,
    data: Inputs,
    fields: Array<Field>,
    message: string
}

export interface PatientResponse{
    data:Array<Patient>
}

export interface Patient {
    id:number,
    year: string,
    billNo: number,
    name: string,
    contact: string
}

export interface BillNo {
    id: number,
    billNo: number,
    name: string
}