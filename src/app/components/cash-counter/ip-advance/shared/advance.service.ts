import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomEncoderService } from 'src/app/services/http/custom-encoder.service';
import { Response, Input, IpNo } from './advance.model';

@Injectable()
export class AdvanceService {
  private currentUrl: string;

  constructor(private http: HttpClient, private encoder: CustomEncoderService) {
    this.currentUrl = environment.normUrl + 'cash-counter/ip-advance';
  }

  getStart(): Observable<Response> {
    return this.http.get<Response>(this.currentUrl);
  }

  getIPNos(year: string): Observable<IpNo[]> {
    return this.http.get<IpNo[]>(`${this.currentUrl}/ip-nos/${year}`);
  }

  getPatientDetails(id: string): Observable<Response> {
    return this.http.get<Response>(`${this.currentUrl}/${id}`);
  }

  saveAdvance(data: Input): Observable<Response> {
    return this.http.post<Response>(this.currentUrl, data);
  }

  updateAdvance(data: Input): Observable<Response> {
    return this.http.patch<Response>(`${this.currentUrl}/${data.advanceId}`, data);
  }

  deleteAdvance(id: string): Observable<string> {
    return this.http.delete(`${this.currentUrl}/${id}`, { responseType: 'text' });
  }
}
