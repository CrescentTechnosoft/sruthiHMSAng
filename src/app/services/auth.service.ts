import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { CustomEncoderService } from 'src/app/services/http/custom-encoder.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: boolean = false;
  accessDatas: Array<string> = [];
  currentUrl: string = environment.normUrl + 'auth/';

  constructor(private http: HttpClient, private encoder: CustomEncoderService) { }

  clearAuth(): void {
    this.isLoggedIn = false;
    this.accessDatas = [];
    localStorage.removeItem('user');
    this.http.patch(this.currentUrl + 'clear', 'login=false').toPromise();
  }

  getAccessDatas(): Array<string> {
    return this.accessDatas;
  }

  validateLogin(user: string, pass: string): Observable<LoginStatus> {
    return this.http.post<LoginStatus>(this.currentUrl + 'validate', this.encoder.encodeAll({ user, pass }));
  }

  authenticateUser(page: string): Observable<AuthStatus> {
    if (!this.isLoggedIn) {
      return this.http.get<AuthStatus>(this.currentUrl + 'authenticate-user', { params: { page } });
    }
    else if (!this.accessDatas.includes(page)) {
      return of<AuthStatus>({ status: 'Restricted', access: [], isValidatedNow: false });
    }
    else {
      return of<AuthStatus>({ status: 'Granted', access: this.accessDatas, isValidatedNow: false });
    }
  }
}

interface LoginStatus {
  status: boolean,
  message: string,
  access: Array<string>,
  user: string
}

interface AuthStatus {
  status: string,
  access: Array<string>,
  isValidatedNow: boolean
}