import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomEncoderService {

  constructor() { }

  /**
   * 
   * @param datas Datas to Be Encoded
   * @returns Returns the Encoded Value as string
   */
  encodeAll(datas: object): string {
    let values = [];

    for (let obj in datas) {
      values.push(`${obj}=${encodeURIComponent(datas[obj])}`);
    }
    return values.join('&');
  }
}
