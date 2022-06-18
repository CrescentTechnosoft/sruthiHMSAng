export interface Response {
    years: string[],
    ipNos: IpNo[],
    cons: Consultant[],
    data:Input,
    treatments:Array<Treatment>
}

export interface Treatment
{
    department:string,
    feesType:string
}

export interface Input {
    year: string,
    ipNo: string,
    oldYear: string,
    oldIPNo: string,
    id: number,
    name: string,
    age: string,
    gender: string,
    consultant: string,
    history: string,
    pReaction: string,
    pulse: string,
    bp: string,
    hb: string,
    tc: string,
    wbc: string,
    poly: string,
    lymp: string,
    eos: string,
    m: string,
    b: string,
    sugar: string,
    urea: string,
    scr: string,
    crit: string,
    plat: string,
    diagnosis: string,
    investigation: string,
    surgery: string,
    treatment: string,
    advice: string,
    condition: string,
    disease: string,
    cons1: string,
    cons2: string,
    cons3: string,
    cons4: string,
    cons5: string,
    dDate: string,
    dTime: string,
    dCause: string,
    hCourse: string,
    report: string
}

export interface IpNo {
    id: number,
    ipNo: number
}

export interface Consultant {
    id: number,
    name: string
}