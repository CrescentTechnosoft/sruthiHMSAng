import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomEncoderService } from 'src/app/services/http/custom-encoder.service';

@Injectable()
export class FeesService {
  currentUrl: string = environment.normUrl + 'masters/fees-master';

  constructor(private http: HttpClient, private encoder: CustomEncoderService) { }

  GetFeesList(): Observable<PostData> {
    return this.http.get<PostData>(this.currentUrl);
  }

  SaveFees(data: Inputs): Observable<string> {
    return this.http.post(this.currentUrl, data,
      {
        headers: { 'Content-Type': 'application/json' },
        responseType: 'text'
      });
  }

  UpdateFees(id: number, data: Inputs): Observable<string> {
    return this.http.patch(this.currentUrl + '/' + id, data,
      {
        headers: { 'Content-Type': 'application/json' },
        responseType: 'text'
      });
  }

  DeleteFees(id: number): Observable<string> {
    return this.http.delete(this.currentUrl + '/' + id, { responseType: 'text' });
  }

  AddDepartment(department: string): Observable<string> {
    const body = this.encoder.encodeAll({ department });
    return this.http.post(environment.normUrl + 'extras/department', body, { responseType: 'text' });
  }

  RemoveDepartment(department: string): Observable<string> {
    return this.http.delete(environment.normUrl + 'extras/department/' + encodeURIComponent(department), { responseType: 'text' });
  }

  GetInputs(): Inputs {
    return {
      id: 0,
      department: '',
      txtDepartment: '',
      category: '',
      feesName: '',
      opFees: 0,
      ipFees: 0,
      filterDept: 'All'
    }
  }
}

interface PostData {
  departments: string[],
  fees: Array<Inputs>
}

export interface Datas {
  id: number,
  department: string,
  category: string,
  feesName: string,
  opFees: number,
  ipFees: number,
}

export interface Inputs {
  id: number,
  department: string,
  txtDepartment: string,
  category: string,
  feesName: string,
  opFees: number,
  ipFees: number,
  filterDept: string
}