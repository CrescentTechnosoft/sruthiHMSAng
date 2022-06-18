import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomEncoderService } from 'src/app/services/http/custom-encoder.service';
import { Inputs, IStatus, Response } from './doctor-master.model';

@Injectable()

export class DocService {
  specializations: string[] = [];
  currentUrl: string = environment.normUrl + 'masters/doctor-master';

  constructor(private http: HttpClient, private encoder: CustomEncoderService) { }

  LoadFunction(): void {
    setTimeout(() => {
      $('#txtSpecialization').autocomplete({
        source: (req, res) => res(this.specializations.filter(f => f.toLowerCase().startsWith(req.term.toLowerCase())))
      });
    }, 0);
  }

  GetStart(): Observable<Response> {
    return this.http.get<Response>(this.currentUrl);
  }

  AddSpecialization(specialization: string): Observable<string> {
    const body = this.encoder.encodeAll({ specialization });
    return this.http.post(environment.normUrl + 'extras/specialization', body, { responseType: 'text' });
  }

  RemoveSpecialization(specialization: string): Observable<string> {
    return this.http.delete(environment.normUrl + 'extras/specialization/' + encodeURIComponent(specialization), { responseType: 'text' });
  }

  SaveData(data: Inputs): Observable<IStatus> {
    return this.http.post<IStatus>(this.currentUrl, data, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  UpdateData(data: Inputs): Observable<IStatus> {
    return this.http.patch<IStatus>(this.currentUrl + '/' + data.id, data, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  DeleteData(id: number): Observable<string> {
    return this.http.delete(this.currentUrl + '/' + id, { responseType: 'text' });
  }
}
