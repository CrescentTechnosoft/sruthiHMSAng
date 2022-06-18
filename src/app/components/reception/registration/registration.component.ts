import { Component, OnInit, ViewChild, OnDestroy, TemplateRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/services/common.service';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { formatDate } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { Consultant } from './shared/registration.model';
import { RegistrationService } from './shared/registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  providers: [RegistrationService]
})
export class RegistrationComponent implements OnInit, OnDestroy {
  doctors$: Observable<Consultant[]>;
  formGroup: FormGroup;
  successMessage: string;
  destroy$: Subject<void>;
  saving: boolean;
  patientId: number;

  @ViewChild('form') form: NgForm;
  @ViewChild('successTemplate') successTemplate: TemplateRef<ViewChild>;

  constructor(
    private toastr: ToastrService,
    private common: CommonService,
    private loader: NgxUiLoaderService,
    private router: Router,
    private dialog: MatDialog,
    private service: RegistrationService
  ) { }

  ngOnInit(): void {
    this.common.mainData.next({ header: 'Registration', treeView: 'liReception', subTreeView: '', menu: 'liRegistration' });
    this.successMessage = 'Registration success. Patient ID is 2';
    this.destroy$ = new Subject<void>();
    this.saving = false;
    this.patientId = 0;
    this.formGroup = new FormGroup({
      salutation: new FormControl('Mr'),
      name: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[A-z]+/)
      ]),
      age: new FormControl('', [
        Validators.required,
        Validators.maxLength(3)
      ]),
      gender: new FormControl('Male'),
      contactNo: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(15),
        Validators.pattern(/^[\d|\+|\-]+$/)
      ]),
      email: new FormControl(''),
      dob: new FormControl(null),
      address: new FormControl(''),
      consultant: new FormControl('', Validators.required),
    });
    this.doctors$ = this.service.getConsultants();
  }

  setGender(): void {
    const data = this.formGroup.getRawValue();
    if (this.formGroup.get('salutation').value === 'Mr')
      this.formGroup.get('gender').patchValue('Male');
    else
      this.formGroup.get('gender').patchValue('Female');
  }

  saveRegistration() {
    if (this.formGroup.valid) {
      this.loader.startBackground('save');
      const data = this.formGroup.getRawValue();
      data.dob = data.dob === null ? null : formatDate(data.dob, 'yyyy-MM-dd', 'en_GB');
      this.saving = true;
      this.service.saveRegistration(data)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            if (response.status) {
              this.successMessage = 'Registration Success. Patient ID is ' + response.id;
              this.patientId = response.id;
              this.clearValues();
              this.dialog.open(this.successTemplate, { disableClose: true });
            }
            else {
              this.toastr.info(response.message);
            }
          },
          complete: () => { this.loader.stopBackground('save'); this.saving = false; }
        });
    }
  }

  printRegistration(): void {
    this.service.getPrintValue(this.patientId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.common.printBase64(response);
        }
      });
  }

  goToPage(page: string): void {
    const urls = { bill: 'cash-counter/op-billing', admission: 'ip-process/admission' };
    this.dialog.closeAll();
    localStorage.setItem('PID', this.patientId.toString());
    this.router.navigateByUrl(urls[page]);
  }

  clearValues() {
    this.formGroup.reset('');
    this.form.resetForm('');
    this.formGroup.patchValue({
      salutation: 'Mr',
      gender: 'Male'
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

