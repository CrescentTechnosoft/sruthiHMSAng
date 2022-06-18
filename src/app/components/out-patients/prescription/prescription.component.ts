import { Component, OnInit, Renderer2, OnDestroy } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { PrescService } from './shared/presc.service';
import { ToastrService } from 'ngx-toastr';
import { Inputs, MedicineData, OPNo } from './shared/prescription.model';

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.scss'],
  providers: [PrescService]
})
export class PrescriptionComponent implements OnInit, OnDestroy {
  years: Array<string>;
  opNos: Array<OPNo>;
  prescNos: Array<OPNo>;
  inputs: Inputs;
  dosages: Array<string>;
  complaints: Array<string>;
  medicines: Array<MedicineData>;
  investigations: Array<string>;
  treatments: Array<string>;
  isSaving: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
  isEditable: boolean;

  constructor(private common: CommonService, private service: PrescService, private renderer2: Renderer2, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.common.mainData.next({ header: 'Prescription', treeView: 'liOutPatients', subTreeView: '', menu: 'liPrescription' });
    this.isSaving = false;
    this.isEditable = false;
    this.isUpdating = false;
    this.isDeleting = false;
    this.years = [];
    this.opNos = [];
    this.prescNos = [];
    this.medicines = [];
    this.investigations = [];
    this.treatments = [];
    this.complaints = [];
    this.inputs = this.service.GetInputs();
    this.dosages = ['1-1-1', '1-0-1', '1-1-0', '0-1-1', '1-0-0', '0-1-0', '0-0-1'];

    this.service.startAll();
    this.service.GetAll()
      .toPromise()
      .then(d => {
        this.years.push(...d.years);
        this.opNos.push(...d.opNos);
        this.service.medicines.push(...d.medicines);
        this.service.investigations.push(...d.investigations);
        this.service.treatments.push(...d.treatments);
        this.service.complaints.push(...d.complaints);

        if (this.years.length > 0)
          this.inputs.year = this.years[0];
      });
  }

  getOPNos(): void {
    this.inputs.id = '';
    if (this.inputs.year !== '') {
      this.service.getOPNos(this.inputs.year)
        .toPromise()
        .then(d => this.opNos = d);
    }
    else
      this.opNos = [];
  }

  getObservationDetails(): void {
    if (this.inputs.year !== '' && this.inputs.id !== '') {
      this.service.getObservationDetails(this.inputs.id)
        .toPromise()
        .then(d => {
          for (let obj in d.data) {
            if ((typeof this.inputs[obj]) !== 'undefined') {
              this.inputs[obj] = d.data[obj];
            }
          }
          this.inputs.ptId = d.data.pt_id;
        });
    }
  }

  focusElement(event: KeyboardEvent, elem: string): void {
    if (event.key === 'Enter') {
      this.renderer2.selectRootElement('.' + elem, true).focus();
    }
  }

  addComplaints(event: KeyboardEvent, value: string) {
    if (event.key === 'Enter' && value !== '' && this.complaints.includes(value) === false) {
      this.complaints.push(value);
      this.inputs.complaint = '';
    }
  }

  removeComplaint(index: number): void {
    this.complaints.splice(index, 1);
  }

  AddMedicine(event: CustomKeyboardEvent): void {
    if (event.key === 'Enter' && event.target.value !== '') {
      const dos = this.inputs.dosage.split('-');
      this.medicines.push(
        {
          medicine: this.inputs.medicine,
          type: this.inputs.fType,
          dosage: this.inputs.dosage,
          period: this.inputs.period,
          days: this.inputs.days ?? 0
        }
      );
      this.inputs.medicine = '';
      this.inputs.fType = 'AF';
      this.inputs.dosage = '1-1-1';
      this.inputs.period = '';
      this.inputs.days = null;
      this.renderer2.selectRootElement('#txtMedicine').focus();
    }
  }

  RemoveMedicine(index: number): void {
    this.medicines.splice(index, 1);
  }

  addInvestigation(event: CustomKeyboardEvent): void {
    if (event.key === 'Enter' && event.target.value !== '') {
      if (!this.investigations.includes(event.target.value)) {
        this.investigations.push(event.target.value);
        this.renderer2.selectRootElement('#txtInvestigation').value = '';
      }
    }
  }

  removeInvestigation(ind: number): void {
    this.investigations.splice(ind, 1);
  }

  addTreatment(event: CustomKeyboardEvent): void {
    if (event.key === 'Enter' && event.target.value !== '') {
      if (!this.treatments.includes(event.target.value)) {
        this.treatments.push(event.target.value);
        this.inputs.treatment = '';
      }
    }
  }

  removeTreatment(ind: number): void {
    this.treatments.splice(ind, 1);
  }

  savePrescription(): void {
    if (this.inputs.year === '')
      this.toastr.error('Select the Year');
    else if (this.inputs.id === '')
      this.toastr.error('Select the OP No');
    else {
      this.isSaving = true;
      this.service.savePrescription(
        {
          data: this.inputs,
          complaints: this.complaints,
          medicines: this.medicines,
          investigations: this.investigations,
          treatments: this.treatments
        })
        .toPromise()
        .then(d => {
          const id = this.inputs.id;
          this.clearPage();
          this.common.triggerSwal('Do you want to Print Prescription?', 'Print', d, 'success', '#2fb926')
            .then(swal => {
              if (swal.isConfirmed) {
                this.common.printPage('prescription/' + id);
              }
            });
        })
        .finally(() => this.isSaving = false);
    }
  }

