import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomEncoderService } from 'src/app/services/http/custom-encoder.service';
import { Inputs, User, ResponseStatus, ResponseValues } from './user-master.model';

@Injectable()
export class UserService {
  currentUrl: string = environment.normUrl + 'masters/user-master';

  constructor(private http: HttpClient, private encoder: CustomEncoderService) { }

  GetUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.currentUrl);
  }

  AddUser(data: ResponseValues): Observable<ResponseStatus> {
    return this.http.post<ResponseStatus>(this.currentUrl, data);
  }

  getUserDetails(id: string): Observable<ResponseValues> {
    return this.http.get<ResponseValues>(this.currentUrl + '/' + id);
  }

  updateUser(id: string, data: ResponseValues): Observable<ResponseStatus> {
    return this.http.patch<ResponseStatus>(this.currentUrl + '/' + id, data,
      {
        headers: { 'Content-Type': 'application/json' }
      });
  }

  DeleteUser(id: string): Observable<string> {
    return this.http.delete(this.currentUrl + '/' + id, { responseType: 'text' });
  }

  GetInputs(): Inputs {
    return {
      addUser: '',
      addLoginName: '',
      addPass: '',
      addCPass: '',
      updateUser: '',
      updatePass: '',
      updateNewUser: '',
      updateLogin: '',
      deleteUser: ''
    }
  }
}
