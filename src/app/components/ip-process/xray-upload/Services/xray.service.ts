import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomEncoderService } from 'src/app/services/http/custom-encoder.service';

@Injectable()
export class XRayService {
  currentUrl: string = environment.normUrl + 'IPProcess/XRayUploads/';
  constructor(private http: HttpClient, private encoder: CustomEncoderService) { }

  GetYears(): Observable<IResponses> {
    return this.http.get<IResponses>(environment.normUrl + 'IPProcess/XRayUploads');
  }

  GetIPNos(year: string): Observable<number[]> {
    return this.http.get<number[]>(this.currentUrl + 'GetIPNos', { params: { year } })
  }

  GetPatientDetails(year: string, ipNo: string): Observable<IResponses> {
    return this.http.get<IResponses>(this.currentUrl + 'GetPatientDetails', { params: { data: JSON.stringify({ year, ipNo }) } });
  }

  GetXRayImage(year: string, ipNo: string, xray: string): Observable<string> {
    return this.http.get(this.currentUrl + 'GetXRayImage', { params: { data: JSON.stringify({ year, ipNo, xray }) }, responseType: 'text' });
  }

  UploadXRayImage(year: string, ipNo: string, xray: string, image: File): Observable<HttpEvent<string>> {
    const formData = new FormData();
    formData.append('year', year);
    formData.append('ipNo', ipNo);
    formData.append('xray', xray);
    formData.append('image', image);
    return this.http.post(this.currentUrl + 'Upload', formData, { reportProgress: true, responseType: 'text', observe: 'events', headers: { 'No-Content': '' } });
  }

  DeleteFile(year: string, ipNo: string, xray: string): Observable<IDelete> {
    return this.http.post<IDelete>(this.currentUrl + 'Delete', this.encoder.encodeAll({ data: JSON.stringify({ year, ipNo, xray }) }));
  }

  GetInputs(): Inputs {
    return {
      year: '',
      ipNo: '',
      id: '',
      name: '',
      age: '',
      gender: '',
      consultant: '',
      xray: ''
    }
  }
}

interface IResponses {
  years: Array<string>,
  ipNos: Array<number>,
  data: Inputs,
  xrays: Array<string>
}

interface IDelete {
  status: boolean,
  result: string
}

export interface Inputs {
  year: string,
  ipNo: string,
  id: string,
  name: string,
  age: string,
  gender: string,
  consultant: string,
  xray: string
}
