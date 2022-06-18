import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class CommonService {
  mainData = new Subject<MainData>();
  constructor(private http: HttpClient) { }

  initApp() {
    this.http.get(environment.normUrl + 'initialize', { responseType: 'text' })
      .toPromise();
  }

  private isAndroid(): boolean {
    const device = navigator.userAgent.toLowerCase();
    return device.includes('android') || device.includes('ipad');
  }

  printPage(url: string) {
    if (this.isAndroid())
      window.open(`${environment.printUrl}${url}`, '_blank');
    else {
      printJS(`${environment.printUrl}${url}`);
    }
  }

  printBase64(base64: string) {
    if (this.isAndroid()) {
      window.open(`data:application/pdf;base64,${base64}`, '_blank');
    } else {
      printJS({ printable: base64, base64: true });
    }
  }

  /**
   * 
   * @param message
   * @param confirmBtnText 
   * @param title 
   * @param icon 
   * @param confirmBtnColor #d33 = 'Red', #2fb926 = 'Green'
   */
  triggerSwal(
    message: string,
    confirmBtnText: string = 'yes, delete it',
    title: string = 'Are you sure?',
    icon: 'success' | 'error' | 'warning' | 'info' | 'question' = 'question',
    confirmBtnColor: '#d33' | '#2fb926' = '#d33'
  ): Promise<Swal.SweetAlertResult> {
    return Swal.fire({
      title: title,
      text: message,
      icon: icon,
      showCancelButton: true,
      confirmButtonColor: confirmBtnColor,
      cancelButtonColor: '#3085d6',
      confirmButtonText: confirmBtnText,
      cancelButtonText: 'No',
      allowOutsideClick: false
    });
  }
}

export interface MainData {
  header: string,
  treeView: string,
  subTreeView: string,
  menu: string,
}
