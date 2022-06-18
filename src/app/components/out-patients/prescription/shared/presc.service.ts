import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomEncoderService } from 'src/app/services/http/custom-encoder.service';
import { Response, Inputs, OPNo, ResponseDatas, MedicineData } from './prescription.model';

@Injectable()
export class PrescService {
  private currentUrl: string;
  private extrasUrl: string;
  public medicines: Array<string>;
  public investigations: Array<string>;
  public treatments: Array<string>;
  public complaints: Array<string>;

  constructor(private http: HttpClient, private encoder: CustomEncoderService) { }

  startAll(): void {
    this.currentUrl = environment.normUrl + 'out-patients/prescription';
    this.extrasUrl = environment.normUrl + 'extras/';
    this.medicines = new Array();
    this.investigations = new Array();
    this.treatments = new Array();
    this.complaints = new Array();

    setTimeout(() => {
      $('#txtMedicine').autocomplete({
        source: (req: { term: string }, res) => res(this.medicines.filter(f => f.toLowerCase().startsWith(req.term.toLowerCase())))
      });

      $('#txtInvestigation').autocomplete({
        source: (req: { term: string }, res) => res(this.investigations.filter(f => f.toLowerCase().startsWith(req.term.toLowerCase())))
      });

      $('#txtTreatment').autocomplete({
        source: (req: { term: string }, res) => res(this.treatments.filter(f => f.toLowerCase().startsWith(req.term.toLowerCase())))
      });

      $('#txtComplaints').autocomplete({
        source: (req: { term: string }, res) => res(this.complaints.filter(f => f.toLowerCase().startsWith(req.term.toLowerCase())))
      });

      $("#accordion").on("hide.bs.collapse show.bs.collapse", (e: any) => {
        $(e.target)
          .prev()
          .find("i:last-child")
          .toggleClass("fa-minus fa-plus");
      });
    }, 0);
  }

  GetAll(): Observable<Response> {
    return this.http.get<Response>(this.currentUrl);
  }

  getOPNos(year: string): Observable<OPNo[]> {
    return this.http.get<OPNo[]>(this.currentUrl + '/op-nos', { params: { year } });
  }

  getObservationDetails(id: string): Observable<Response> {
    return this.http.get<Response>(this.currentUrl + '/observation-details', { params: { id } });
  }

  savePrescription(data: object): Observable<string> {
    return this.http.post(this.currentUrl, data,
      {
        headers: { 'Content-Type': 'application/json' },
        responseType: 'text'
      });
  }

  getPrescNos(year: string): Observable<OPNo[]> {
    return this.http.get<OPNo[]>(this.currentUrl + '/presc-nos', { params: { year } });
  }

  getPrescriptions(id: string): Observable<Response> {
    return this.http.get<Response>(this.currentUrl + '/' + id);
  }

  updatePrescription(id: string, data: object): Observable<string> {
    return this.http.patch(this.currentUrl + '/' + id, data,
      {
        responseType: 'text',

      });
  }

  deletePrescription(id: string): Observable<string> {
    return this.http.delete(`${this.currentUrl}/${id}`, { responseType: 'text' });
  }

  createComplaint(complaint: string): Observable<string> {
    return this.http.post(this.extrasUrl + 'complaint', this.encoder.encodeAll({ complaint }), { responseType: 'text' });
  }

  deleteComplaint(complaint: string): Observable<string> {
    return this.http.delete(this.extrasUrl + 'complaint/' + encodeURIComponent(complaint), { responseType: 'text' });
  }

  createTreatment(treatment: string): Observable<string> {
    return this.http.post(this.extrasUrl + 'treatment', this.encoder.encodeAll({ treatment }), { responseType: 'text' });
  }

  deleteTreatment(treatment: string): Observable<string> {
    return this.http.delete(this.extrasUrl + 'treatment/' + encodeURIComponent(treatment), { responseType: 'text' });
  }

  GetInputs(): Inputs {
    return {
      ptId: '',
      year: '',
      id: '',
      prYear: '',
      prId: '',
      name: '',
      age: '',
      gender: '',
      contact: '',
      consultant: '',
      diagnosis: '',
      reason: '',
      height: '',
      weight: '',
      bsa: '',
      bp: '',
      pulse: '',
      status: '',
      opinion: '',
      patientInfo: '',
      complaint: '',
      medicine: '',
      fType: 'AF',
      dosage: '1-1-1',
      period: '',
      days: null,
      treatment: ''
    }
  }
}
