import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomEncoderService } from 'src/app/services/http/custom-encoder.service';
import { Responses, Users } from './user-access.model';

@Injectable()
export class UserService {
  currentUrl: string = environment.normUrl + 'masters/user-access';

  constructor(private http: HttpClient, private encoder: CustomEncoderService) { }

  GetAccess(): Observable<Responses> {
    return this.http.get<Responses>(this.currentUrl);
  }

  SaveAccess(id: string, access: string[]): Observable<string> {
    return this.http.patch(this.currentUrl + '/' + id, access, { responseType: 'text' });
  }

  GetUserAccess(id: string): Observable<string[]> {
    return this.http.get<string[]>(this.currentUrl + '/' + id);
  }
}
