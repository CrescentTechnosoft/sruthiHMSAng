export interface Input {
    year: string,
    ipNo: string,
    oldYear: string,
    oldIPNo: string,
    refNo: string,
    id: string,
    name: string,
    age: string,
    gender: string,
    consultant: string,
    feesType: string,
    qty: number,
    cost: number,
    total: number
}

export interface Treatment {
    dept: string,
    feesId: number,
    testType: string,
    category: string,
    feesType: string,
    qty: number,
    cost: number
}

export interface Response {
    years: Array<string>,
    ipNos: Array<BillNo>,
    fees: Array<Fee>,
    tests: Array<Test>,
    groupTests: Array<Test>,
    profiles: Array<Test>,
    medicines: Array<string>,
    category: string,
    cost: number,
    data: Input,
    treatments: Array<Treatment>
}

export interface Fee {
    id: number,
    department: string,
    name: string
}

export interface Test {
    id: number,
    name: string
}

export interface BillNo {
    id: number,
    ipNo: number
}

export interface RefNo{
    treatmentId:number,
    refNo:number
}