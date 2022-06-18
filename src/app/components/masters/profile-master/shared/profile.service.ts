import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Response, Profile, Input, Test } from './profile.model';

@Injectable()
export class ProfileService {
  tests: Array<string> = [];
  currentUrl: string = environment.normUrl + 'masters/profile-master';

  constructor(private http: HttpClient) { }

  loadFunction() {
    setTimeout(() => {
      $('#txtTestName').autocomplete({
        source: (req: any, res: any) => res(this.tests.filter(f => f.toLowerCase().startsWith(req.term.toLowerCase())))
      });
    }, 0);
  }

  getStart(): Observable<Response> {
    return this.http.get<Response>(this.currentUrl);
  }

  saveProfile(data: Input, tests: Array<Test>): Observable<Response> {
    return this.http.post<Response>(this.currentUrl, { data, tests });
  }

  getProfiles(): Observable<Profile[]> {
    return this.http.get<Profile[]>(this.currentUrl + '/profiles');
  }

  getProfileDetails(id: string): Observable<Response> {
    return this.http.get<Response>(`${this.currentUrl}/${id}`);
  }

  updateProfile(data: Input, tests: Array<Test>): Observable<Response> {
    return this.http.patch<Response>(`${this.currentUrl}/${data.search}`, { data, tests });
  }

  deleteProfile(id: string): Observable<string> {
    return this.http.delete(`${this.currentUrl}/${id}`, { responseType: 'text' });
  }
}