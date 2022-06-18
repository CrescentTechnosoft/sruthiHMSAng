import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Responses, Inputs, Patients } from './appointments.model';

@Injectable()
export class AppointmentService {
    private currentUrl: string = environment.normUrl + 'reception/appointments';

    constructor(private http: HttpClient) { }

    getStart(): Observable<Responses> {
        return this.http.get<Responses>(this.currentUrl);
    }

    searchPatients(search: string): Observable<Patients[]> {
        return this.http.get<Patients[]>(this.currentUrl + '/search', { params: { search } });
    }

    getPatientDetails(id: string): Observable<Inputs> {
        return this.http.get<Inputs>(`${this.currentUrl}/patient-details/${id}`);
    }

    getDoctorAppointments(id: string): Observable<Responses> {
        return this.http.get<Responses>(this.currentUrl + '/' + id);
    }


    public getNumberFromTimeString(time: string): number {
        let timeValue = parseInt(time.replace(/\D/gi, ''))
        let value = 0;
        if (time.includes('PM') && timeValue < 1200)
            value = 1200;

        if (time.includes('AM') && timeValue >= 1200 && timeValue <= 1259)
            timeValue -= 1200;

        return value + timeValue;
    }

    public addAppointment(data: Inputs): Observable<Responses> {
        return this.http.post<Responses>(this.currentUrl, data,
            {
                headers: { 'Content-Type': 'application/json' }
            });
    }

    public cancelAppointment(id: number): Observable<string> {
        return this.http.delete(this.currentUrl + '/' + id, { responseType: 'text' });
    }
}
