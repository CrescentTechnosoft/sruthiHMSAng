import { Injectable } from '@angular/core';
import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomEncoderService } from 'src/app/services/http/custom-encoder.service';

@Injectable()
export class FeedbackService {
  currentUrl: string;

  constructor(private http: HttpClient,private encoder:CustomEncoderService) {
    this.currentUrl = environment.normUrl + 'CashCounter/Feedback/';
  }

  GetIDs(date: string): Observable<number[]> {
    return this.http.get<number[]>(this.currentUrl + 'GetIDs', { params: { date } });
  }

  GetPatientDetails(date: string, id: string): Observable<IResponse> {
    return this.http.get<IResponse>(this.currentUrl + 'GetPatientDetails', { params: { date, id } })
  }

  Add(data: string): Observable<string> {
    return this.http.post(this.currentUrl + 'Add',this.encoder.encodeAll({data}), { responseType: 'text' });
  }

  Remove(date: string, id: string): Observable<string> {
    const body = this.encoder.encodeAll({data:JSON.stringify({ date, id })});
    return this.http.post(this.currentUrl + 'Remove', body, { responseType: 'text' });
  }

  GetInputs(): Inputs {
    return {
      id: '',
      name: '',
      age: '',
      gender: '',
      contact: '',
      date: formatDate(new Date, 'y-MM-dd', 'en-in'),
      feedback: 'Nothing',
      review: '',
      reason: '',
      isSaved:false
    }
  }
}

interface IResponse {
  data: Inputs,
  bills: Array<string>
}

export interface Inputs {
  id: string,
  name: string,
  age: string,
  gender: string,
  contact: string,
  date: string,
  feedback: string,
  review: string,
  reason: string,
  isSaved:boolean
}
