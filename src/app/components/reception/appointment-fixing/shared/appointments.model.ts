export interface Inputs {
    search: string,
    type: string,
    txtID: string,
    id: string,
    name: string,
    contact: string,
    consultant: string,
    date: string,
    time: string
}

export interface Timings {
    day: string,
    start: string,
    end: string
}

export interface Appointments {
    id: string,
    ptID: string,
    name: string,
    contact: string,
    date: string
}

export interface Responses {
    consultants: Array<Consultant>,
    ids: Array<number>,
    datas: Inputs,
    timings: Array<Timings>,
    appointments: Array<Appointments>,
    status: boolean,
    id: number,
    message: string
}

export interface Consultant {
    id: number,
    name: string
}

export interface Patients {
    id: string,
    name: string,
    contact: string
}