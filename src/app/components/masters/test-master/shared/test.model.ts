export interface Response {
    data: Input,
    status:boolean,
    message:string
}

export interface Input {
    search: number,
    category: string,
    txtCategory: string,
    test: string,
    fees: number,
    method: string,
    sample: string,
    units: string,
    normal: string,
    comment: string,
    parameters: string,
}

export interface Field {
    fieldCat: string,
    field: string,
    method: string,
    sample: string,
    units: string,
    normal: string,
    comment: string,
    parameters: string
}

export interface Test {
    id: number,
    test: string
}