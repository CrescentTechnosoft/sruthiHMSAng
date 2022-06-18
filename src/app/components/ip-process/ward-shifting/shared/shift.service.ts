import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { CustomEncoderService } from 'src/app/services/http/custom-encoder.service';
import { Response, Input, IpNo } from './shift.model';

@Injectable()
export class ShiftService {
  currentUrl: string = environment.normUrl + 'ip-process/ward-shift';

  constructor(private http: HttpClient, private encoder: CustomEncoderService) { }

  getLoad(): Observable<Response> {
    return this.http.get<Response>(this.currentUrl);
  }

  getIPNos(year: string): Observable<IpNo[]> {
    return this.http.get<IpNo[]>(`${this.currentUrl}/ip-nos/${year}`, { params: { year } });
  }

  getPatientDetails(id: string): Observable<Input> {
    return this.http.get<Input>(`${this.currentUrl}/${id}`);
  }

  shiftWard(data: Input, room: number): Observable<Response> {
    return this.http.post<Response>(this.currentUrl, { data, room });
  }
}
