import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { CustomEncoderService } from 'src/app/services/http/custom-encoder.service';
import { Response, Input, IpNo } from './discharge.model';

@Injectable()
export class DischargeService {
  currentUrl: string = environment.normUrl + 'ip-process/discharge';

  constructor(private http: HttpClient, private encoder: CustomEncoderService) { }

  getStart(): Observable<Response> {
    return this.http.get<Response>(this.currentUrl);
  }

  getIPNos(year: string): Observable<IpNo[]> {
    return this.http.get<IpNo[]>(`${this.currentUrl}/ip-nos/${year}`);
  }

  getPatientDetails(id: string): Observable<Response> {
    return this.http.get<Response>(`${this.currentUrl}/patient-details/${id}`);
  }

  saveDischarge(data: Input): Observable<string> {
    return this.http.post(this.currentUrl, data, { responseType: 'text' });
  }

  getDischargeIPNos(year: string): Observable<IpNo[]> {
    return this.http.get<IpNo[]>(`${this.currentUrl}/discharge-nos/${year}`);
  }

  getDischargeDetails(id: string): Observable<Response> {
    return this.http.get<Response>(`${this.currentUrl}/discharge-details/${id}`);
  }

  modifyDischarge(data: Input): Observable<string> {
    return this.http.patch(`${this.currentUrl}/${data.oldIPNo}`, data, { responseType: 'text' });
  }

  deleteDischarge(id: string): Observable<string> {
    return this.http.delete(`${this.currentUrl}/${id}`, { responseType: 'text' });
  }

  getInputs(): Input {
    return {
      year: '',
      ipNo: '',
      oldYear: '',
      oldIPNo: '',
      id: 0,
      name: '',
      age: '',
      gender: '',
      consultant: '',
      history: '',
      pReaction: '',
      pulse: '',
      bp: '',
      hb: '',
      tc: '',
      wbc: '',
      poly: '',
      lymp: '',
      eos: '',
      m: '',
      b: '',
      sugar: '',
      urea: '',
      scr: '',
      crit: '',
      plat: '',
      diagnosis: '',
      investigation: '',
      surgery: '',
      treatment: '',
      advice: '',
      condition: '',
      disease: '',
      cons1: '',
      cons2: '',
      cons3: '',
      cons4: '',
      cons5: '',
      dDate: '',
      dTime: '',
      dCause: '',
      hCourse: '',
      report: ''
    }
  }
}

