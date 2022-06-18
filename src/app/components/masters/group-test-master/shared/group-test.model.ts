export interface Response {
    categories: Array<string>,
    data: Input,
    fields: Array<Field>,
    status: boolean,
    message: string
  }
  
  export interface Input {
    category: string,
    search: number,
    test: string,
    fees: number,
    field: string,
    fieldCat: string
  }
  
  export interface Field {
    id: number,
    category: string,
    field: string
  }
  
  export interface Test {
    id: number,
    test: string
  }
  
  export interface ButtonsState {
    isSaving: boolean,
    isUpdating: boolean,
    isDeleting: boolean
  }