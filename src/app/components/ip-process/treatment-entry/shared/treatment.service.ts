import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { CustomEncoderService } from 'src/app/services/http/custom-encoder.service';
import { Fee, Response, Input, Test, BillNo, Treatment, RefNo } from './treatment.model';

@Injectable()

export class TreatmentService {
  fees: Array<Fee> = [];
  tests: Array<Test> = [];
  groupTests: Array<Test> = [];
  profiles: Array<Test> = [];
  medicines: Array<string> = [];
  private currentUrl: string = environment.normUrl + 'ip-process/treatment';

  constructor(private http: HttpClient, private encoder: CustomEncoderService) { }

  getOpeningValues(): Observable<Response> {
    return this.http.get<Response>(this.currentUrl);
  }

  // GetAdmissionYear(): Observable<IResponses> {
  //   return this.http.get<IResponses>(this.currentUrl + 'GetAdmissionYear');
  // }

  getIPNos(year: string): Observable<BillNo[]> {
    return this.http.get<BillNo[]>(`${this.currentUrl}/ip-nos/${year}`);
  }

  getPatientDetails(id: string): Observable<Response> {
    return this.http.get<Response>(`${this.currentUrl}/patient-details/${id}`);
  }

  getFees(method: string, id: number): Observable<Response> {
    return this.http.get<Response>(`${this.currentUrl}/${method}/${id}`);
  }

  saveTreatment(id: string, ptId: string, treatments: Array<Treatment>): Observable<string> {
    return this.http.post(this.currentUrl, { id, ptId, treatments },
      {
        responseType: 'text'
      });
  }

  getOldIPNos(year: string): Observable<BillNo[]> {
    return this.http.get<BillNo[]>(`${this.currentUrl}/old-ip-nos/${year}`);
  }

  getRefNos(id: string): Observable<RefNo[]> {
    return this.http.get<RefNo[]>(`${this.currentUrl}/ref-nos/${id}`);
  }

  getTreatmentDetails(treatmentId: string): Observable<Response> {
    return this.http.get<Response>(`${this.currentUrl}/${treatmentId}`);
  }

  updateTreatment(treatmentId: string, ptId: string, ipId: string, treatments: Array<Treatment>): Observable<string> {
    return this.http.patch(`${this.currentUrl}/${treatmentId}`, { ptId, ipId, treatments },
      {
        responseType: 'text'
      });
  }

  deleteTreatment(treatmentId: string): Observable<string> {
    return this.http.delete(`${this.currentUrl}/${treatmentId}`, { responseType: 'text' });
  }

  GetInputs(): Input {
    return {
      year: '',
      ipNo: '',
      oldYear: '',
      oldIPNo: '',
      refNo: '',
      id: '',
      name: '',
      age: '',
      gender: '',
      consultant: '',
      feesType: '',
      qty: 0,
      cost: 0,
      total: 0
    }
  }
}