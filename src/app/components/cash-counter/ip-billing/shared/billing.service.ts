import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Response, Input, IpNo, Treatment, BillNo } from './billing.model';

@Injectable()

export class BillingService {
  cardTypes: Array<string> = [];
  payTypes: Array<string> = [];
  selectedDate: string = '';
  currentUrl = environment.normUrl + 'cash-counter/ip-billing';

  constructor(private http: HttpClient) { }

  LoadFunctions(): void {
    setTimeout(() => {
      $('#txtCardType').autocomplete({
        source: (req, res) => res(this.cardTypes.filter(f => f.toLowerCase().startsWith(req.term.toLowerCase()))),
        appendTo: $('#cardDialog')
      });

      $('#txtOthers').autocomplete({
        source: (req, res) => res(this.payTypes.filter(f => f.toLowerCase().startsWith(req.term.toLowerCase())))
      });
    }, 0);
  }

  getAll(): Observable<Response> {
    return this.http.get<Response>(this.currentUrl);
  }

  getIPNos(year: string): Observable<IpNo[]> {
    return this.http.get<IpNo[]>(`${this.currentUrl}/ip-nos/${year}`);
  }

  getTreatmentDetails(id: string): Observable<Response> {
    return this.http.get<Response>(`${this.currentUrl}/treatments/${id}`);
  }

  saveBill(data: Input, treatments: Array<Treatment>): Observable<Response> {
    return this.http.post<Response>(this.currentUrl, { data, treatments });
  }

  getBillNos(year: string): Observable<BillNo[]> {
    return this.http.get<BillNo[]>(`${this.currentUrl}/bill-nos/${year}`);
  }

  getBillDetails(billId: string): Observable<Response> {
    return this.http.get<Response>(`${this.currentUrl}/bill-details/${billId}`);
  }

  updateBill(data: Input, treatments: Array<Treatment>): Observable<string> {
    return this.http.patch(`${this.currentUrl}/${data.billNo}`, { data, treatments }, { responseType: 'text' });
  }

  deleteBill(id:string): Observable<string> {
    return this.http.delete(`${this.currentUrl}/${id}`, { responseType: 'text' });
  }

  GetInputs(): Input {
    return
  }
}