import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomEncoderService } from 'src/app/services/http/custom-encoder.service';
import { Response, Inputs, Test, Field } from './test.model';

@Injectable()
export class TestService {
  testNames: string[] = [];
  categories: string[] = [];
  currentUrl: string = environment.normUrl + 'masters/test-master';

  constructor(private http: HttpClient, private encoder: CustomEncoderService) { }

  loadFunctions(): void {
    setTimeout(() => {
      $('#txtSearchTestName').autocomplete({
        source: (req, res) => res(this.testNames.filter(f => f.toLowerCase().indexOf(req.term.toLowerCase()) === 0))
      });

      $('#txtTestCat').autocomplete({
        source: (req, res) => res(this.categories.filter(f => f.toLowerCase().indexOf(req.term.toLowerCase()) === 0))
      });
    }, 0);

  }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(this.currentUrl);
  }

  saveTest(data: Inputs, fields: Field[]): Observable<Response> {
    return this.http.post<Response>(this.currentUrl, { data, fields });
  }

  getTests(): Observable<Test[]> {
    return this.http.get<Test[]>(`${this.currentUrl}/tests`);
  }

  getTestDetails(id: number): Observable<Response> {
    return this.http.get<Response>(`${this.currentUrl}/${id}`);
  }

  updateTest(id: number, data: Inputs, fields: Field[]): Observable<Response> {
    return this.http.patch<Response>(`${this.currentUrl}/${id}`, { data, fields });
  }

  deleteTest(id: number): Observable<string> {
    return this.http.delete(`${this.currentUrl}/${id}`, { responseType: 'text' });
  }

  GetInputs(): Inputs {
    return {
      searchTest: null,
      category: '',
      test: '',
      fees: 0,
      fieldCat: '',
      field: '',
      method: '',
      sample: '',
      units: '',
      normal: '',
      comments: ''
    }
  }
}

