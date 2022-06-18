export interface Responses {
    ids: Array<number>,
    consultants: Array<Consultant>,
    years: Array<string>,
    opNos: Array<number>,
    opNo:string,
    message:string
}

export interface Inputs {
    id:number,
    ptid: string,
    year: string,
    opNo: string,
    name: string,
    age: string,
    gender: string,
    contact: string,
    consultant: string,
    reason: string,
    height: string,
    weight: string,
    bsa: string,
    bp: string,
    pulse: string,
    status: string
}

export interface Consultant {
    id: number,
    name: string
}