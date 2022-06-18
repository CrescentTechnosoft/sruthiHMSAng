export interface Advance {
    id: number,
    advNo: string,
    amount: number,
    date: string,
    payType: string,
    otherPayType: string,
    cardNo: string,
    cardType: string,
    cardExpiry: string,
}

export interface Response {
    years: Array<string>,
    ipNos: Array<IpNo>,
    data: Input,
    cardTypes: Array<string>,
    payTypes: Array<string>,
    advances: Array<Advance>,
    status: boolean,
    message: string,
    id: number
}

export interface Input {
    year: string,
    ipNo: string,
    ptId: string,
    name: string,
    age: string,
    gender: string,
    advance: number,
    payType: string,
    otherPayType: string,
    advanceId: number,
    cardNo: string,
    cardType: string,
    cardExpiry: string
}

export interface IpNo {
    id: number,
    ipNo: number
}