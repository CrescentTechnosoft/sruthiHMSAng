import { Component, OnInit, } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { DoctorTimingService } from './doc-timing.service';
import { Inputs, ITimings, Doctor } from './doctor-timing-model';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-doctor-timings',
  templateUrl: './doctor-timings.component.html',
  styleUrls: ['./doctor-timings.component.scss'],
  providers: [DoctorTimingService],
})
export class DoctorTimingsComponent implements OnInit {
  doctors$: Observable<Doctor[]>;
  inputs: Inputs;
  timings: Array<ITimings>;

  constructor(
    private common: CommonService,
    private service: DoctorTimingService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.common.mainData.next({ header: 'Doctor Timings', treeView: 'liMasters', subTreeView: '', menu: 'liDocTiming' });
    ; this.timings = [];
    this.inputs = { doctor: '', day: '', start: '', end: '' };

    this.doctors$ = this.service.getConsultants();
  }

  getTimings(): void {
    if (this.inputs.doctor === '')
      this.timings.length = 0;
    else {
      this.service.getTimings(this.inputs.doctor)
        .toPromise()
        .then(d => {
          this.timings.splice(0, this.timings.length, ...d);
        });
    }
  }

  private convertTimeToNumber(time: string) {
    let timeValue = parseInt(time.replace(/\D/gi, ''))
    let value = 0;
    if (time.includes('PM') && timeValue < 1200)
      value = 1200;

    if (time.includes('AM') && timeValue >= 1200 && timeValue <= 1259)
      timeValue -= 1200;

    return value + timeValue;
  }

  addTiming() {
    if (this.inputs.day === '')
      this.toastr.error('Select the Day!!');
    else if (this.inputs.start === '')
      this.toastr.error('Select the Start Time');
    else if (this.inputs.end === '')
      this.toastr.error('Select the End Time');
    else if (this.inputs.start === this.inputs.end)
      this.toastr.error('Start time and End Time Cannot be Same');
    else if (this.convertTimeToNumber(this.inputs.start) > this.convertTimeToNumber(this.inputs.end))
      this.toastr.error('Start time is Greater than End Time');
    else {
      this.timings.push({ day: this.inputs.day, start: this.inputs.start, end: this.inputs.end });
    }
  }

  removeTiming(index: number): void {
    this.timings.splice(index, 1);
  }

  saveTimings(): void {
    if (this.inputs.doctor === '')
      this.toastr.error('Select the Doctor\'s Name');
    else if (this.timings.length === 0)
      this.toastr.error('No Timings were Added');
    else {
      this.service.saveTimings(this.inputs.doctor, this.timings)
        .toPromise()
        .then(d => {
          this.toastr.success(d);
          this.clearPage();
        });
    }
  }

  clearPage() {
    for (let obj in this.inputs)
      this.inputs[obj] = '';
    this.timings = [];
  }

}
