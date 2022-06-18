import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Response, Test, Input } from './test.model';

@Injectable()
export class TestService {
  // categories: Array<string> = [];
  private currentUrl = environment.normUrl + 'masters/test-master';

  constructor(private http: HttpClient) { }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(this.currentUrl);
  }

  saveTest(data: Input): Observable<Response> {
    return this.http.post<Response>(this.currentUrl, data);
  }

  getTests(): Observable<Test[]> {
    return this.http.get<Test[]>(`${this.currentUrl}/tests`);
  }

  getTestDetails(id: number): Observable<Response> {
    return this.http.get<Response>(`${this.currentUrl}/${id}`);
  }

  updateTest(data: Input): Observable<Response> {
    return this.http.patch<Response>(`${this.currentUrl}/${data.search}`, data);
  }

  deleteTest(id: number): Observable<string> {
    return this.http.delete(`${this.currentUrl}/${id}`, { responseType: 'text' });
  }

  addCategory(category: string): Observable<string> {
    return this.http.post(`${environment.normUrl}extras/test-category`, 'category=' + encodeURIComponent(category),
      {
        responseType: 'text',
      });
  }

  removeCategory(category: string): Observable<string> {
    return this.http.delete(`${environment.normUrl}extras/test-category/${encodeURIComponent(category)}`,
      {
        responseType: 'text'
      });
  }
}
