import { Component, OnInit, OnDestroy } from '@angular/core';
import { formatDate } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/services/common.service';
import { CustomEncoderService } from 'src/app/services/http/custom-encoder.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject, } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
// import { momen } from 'moment';

@Component({
  selector: 'app-update-patient',
  templateUrl: './update-patient.component.html',
  styleUrls: ['./update-patient.component.scss']
})

export class UpdatePatientComponent implements OnInit, OnDestroy {
  consultants: Array<Consultant> = [];
  isUpdating: boolean;
  formGroup: FormGroup;
  destroy$: Subject<boolean>;
  uuid:string;

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router, private toastr: ToastrService, private common: CommonService, private encoder: CustomEncoderService) { }

  ngOnInit(): void {
    this.common.mainData.next({ header: 'Update Registration', treeView: 'liReception', subTreeView: '', menu: '' });
    this.isUpdating = false;
    this.destroy$ = new Subject();
    this.uuid = this.route.snapshot.paramMap.get('uuid');

    const data: Responses = this.route.snapshot.data['patientDetails'];
    if (data.details === null)
      this.router.navigate(['/reception/patients-list']);
    else {
      this.consultants.push(...data.cons);
      this.formGroup = new FormGroup({
        id: new FormControl({ value: data.details.id, disabled: true }),
        salutation: new FormControl(data.details.salutation),
        name: new FormControl(data.details.name, [
          Validators.required,
          Validators.pattern(/^[A-z]+/)
        ]),
        age: new FormControl(data.details.age, [
          Validators.required,
          Validators.maxLength(3)
        ]),
        gender: new FormControl(data.details.gender),
        contactNo: new FormControl(data.details.contact, [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(15),
          Validators.pattern(/^[\d|\+|\-]+$/)
        ]),
        email: new FormControl(data.details.email),
        dob: new FormControl(this.parseDate(data.details.dob)),
        address: new FormControl(data.details.address),
        consultant: new FormControl(data.details.cons, Validators.required),
      });
    };
  }

  private parseDate(date: string) {
    if (date === null)
      return null;
    return new Date(date);
  }

  setGender(): void {
    const data = this.formGroup.getRawValue();
    if (this.formGroup.get('salutation').value === 'Mr')
      this.formGroup.get('gender').patchValue('Male');
    else
      this.formGroup.get('gender').patchValue('Female');
  }

  updatePatientDetails(): void {
    if (this.formGroup.valid) {
      this.isUpdating = true;

      const data = this.formGroup.getRawValue();
      data.dob = data.dob === null ? null : formatDate(data.dob, 'yyyy-MM-dd', 'en_GB');

      this.http.patch(`${environment.normUrl}reception/update-patient/${this.uuid}`, data,
        {
          headers: { 'Content-Type': 'application/json' },
          responseType: 'text'
        })
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: next => this.toastr.success(next),
          complete: () => this.isUpdating = false
        });
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}

interface Inputs {
  id: number,
  salutation: string,
  name: string,
  age: string,
  gender: string,
  contact: string,
  email: string,
  dob: string,
  address: string,
  cons: string,
}

interface Responses {
  cons: Array<Consultant>,
  details: Inputs
}

interface Consultant {
  id: number,
  name: string
}
