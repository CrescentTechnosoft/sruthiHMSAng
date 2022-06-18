import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Response, PatientResponse, Inputs, BillNo, Field } from './oplab.model';

@Injectable()
export class LabService {
  currentUrl: string = environment.normUrl + 'lab/op-lab';

  constructor(private http: HttpClient) { }

  getOpeningValues(): Observable<Response> {
    return this.http.get<Response>(this.currentUrl);
  }

  searchPatients(search: string): Observable<PatientResponse> {
    return this.http.get<PatientResponse>(this.currentUrl + '/search', { params: { search } });
  }

  getBillNos(year: string): Observable<BillNo[]> {
    return this.http.get<BillNo[]>(this.currentUrl + '/bill-nos', { params: { year } });
  }

  getTestDetails(id: string): Observable<Response> {
    return this.http.get<Response>(`${this.currentUrl}/${id}`);
  }

  saveResults(id: string, fields: Field[]): Observable<Response> {
    return this.http.post<Response>(this.currentUrl, { id, fields })
  }

  deleteResult(id: string): Observable<string> {
    return this.http.delete(`${this.currentUrl}/${id}`, { responseType: 'text' });
  }

  print(id: string, isSelected: boolean, header: string, selectedTests: number[] = []) {
    this.http.post(`${environment.normUrl}printouts/op-lab-report`, { id, isSelected, header, selectedTests },
      {
        responseType: 'text'
      })
      .toPromise()
      .then(url => {
        printJS({ printable: url, base64: true });
      });
  }
  // SendSMS(year: string, billNo: string): Observable<string> {
  //   return this.http.post(this.currentUrl + 'SendSMS', this.encoder.encodeAll({ data: JSON.stringify({ year, billNo }) }), { responseType: 'text' });
  // }

  getInputs(): Inputs {
    return {
      year: '',
      billNo: '',
      ptId: '',
      name: '',
      age: '',
      gender: '',
      consultant: '',
      saved: false
    }
  }
}
