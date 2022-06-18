export interface Input {
  year: string,
  ipNo: string,
  ptId: string,
  name: string,
  age: string,
  gender: string,
  consultant: string,
  saved: boolean
}

export interface Field {
  category: string,
  testID:number,
  test: string,
  id:number,
  field: string,
  result: string,
  method: string,
  normal: string,
  parameters:Array<string>,
  norm: string,
  selected: boolean
}

export interface Response {
  years: Array<string>,
  ipNos: Array<IpNo>,
  data: Input,
  fields: Array<Field>,
  message: string
}

export interface Patient {
  year: string,
  ipNo:number,
  ipId:number,
  treatmentId:number,
  refNo:number,
  name: string,
  contact: string
}

export interface IpNo {
  ipNo: number,
  refNo: number,
  ipId: number,
  treatmentId: number
}