export interface Response {
    categories: string[],
    tests: Array<Test>,
    data: Inputs,
    fields: Array<Field>,
    status:boolean,
    message:string
}

export interface Field {
    fieldCat: string,
    field: string,
    method: string,
    sample: string,
    units: string,
    normal: string,
    comments: string
}

export interface Test {
    id: number,
    name: string
}

export interface Inputs {
    searchTest: number,
    category: string,
    test: string,
    fees: number,
    fieldCat: string,
    field: string,
    method: string,
    sample: string,
    units: string,
    normal: string,
    comments: string
}