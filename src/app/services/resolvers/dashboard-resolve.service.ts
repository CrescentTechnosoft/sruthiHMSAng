import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class DashboardResolveService implements Resolve<any>{

    constructor(private http:HttpClient){}
    resolve(): Observable<any>
    {
        return this.http.get(`${environment.normUrl}dashboard`);
    }
}