  view(): void {
    this.isEditable = true;
    if (this.years.length > 0) {
      this.inputs.prYear = this.years[0]
      this.getPrescNos();
    }
  }

  getPrescNos(): void {
    this.inputs.prId = '';
    if (this.inputs.prYear !== '') {
      this.service.getPrescNos(this.inputs.prYear)
        .toPromise()
        .then(d => {
          this.prescNos.splice(0, this.prescNos.length, ...d);
        });
    }
    else {
      this.prescNos.splice(0, this.prescNos.length);
    }
  }

  getPrescriptions(): void {
    if (this.inputs.prYear !== '' && this.inputs.prId !== '') {
      this.service.getPrescriptions(this.inputs.prId)
        .toPromise()
        .then(d => {
          this.inputs.ptId = d.data.pt_id;
          this.inputs.name = d.data.name;
          this.inputs.age = d.data.age;
          this.inputs.gender = d.data.gender;
          this.inputs.consultant = d.data.consultant;
          this.inputs.height = d.data.height;
          this.inputs.weight = d.data.weight;
          this.inputs.bsa = d.data.bsa;
          this.inputs.bp = d.data.bp;
          this.inputs.pulse = d.data.pulse;
          this.inputs.status = d.data.status;
          this.inputs.opinion = d.data.opinion;
          this.inputs.patientInfo = d.data.patient_info;
          this.inputs.diagnosis = d.data.diagnosis;

          this.complaints.splice(0, this.complaints.length, ...d.complaints);
          this.medicines.splice(0, this.medicines.length, ...d.medicineDatas);
          this.investigations.splice(0, this.investigations.length, ...d.investigations);
          this.treatments.splice(0, this.treatments.length, ...d.treatments);
        });
    }
  }

  updatePrescription(): void {
    if (this.inputs.prYear === '')
      this.toastr.error('Select the Year');
    else if (this.inputs.prId === '')
      this.toastr.error('Select the OP No');
    else {
      this.isSaving = true;
      this.service.updatePrescription(this.inputs.prId,
        {
          data: this.inputs,
          complaints: this.complaints,
          medicines: this.medicines,
          investigations: this.investigations,
          treatments: this.treatments
        })
        .toPromise()
        .then(d => {
          this.toastr.success(d);
        })
        .finally(() => this.isSaving = false);
    }
  }

  deletePrescription(): void {
    if (this.inputs.prYear === '')
      this.toastr.error('Select the Year');
    else if (this.inputs.prId === '')
      this.toastr.error('Select the OP No');
    else {
      this.common.triggerSwal('Do you want to Delete Prescription?')
        .then(swal => {
          if (swal.isConfirmed) {
            this.isDeleting = true;
            this.service.deletePrescription(this.inputs.prId)
              .toPromise()
              .then(d => {
                this.toastr.success(d);
                this.clearPage();
              })
              .finally(() => this.isDeleting = false);
          }
        });
    }
  }

  printPrescription(): void {
    if (this.inputs.prYear === '')
      this.toastr.error('Select the Year');
    else if (this.inputs.prId === '')
      this.toastr.error('Select the OP No');
    else {
      this.common.printPage('prescription/' + this.inputs.prId);
    }
  }

  clearPage(): void {
    for (let obj in this.inputs)
      this.inputs[obj] = '';
    this.inputs.days = null;
    this.isSaving = false;
    this.isEditable = false;
    this.isUpdating = false;
    this.isDeleting = false;
    this.inputs.fType = 'AF';
    this.inputs.dosage = '1-1-1';

    if (this.years.length > 0) {
      this.inputs.year = this.years[0];
      this.getOPNos();
    }

    this.medicines.length = this.investigations.length = this.treatments.length = 0;
  }

  createTreatment(): void {
    if (this.inputs.treatment !== '' && !this.service.treatments.includes(this.inputs.treatment)) {
      this.service.createTreatment(this.inputs.treatment)
        .toPromise()
        .then(d => {
          this.service.treatments.push(this.inputs.treatment);
          this.toastr.success(d);
        });
    }
  }

  deleteTreatment(): void {
    if (this.service.treatments.includes(this.inputs.treatment)) {
      this.service.deleteTreatment(this.inputs.treatment)
        .toPromise()
        .then(d => {
          const index = this.service.treatments.findIndex(f => f === this.inputs.treatment);
          this.service.treatments.splice(index, 1);
          this.inputs.treatment = '';
          this.toastr.success(d);
        });
    }
  }

  createComplaint(): void {
    if (this.inputs.complaint !== '' && this.service.complaints.includes(this.inputs.complaint) === false) {
      this.service.createComplaint(this.inputs.complaint)
        .toPromise()
        .then(d => {
          this.service.complaints.push(this.inputs.complaint);
          this.toastr.success(d);
        });
    }
  }

  deleteComplaint(): void {
    if (this.service.complaints.includes(this.inputs.complaint)) {
      this.service.deleteComplaint(this.inputs.complaint)
        .toPromise()
        .then(d => {
          const index = this.service.complaints.findIndex(f => f === this.inputs.complaint);
          this.service.complaints.splice(index, 1);
          this.inputs.complaint = '';
          this.toastr.success(d);
        });
    }
  }

  ngOnDestroy() {
    $('#txtMedicine,#txtInvestigation,#txtTreatment,#txtComplaints').autocomplete('destroy');
  }
}
