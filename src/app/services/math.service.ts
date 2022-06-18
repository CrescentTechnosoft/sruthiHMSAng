import { Injectable } from '@angular/core';

@Injectable()
export class MathService {

  constructor() { }

  static ConvertToFloat(value:string):number
  {
    return isNaN(parseFloat(value)) ? 0 : parseFloat(value);
  }
}
