export interface Responses {
    users: Array<Users>,
    access: Array<Access>,
    userAccess: Array<string>
  }
  
  export interface Access {
    access: string,
    allowed: boolean
  }

  export interface Users{
      id:number,
      name:string
  }