export interface Inputs {
    id: number,
    floor: string,
    ward: string,
    room: string,
    bedNo: string,
    rent: number,
    occupied: boolean
}

export interface Response {
    id: number,
    status: boolean,
    message: string
}