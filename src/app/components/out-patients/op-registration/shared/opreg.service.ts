import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomEncoderService } from 'src/app/services/http/custom-encoder.service';
import { Inputs, Registration, Responses } from './opregistration.model';

@Injectable()
export class OPRegService {
  private currentUrl: string = environment.normUrl + 'out-patients/op-registration';

  constructor(private http: HttpClient, private encoder: CustomEncoderService) { }

  getStart(): Observable<Responses> {
    return this.http.get<Responses>(this.currentUrl);
  }

  getIDs(): Observable<Registration[]> {
    return this.http.get<Registration[]>(this.currentUrl + '/ids');
  }

  getPatientDetails(id: string): Observable<Inputs> {
    return this.http.get<Inputs>(this.currentUrl + '/patient-details', { params: { id } });
  }

  save(data: Inputs): Observable<string> {
    return this.http.post(this.currentUrl, data,
      {
        responseType: 'text'
      });
  }

  getYears(): Observable<Responses> {
    return this.http.get<Responses>(this.currentUrl + '/years');
  }

  getOPNos(year: string): Observable<number[]> {
    return this.http.get<number[]>(this.currentUrl + '/op-nos', { params: { year } });
  }

  GetObservationDetails(year: string, opNo: string): Observable<Inputs> {
    return this.http.get<Inputs>(this.currentUrl + '/observation-details', { params: { year, opNo } });
  }

  update(data: Inputs): Observable<string> {
    return this.http.patch(this.currentUrl + '/' + data.id, data,
      {
        responseType: 'text'
      });
  }

  deleteObs(id: number): Observable<string> {
    return this.http.delete(this.currentUrl + '/' + id, { responseType: 'text' });
  }

  getInputs(): Inputs {
    return {
      id: 0,
      ptid: '',
      year: '',
      opNo: '',
      name: '',
      age: '',
      gender: '',
      contact: '',
      consultant: '',
      reason: '',
      height: '',
      weight: '',
      bsa: '',
      bp: '',
      pulse: '',
      status: '',
    }
  }
}
