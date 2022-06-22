import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomEncoderService } from 'src/app/services/http/custom-encoder.service';
import { Inputs, Response,ResponseData, TempData, Patient, FeesData, BillNo, Registration } from './opbilling.model';

@Injectable()

export class BillingService {
    private currentUrl: string = environment.normUrl + 'cash-counter/op-billing';
    private extrasUrl: string = environment.normUrl + 'extras/';

    constructor(private http: HttpClient, private encoder: CustomEncoderService) { }

    getAll(): Observable<Response> {
        return this.http.get<Response>(this.currentUrl);
    }

    getPatientsList(search: string): Observable<Response> {
        return this.http.get<Response>(this.currentUrl + '/search-patients', { params: { search } });
    }

    getIds(): Observable<Registration[]> {
        return this.http.get<Registration[]>(this.currentUrl + '/ids');
    }

    getPatientDetails(id: string): Observable<ResponseData> {
        return this.http.get<ResponseData>(`${this.currentUrl}/patient-details/${id}`);
    }

    getFees(method: string, id: number): Observable<TempData> {
        return this.http.get<TempData>(`${this.currentUrl}/${method}/${id}`);
    }

    saveBill(data: object): Observable<Response> {
        return this.http.post<Response>(this.currentUrl, data);
    }

    getBillYears(): Observable<Response> {
        return this.http.get<Response>(this.currentUrl + '/years');
    }

    getBillNos(year: string): Observable<BillNo[]> {
        return this.http.get<BillNo[]>(`${this.currentUrl}/billnos/${year}`);
    }

    getBillDetails(id: string): Observable<Response> {
        return this.http.get<Response>(`${this.currentUrl}/${id}`);
    }

    updateBillDetails(id: string, data: object): Observable<string> {
        return this.http.patch(`${this.currentUrl}/${id}`, data,
            {
                responseType: 'text'
            });
    }

    deleteBill(id: string): Observable<string> {
        return this.http.delete(`${this.currentUrl}/${id}`,
            {
                responseType: 'text'
            });
    }

    addPayType(payType: string): Observable<string> {
        return this.http.post(`${this.extrasUrl}pay-type`, `pay-type=${encodeURIComponent(payType)}`,
            {
                responseType: 'text'
            });
    }

    removePayType(payType: string): Observable<string> {
        return this.http.delete(`${this.extrasUrl}pay-type/${encodeURIComponent(payType)}`,
            {
                responseType: 'text'
            });
    }

    addCardType(cardType: string): Observable<string> {
        return this.http.post(`${this.extrasUrl}card-type`, `card-type=${encodeURIComponent(cardType)}`,
            {
                responseType: 'text'
            });
    }

    removeCardType(cardType: string): Observable<string> {
        return this.http.delete(`${this.extrasUrl}card-type/${encodeURIComponent(cardType)}`,
            {
                responseType: 'text'
            });
    }

    GetInputs(): Inputs {
        return {
            search: '',
            ddlPID: '',
            pid: '0',
            name: '',
            age: '',
            gender: 'Male',
            contact: '',
            cons: '',
            feesType: '',
            fees: '',
            otherType: '',
            total: 0,
            discount: 0,
            subTotal: 0,
            paying: 0,
            due: 0,
            refund: 0,
            cardNo: '',
            cardType: '',
            cardExpiry: '',
            payType: 'Cash',
            year: '',
            billNo: ''
        }
    }
}
