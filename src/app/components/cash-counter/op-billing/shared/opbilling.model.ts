export interface Inputs {
    search: string,
    ddlPID: string,
    pid: string,
    name: string,
    age: string,
    gender: string,
    contact: string,
    cons: string,
    feesType: string,
    fees: string,
    otherType: string,
    total: number,
    discount: number,
    subTotal: number,
    paying: number,
    due: number,
    refund: number,
    cardNo: string,
    cardType: string,
    cardExpiry: string,
    payType: string,
    year: string,
    billNo: string
}

export interface ResponseData {
    pt_id: string,
    name: string,
    age: string,
    gender: string,
    contact: string,
    consultant: string,
    total: number
    discount: number
    sub_total: number
    paying: number
    due: number
    refund: number
    pay_type: string
    other_type: string
    card_no: string
    card_type: string
    card_expiry: string
}

export interface TempData {
    dept: string,
    category: string,
    cost: string,
    testType: string,
    billYear: string,
    billNo: number,
    feesId: number
}

export interface FeesData {
    dept: string,
    category: string,
    fees_type: string,
    cost: number,
    discount: number,
    test_type: string,
    fees_id: number
}

export interface Response {
    pid: number[],
    cons: Consultant[],
    fees: Array<Fee>,
    lab: Array<Test>,
    groupTests: Array<Test>,
    profiles: Array<Test>,
    payType: string[],
    cardType: string[],
    data: ResponseData,
    years: Array<string>,
    bill_nos: Array<BillNo>,
    fees_data: Array<FeesData>,
    status: boolean,
    message: string,
    id: number,
    bill_no: number,
    patients:Patient[]
}

export interface Consultant {
    id: number,
    name: string
}

export interface Patient {
    id: number,
    name: string,
    contact: string
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
    billNo: number
}