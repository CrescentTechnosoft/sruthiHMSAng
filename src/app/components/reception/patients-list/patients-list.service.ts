import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Response, Profile } from './patients-list.model';
import { Observable } from 'rxjs';

@Injectable()
export class PatientsListService {
  currentUrl: string = `${environment.normUrl}reception/patients-list`;

  constructor(private http: HttpClient) { }

  public getPatients(search: string, page: number, count: number): Observable<Response> {
    return this.http.get<Response>(this.currentUrl,
      {
        params: { search, page: page.toString(), count: count.toString() }
      });
  }

  getProfile(id: string): Observable<Profile> {
    return this.http.get<Profile>(`${this.currentUrl}/profile/${id}`);
  }

  deletePatient(id: number): Observable<string> {
    return this.http.delete(`${this.currentUrl}/${id}`, { responseType: 'text' })
  }
}
