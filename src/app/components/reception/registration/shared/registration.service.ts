import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Consultant, Response } from './registration.model';
import { Observable } from 'rxjs';

@Injectable()

export class RegistrationService {
    currentUrl: string = `${environment.normUrl}reception/registration`;

    constructor(private http: HttpClient) { }

    getConsultants(): Observable<Consultant[]> {
        return this.http.get<Consultant[]>(this.currentUrl);
    }

    saveRegistration(data: object): Observable<Response> {
        return this.http.post<Response>(this.currentUrl, data);
    }

    getPrintValue(id: number): Observable<string> {
        return this.http.get(`${environment.printUrl}registration/${id}`, { responseType: 'text' });
    }
}