export interface Response {
    years: Array<string>,
    ipNos: Array<IpNo>,
    rooms: Array<Room>,
    status:boolean,
    message:string
}

export interface Input {
    year: string,
    ipNo: string,
    ptId: number,
    name: string,
    roomId:number,
    ward: string,
    room: string,
    bed: string,
    rent: number,
}

export interface Room {
    id: number,
    floor: string,
    ward: string,
    room: string,
    bed: string,
    rent: number,
    // sel: boolean
}

export interface IpNo {
    id: number,
    ipNo: number
}