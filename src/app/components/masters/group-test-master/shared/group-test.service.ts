import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Response, Test, Input, Field } from './group-test.model';

@Injectable()
export class GroupTestService {
  private currentUrl: string = environment.normUrl + 'masters/group-test-master';
  fields: Array<string> = [];

  constructor(private http: HttpClient) { }

  startAutoComplete(): void {
    $('#txtFieldName').autocomplete({
      source: (req, res) => res(this.fields.filter(f => f.toLowerCase().startsWith(req.term.toLowerCase())))
    });
  }

  getStart(): Observable<Response> {
    return this.http.get<Response>(this.currentUrl);
  }

  saveTest(data: Input, fields: Array<Field>): Observable<Response> {
    return this.http.post<Response>(this.currentUrl, { data, fields });
  }

  getTests(): Observable<Test[]> {
    return this.http.get<Test[]>(this.currentUrl + '/tests');
  }

  getTestDetails(id: number): Observable<Response> {
    return this.http.get<Response>(`${this.currentUrl}/${id}`);
  }

  updateTest(data: Input, fields: Array<Field>): Observable<Response> {
    return this.http.patch<Response>(`${this.currentUrl}/${data.search}`, { data, fields },
      {
        headers: { 'Content-Type': 'application/json' }
      });
  }

  deleteTest(id: number): Observable<string> {
    return this.http.delete(`${this.currentUrl}/${id}`, { responseType: 'text' });
  }
}
