import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { OPRegService } from './shared/opreg.service';
import { Inputs, Consultant ,Registration} from './shared/opregistration.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-op-registration',
  templateUrl: './op-registration.component.html',
  styleUrls: ['./op-registration.component.scss'],
  providers: [OPRegService]
})
export class OPRegistrationComponent implements OnInit {
  ids: Array<Registration>;
  consultants: Array<Consultant>;
  inputs: Inputs;
  years: Array<string>;
  opNos: Array<number>;
  editMode: boolean;
  isSaving: boolean;
  isUpdating: boolean;
  isDeleting: boolean;

  constructor(private common: CommonService, private service: OPRegService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.common.mainData.next({ header: 'OP Registration', treeView: 'liOutPatients', subTreeView: '', menu: 'liOPRegistration' });
    this.editMode = this.isSaving = this.isUpdating = this.isDeleting = false;
    this.ids = []; this.consultants = []; this.years = []; this.opNos = [];
    this.inputs = this.service.getInputs();

    this.service.getStart()
      .toPromise()
      .then(d => {
        this.ids = d.ids;
        console.log(d.ids);
        this.consultants = d.consultants;
      });
  }

  getPatientDetails(): void {
    if (this.inputs.ptid !== '') {
      this.service.getPatientDetails(this.inputs.ptid)
        .toPromise()
        .then(d => {
          for (let obj in d)
            this.inputs[obj] = d[obj];
        });
    }
  }

  save(): void {
    if (this.inputs.ptid === '')
      this.toastr.error('Select the Patient ID');
    else {
      this.isSaving = true;
      this.service.save(this.inputs)
        .toPromise()
        .then(d => {
          this.toastr.success(d);
          this.clearPage();
        })
        .finally(() => this.isSaving = false);
    }
  }

  view(): void {
    this.editMode = true;
    this.inputs.opNo = '';

    this.service.getYears()
      .toPromise()
      .then(d => {
        this.years = d.years;
        this.opNos = d.opNos;

        if (this.years.length > 0)
          this.inputs.year = d.years[0];
      });
  }

  getOPNos(): void {
    this.inputs.opNo = '';
    if (this.inputs.year !== '') {
      this.service.getOPNos(this.inputs.year)
        .toPromise()
        .then(d => this.opNos = d);
    }
    else {
      this.opNos.splice(0, this.opNos.length);
    }
  }

  GetObservationDetails(): void {
    if (this.inputs.year !== '' && this.inputs.opNo !== '') {
      this.service.GetObservationDetails(this.inputs.year, this.inputs.opNo)
        .toPromise()
        .then(d => {
          // if (!this.ids.includes(d.ptid))
          //   this.ids.push(d.ptid);

          for (let obj in d)
            this.inputs[obj] = d[obj];
        });
    }
  }

  update(): void {
    if (this.inputs.year === '')
      this.toastr.error('Select the Year');
    else if (this.inputs.opNo === '')
      this.toastr.error('Select the OP No');
    else {
      this.isUpdating = true;
      this.service.update(this.inputs)
        .toPromise()
        .then(d => this.toastr.success(d))
        .finally(() => this.isUpdating = false);
    }
  }

  deleteObs(): void {
    if (this.inputs.year === '')
      this.toastr.error('Select the Year');
    else if (this.inputs.opNo === '')
      this.toastr.error('Select the OP No');
    else {
      this.common.triggerSwal('Do you want to Delete this Data?')
        .then(swal => {
          if (swal.isConfirmed) {
            this.isDeleting = true;
            this.service.deleteObs(this.inputs.id)
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

  clearPage(): void {
    this.editMode = this.isSaving = this.isUpdating = this.isDeleting = false;
    for (let obj in this.inputs)
      this.inputs[obj] = '';

    this.service.getIDs()
      .toPromise()
      .then(d => this.ids = d);
  }

}
