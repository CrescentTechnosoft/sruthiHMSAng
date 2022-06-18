import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class UpdatePatientResolverService implements Resolve<any>{

    constructor(private http:HttpClient){}

    resolve(route:ActivatedRouteSnapshot): Observable<any>
    {
        const uuid = route.params['uuid'];
        return this.http.get(`${environment.normUrl}reception/update-patient/${uuid}`);
    }
}