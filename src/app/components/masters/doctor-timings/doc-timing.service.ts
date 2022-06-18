import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ITimings, Doctor } from './doctor-timing-model';

@Injectable()
export class DoctorTimingService {
    private currentUrl: string = environment.normUrl + 'masters/doctor-timing';

    constructor(private http: HttpClient) { }

    getConsultants(): Observable<Doctor[]> {
        return this.http.get<Doctor[]>(this.currentUrl);
    }

    getTimings(id: string): Observable<ITimings[]> {
        return this.http.get<ITimings[]>(this.currentUrl + '/' + id);
    }

    saveTimings(id: string, timings: ITimings[]): Observable<string> {
        return this.http.post(this.currentUrl, { id, timings },
            {
                headers: { 'Content-Type': 'application/json' },
                responseType: 'text'
            });
    }
}
