import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appButtons]'
})
export class ButtonsDirective {
elem:ElementRef;
  constructor(el:ElementRef) { 
    this.elem=el;
    el.nativeElement.style.color='Red';
  }
}
