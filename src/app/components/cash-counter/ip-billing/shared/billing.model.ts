export interface Input {
    year: string,
    ipNo: string,
    billYear: string,
    billNo: string,
    tIP: number,
    ptId: number,
    name: string,
    age: string,
    gender: string,
    consultant: string,
    total: number,
    advance: number,
    discount: number,
    subTotal: number,
    paying: number,
    due: number,
    refund: number,
    payType: string,
    otherType: string,
    cardNo: string,
    cardType: string,
    cardExpiry: string
}

export interface Treatment {
    dept: string,
    category: string,
    feesId: number,
    service: string,
    cost: number,
    qty: number,
    total: number,
    discount: number
}

export interface Response {
    years: Array<string>,
    ipNos: Array<IpNo>,
    billNos: Array<number>,
    cardTypes: string[],
    payTypes: string[],
    data: Input,
    treatments: Array<Treatment>,
    message: string,
    billId: number
}

export interface IpNo {
    id: number,
    ipNo: number
}

export interface BillNo {
    id: number,
    billNo: number
}