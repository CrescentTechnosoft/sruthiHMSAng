import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { FeedbackService, Inputs } from './Service/feedback.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-op-feedback',
  templateUrl: './op-feedback.component.html',
  styleUrls: ['./op-feedback.component.scss'],
  providers: [FeedbackService]
})
export class OpFeedbackComponent implements OnInit, OnDestroy {
  inputs: Inputs;
  ids: Array<number>;
  bills: Array<string>;

  constructor(private common: CommonService, private service: FeedbackService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.common.mainData.next({ header: 'OP Feedback', treeView: 'liCashCounter',subTreeView:'', menu: 'liOPFeedback' });
    this.inputs = this.service.GetInputs();
    this.ids = this.bills = [];
    this.GetIDs();
    $('#feesList').menu();
  }

  changeFeedBack(feedback: string): void {
    this.inputs.feedback = feedback;
  }

  GetIDs() {
    this.ids = [];
    if (this.inputs.date !== '') {
      this.service.GetIDs(this.inputs.date)
        .toPromise()
        .then(d => this.ids = d);
    }
  }

  GetPatientDetails() {
    if (this.inputs.id !== '') {
      this.service.GetPatientDetails(this.inputs.date, this.inputs.id)
        .toPromise()
        .then(d => {
          this.bills = d.bills;
          for (let obj in d.data)
            this.inputs[obj] = d.data[obj];
        });
    }
  }

  Add(): void {
    if (this.inputs.date === '')
      this.toastr.error('Select the Date!!!');
    else if (this.inputs.id === '')
      this.toastr.error('Select the Patient ID!!!');
    else {
      this.service.Add(JSON.stringify(this.inputs))
        .toPromise()
        .then(d => {
          this.toastr.success(d);
          this.ClearPage();
        });
    }
  }

  Remove(): void {
    if (this.inputs.date === '')
      this.toastr.error('Select the Date!!!');
    else if (this.inputs.id === '')
      this.toastr.error('Select the Patient ID!!!');
    else {
      this.service.Remove(this.inputs.date, this.inputs.id)
        .toPromise()
        .then(d => {
          this.toastr.success(d);
          this.ClearPage();
        });
    }
  }

  ClearPage() {
    const date=this.inputs.date;
    for (let obj in this.inputs)
      this.inputs[obj] = '';
      this.inputs.isSaved=false;
    this.inputs.date = date;
    this.inputs.feedback = 'Nothing';
    this.bills = [];
    this.GetIDs();
  }

  ngOnDestroy() {
    $('#feesList').menu('destroy');
  }
}
