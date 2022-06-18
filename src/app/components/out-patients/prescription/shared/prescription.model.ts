export interface Response {
    years: Array<string>,
    opNos: Array<OPNo>,
    data: ResponseDatas,
    medicines: Array<string>,
    investigations: Array<string>,
    treatments: Array<string>,
    prescriptions: Prescription,
    complaints:Array<string>,
    medicineDatas:Array<MedicineData>
}

export interface OPNo {
    id: number,
    opNo: number
}

export interface ResponseDatas {
    pt_id: string,
    name: string,
    age: string,
    gender: string,
    contact: string,
    consultant: string,
    diagnosis: string,
    treatment: string,
    reason: string,
    height: string,
    weight: string,
    bsa: string,
    bp: string,
    pulse: string,
    status: string,
    opinion: string,
    patient_info: string,
    medicine: string,
    fType: string,
    dosage: string,
    days: number,
    is_saved: boolean
}

export interface Prescription {
    medicines: Array<MedicineData>,
    investigations: Array<string>,
    treatments: Array<string>
}

export interface MedicineData {
    medicine: string,
    type: string,
    dosage:string,
    period:string,
    days: number
}

export interface Inputs {
    year: string,
    id: string,
    prYear:string,
    prId:string,
    ptId: string,
    name: string,
    age: string,
    gender: string,
    contact: string,
    consultant: string,
    diagnosis: string,
    reason: string,
    height: string,
    weight: string,
    bsa: string,
    bp: string,
    pulse: string,
    status: string,
    opinion: string,
    patientInfo: string,
    complaint:string,
    medicine: string,
    fType: string,
    dosage: string,
    period:string,
    days: number,
    treatment: string
}