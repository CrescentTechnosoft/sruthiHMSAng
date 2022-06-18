import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { CustomEncoderService } from 'src/app/services/http/custom-encoder.service';
import { Status, Response, Input, Patient, Room, IPNo } from './admission.model';

@Injectable()
export class AdmissionService {
  currentUrl: string = environment.normUrl + 'ip-process/admission';

  constructor(private http: HttpClient, private encoder: CustomEncoderService) { }

  loadFunctions() {
    setTimeout(() => {
      $("#accordion").on("hide.bs.collapse show.bs.collapse", (e: any) => {
        $(e.target)
          .prev()
          .find("i:last-child")
          .toggleClass("fa-minus fa-plus");
      });
    }, 0);
  }

  getStart(): Observable<Response> {
    return this.http.get<Response>(this.currentUrl);
  }

  getPatientsList(search: string): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.currentUrl + '/search', { params: { search } });
  }

  getPatientID(): Observable<number[]> {
    return this.http.get<number[]>(this.currentUrl + 'ids');
  }

  getPatientDetails(id: string): Observable<Input> {
    return this.http.get<Input>(this.currentUrl + '/patient-details', { params: { id } });
  }

  getWards(): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.currentUrl}/wards`);
  }

  saveAdmission(data: Input): Observable<Status> {
    return this.http.post<Status>(this.currentUrl, { data: JSON.stringify(data) });
  }

  getYears(): Observable<Response> {
    return this.http.get<Response>(this.currentUrl + '/years');
  }

  getIPNos(year: string): Observable<IPNo[]> {
    return this.http.get<IPNo[]>(`${this.currentUrl}/ip-nos/${year}`);
  }

  getAdmissionDetails(id: string): Observable<Input> {
    return this.http.get<Input>(`${this.currentUrl}/admission-details/${id}`);
  }

  updateAdmission(data: Input): Observable<string> {
    return this.http.patch(`${this.currentUrl}/${data.ipNo}`, data,
      {
        responseType: 'text'
      });
  }

  deleteAdmission(id: string): Observable<string> {
    return this.http.delete(`${this.currentUrl}/${id}`,
      {
        responseType: 'text'
      });
  }

  getRevertValues(): Observable<Response> {
    return this.http.get<Response>(this.currentUrl + '/revert');
  }

  addInsCategory(category: string): Observable<string> {
    return this.http.post(`${environment.extrasUrl}insurance-category`, this.encoder.encodeAll({ category }), { responseType: 'text' });
  }

  removeInsCategory(category: string): Observable<string> {
    return this.http.delete(`${environment.extrasUrl}insurance-category/${encodeURIComponent(category)}`, { responseType: 'text' });
  }

  getInputs(): Input {
    return {
      year: '',
      ipNo: '',
      ddlID: '',
      txtID: '',
      name: '',
      age: '',
      gender: '',
      contact: '',
      address: '',
      fees: 0,
      admType: 'RT',
      diagnosis: '',
      ref: '',
      department: '',
      cons: '',
      rName: '',
      rContact: '',
      rType: '',
      rAddress: '',
      insCat: '',
      insID: '',
      insName: '',
      search: '',
      room: 0
    }
  }
}
