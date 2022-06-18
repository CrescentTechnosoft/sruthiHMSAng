import { Injectable } from '@angular/core';

@Injectable()
export class KeyEventService {

  constructor() { }

  AllowIntOnly(event: KeyboardEvent): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  AllowDecimalOnly(event: KeyboardEvent, value: string): boolean {
    if (event.which == 46) {
      if (value.indexOf('.') != -1) {
        return false;
      }
    }

    if (event.which != 8 && event.which != 0 && event.which != 46 && (event.which < 48 || event.which > 57)) {
      return false;
    }
  }
}
