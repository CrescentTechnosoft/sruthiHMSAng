import { Component, OnInit, OnDestroy, ViewChild, TemplateRef } from '@angular/core';
import { AdmissionService } from './shared/admission.service';
import { Room, Input, Patient, Doctor, IPNo } from './shared/admission.model';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/services/common.service';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-admission',
  templateUrl: './admission.component.html',
  styleUrls: ['./admission.component.scss'],
  providers: [AdmissionService]
})

export class AdmissionComponent implements OnInit, OnDestroy {
  editMode: boolean;
  pidList: number[];
  searchList: Array<Patient>;
  years: string[];
  ipNos: IPNo[];
  insCats: Array<string>;
  consList: Doctor[];
  specsList: string[];
  rooms: Array<Room>;
  inputs: Input;
  isSaving: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
  destroy$: Subject<void>;

  @ViewChild('patientsDialog') patientsDialog: TemplateRef<ViewChild>;

  constructor(
    private service: AdmissionService,
    private toastr: ToastrService,
    private common: CommonService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.common.mainData.next({ header: 'IP Admission', treeView: 'liIPProcess', subTreeView: '', menu: 'liAdmission' });
    this.editMode = this.isSaving = this.isUpdating = this.isDeleting = false;
    this.pidList = [];
    this.searchList = [];
    this.years = [];
    this.ipNos = [];
    this.consList = [];
    this.specsList = [];
    this.rooms = [];
    this.insCats = [];

    this.inputs = this.service.getInputs();
    this.destroy$ = new Subject<void>();
    this.service.loadFunctions();
    this.service.getStart()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: response => {
          this.pidList.push(...response.id);
          this.consList.push(...response.cons);
          this.specsList.push(...response.specs);
          this.insCats.push(...response.insCat);
          this.rooms.push(...response.rooms);

          const id = localStorage.getItem('PID');
          if (id !== null) {
            localStorage.removeItem('PID');
            if (!this.pidList.includes(parseInt(id)))
              this.pidList.push(parseInt(id));
            this.inputs.ddlID = id;
            this.getPatientDetails();
          }
        }
      });
  }

  searchPatients(evt: KeyboardEvent) {
    if (evt.code === 'Enter' && this.inputs.search !== '') {
      this.service.getPatientsList(this.inputs.search)
        .toPromise()
        .then((d) => {
          if (d.length > 0) {
            this.searchList.splice(0, this.searchList.length, ...d);
            this.dialog.open(this.patientsDialog);
          }
          else {
            this.toastr.info('No Patients Found');
          }
        });
    }
  }


  setPatientID(id: number) {
    if (!this.pidList.includes(id)) {
      this.pidList.push(id);
    }
    this.inputs.ddlID = `${id}`;
    this.searchList = [];
    this.dialog.closeAll();
    this.getPatientDetails();
  }

  getPatientDetails() {
    if (this.inputs.ddlID !== '') {
      this.service.getPatientDetails(this.inputs.ddlID)
        .toPromise()
        .then((d) => {
          for (let obj in d)
            this.inputs[obj] = d[obj];
        });
    }
  }

  setSelectedRoom(id: number) {
    this.inputs.room = Number(id);
  }

  saveAdmission(): void {
    if (this.inputs.ddlID === '')
      this.toastr.error('Select the Patient ID');
    else if (this.inputs.ref === '')
      this.toastr.error('Select the Referal Doctor');
    else if (this.inputs.department === '')
      this.toastr.error('Select the Department');
    else if (this.inputs.cons === '')
      this.toastr.error('Select the Consultant');
    else if (this.inputs.room === 0)
      this.toastr.error('Select the Room to Admit');
    else {
      this.isSaving = true;
      this.service.saveAdmission(this.inputs)
        .toPromise()
        .then(d => {
          //Checking for Room Status in Server while Saving
          if (d.status === false) {
            this.inputs.room = 0;
            this.toastr.error(d.message);
            this.service.getWards()
              .toPromise()
              .then(d => {
                this.rooms.splice(0, this.rooms.length, ...d);
              });
          }
          else {
            this.clearPage();
            Swal.fire({
              title: 'Patient Admitted',
              text: "IP No is " + d.ip_no,
              icon: 'success',
              showCancelButton: true,
              confirmButtonColor: '#d33',
              cancelButtonColor: '#3085d6',
              confirmButtonText: 'Generate Case Sheet',
              cancelButtonText: 'Close',
              allowOutsideClick: false
            }).then((result) => {
              if (result.isConfirmed) {
                this.common.printPage(`ip-admission/${d.ip_id}`);
              }
            });
          }
        }).finally(() => this.isSaving = false);
    }
  }

  view(): void {
    this.editMode = true;
    this.service.getYears()
      .toPromise()
      .then(d => {
        this.years.splice(0, this.years.length, ...d.years);
        this.ipNos.splice(0, this.ipNos.length, ...d.ipNos);
        this.inputs.ipNo = '';
        if (d.years.length > 0)
          this.inputs.year = d.years[0];
      });
  }

  getIPNos(): void {
    if (this.inputs.year !== '') {
      this.service.getIPNos(this.inputs.year)
        .toPromise()
        .then(d => {
          this.ipNos = d;
          this.inputs.ipNo = '';
        });
    }
    else
      this.ipNos = [];
  }

  getAdmissionDetails(): void {
    if (this.inputs.year !== '' && this.inputs.ipNo !== '') {
      this.service.getAdmissionDetails(this.inputs.ipNo)
        .toPromise()
        .then(d => {
          for (let obj in d) {
            this.inputs[obj] = d[obj];
          }
        });
    }
  }

  updateAdmission(): void {
    if (this.inputs.year === '')
      this.toastr.error('Select the Year to Update');
    else if (this.inputs.ipNo === '')
      this.toastr.error('Select the IP No to Update');
    else if (this.inputs.ref === '')
      this.toastr.error('Select the Referal Doctor');
    else if (this.inputs.department === '')
      this.toastr.error('Select the Department');
    else if (this.inputs.cons === '')
      this.toastr.error('Select the Consultant');
    else {
      this.isUpdating = true;
      this.service.updateAdmission(this.inputs)
        .toPromise()
        .then(d => this.toastr.success(d))
        .finally(() => this.isUpdating = false);
    }
  }

  deleteAdmission(): void {
    if (this.inputs.year === '')
      this.toastr.error('Select the Year to Delete');
    else if (this.inputs.ipNo === '')
      this.toastr.error('Select the IP No to Delete');
    else {
      Swal.fire({
        title: 'Confirmation',
        text: 'Do you want to Delete this Admission Details?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'yes, delete it',
        cancelButtonText: 'Close',
        allowOutsideClick: false
      }).then((result) => {
        if (result.isConfirmed) {
          this.isDeleting = true;
          this.service.deleteAdmission(this.inputs.ipNo)
            .toPromise()
            .then(d => {
              this.clearPage();
              this.toastr.success(d);
            })
            .finally(() => this.isDeleting = false);
        }
      });
    }
  }

  printPage(): void {
    if (this.inputs.year === '')
      this.toastr.error('Select the Year to Print');
    else if (this.inputs.ipNo === '')
      this.toastr.error('Select the IP No to Print');
    else {
      this.common.printPage(`ip-admission/${this.inputs.ipNo}`);
    }
  }

  clearPage(): void {
    this.editMode = this.isSaving = this.isUpdating = this.isDeleting = false;
    this.years = this.ipNos = this.searchList = [];

    for (let obj in this.inputs) {
      this.inputs[obj] = (typeof this.inputs[obj]) === 'number' ? 0 : '';
    }
    this.inputs.admType = 'RT';

    this.service.getRevertValues()
      .toPromise()
      .then(d => {
        this.pidList = d.id;
        this.inputs.ddlID = '';
        d.rooms.forEach(elem => elem.id = Number(elem.id));
        this.rooms = d.rooms;

      })
      .catch((e: ErrorEvent) => console.log(e.message));
  }

  addInsCategory() {
    if (this.inputs.insCat !== '' && !this.insCats.includes(this.inputs.insCat)) {
      this.service.addInsCategory(this.inputs.insCat)
        .toPromise()
        .then(d => {
          this.insCats.push(this.inputs.insCat);
          this.toastr.success(d);
        })
        .catch((e: ErrorEvent) => console.log(e.message));
    }
  }

  removeInsCategory() {
    if (this.insCats.includes(this.inputs.insCat)) {
      this.service.removeInsCategory(this.inputs.insCat)
        .toPromise()
        .then(d => {
          const index = this.insCats.findIndex(d => d === this.inputs.insCat);
          this.insCats.splice(index, 1);
          this.toastr.success(d);
          this.inputs.insCat = '';
        })
        .catch((e: ErrorEvent) => console.log(e.message));
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
