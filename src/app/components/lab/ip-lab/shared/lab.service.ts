import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Response, Patient, IpNo, Field } from './lab.model';

@Injectable()
export class LabService {
  currentUrl = environment.normUrl + 'lab/ip-lab';

  constructor(private http: HttpClient) { }

  getOpeningValues(): Observable<Response> {
    return this.http.get<Response>(this.currentUrl);
  }

  searchPatients(key: string): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${this.currentUrl}/search/${key}`);
  }

  getIPNos(year: string): Observable<IpNo[]> {
    return this.http.get<IpNo[]>(`${this.currentUrl}/ip-nos/${year}`);
  }

  getLabDatas(treatmentId: string): Observable<Response> {
    return this.http.get<Response>(`${this.currentUrl}/${treatmentId}`);
  }

  saveLabResults(treatmentId: string, fields: Array<Field>): Observable<Response> {
    return this.http.post<Response>(this.currentUrl, { treatmentId, fields })
  }

  deleteLabResult(treatmentId: string): Observable<Response> {
    return this.http.delete<Response>(`${this.currentUrl}/${treatmentId}`);
  }

  print(id: string, isSelected: boolean, header: string, selectedTests: number[] = []) {
    this.http.post(`${environment.normUrl}printouts/ip-lab-report`, { id, isSelected, header, selectedTests },
      {
        responseType: 'text'
      })
      .toPromise()
      .then(url => {
        printJS({ printable: url, base64: true });
      });
  }
}
