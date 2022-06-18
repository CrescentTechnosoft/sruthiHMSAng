import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Response, IpNo } from './history.model';

@Injectable()

export class HistoryService {
  currentUrl: string = environment.normUrl + 'ip-process/history';

  constructor(private http: HttpClient) { }

  searchPatient(search: string): Observable<Response> {
    return this.http.get<Response>(`${this.currentUrl}/search/${search}`);
  }

  getYears(): Observable<Response> {
    return this.http.get<Response>(this.currentUrl);
  }

  getIPNos(year: string): Observable<IpNo[]> {
    return this.http.get<IpNo[]>(`${this.currentUrl}/ip-nos/${year}`);
  }

  getIPHistory(id: string): Observable<Response> {
    return this.http.get<Response>(`${this.currentUrl}/${id}`);
  }
}