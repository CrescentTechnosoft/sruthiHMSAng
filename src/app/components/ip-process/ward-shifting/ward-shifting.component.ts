import { Component, OnInit } from '@angular/core';
import { ShiftService } from './shared/shift.service';
import { Room, Input, IpNo } from './shared/shift.model';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-ward-shifting',
  templateUrl: './ward-shifting.component.html',
  styleUrls: ['./ward-shifting.component.scss'],
  providers: [ShiftService]
})
export class WardShiftingComponent implements OnInit {
  rooms: Array<Room>;
  years: Array<string>;
  ipNos: Array<IpNo>;
  inputs: Input;
  selectedRoom: number;
  isShifting: boolean;

  constructor(private service: ShiftService, private toastr: ToastrService, private common: CommonService) { }

  ngOnInit(): void {
    this.common.mainData.next({ header: 'Ward Shifting', treeView: 'liIPProcess', subTreeView: '', menu: 'liWardShifting' });
    this.inputs = { year: '', ipNo: '', ptId: 0, name: '', roomId: 0, ward: '', room: '', bed: '', rent: 0 };
    this.rooms = []; this.years = []; this.ipNos = [];
    this.selectedRoom = 0;
    this.isShifting = false;
    this.getAll();
  }

  private getAll() {
    this.years.length = this.ipNos.length = this.rooms.length = 0;
    this.service.getLoad()
      .toPromise()
      .then(d => {
        this.years.push(...d.years);
        if (d.years.length > 0)
          this.inputs.year = d.years[0];
        this.ipNos.push(...d.ipNos);
        this.rooms.push(...d.rooms);
      });
  }

  getIPNos() {
    this.ipNos.length = 0;
    if (this.inputs.year !== '') {
      this.service.getIPNos(this.inputs.year)
        .toPromise()
        .then(d => this.ipNos.push(...d));
    }
  }

  getPatientDetails(): void {
    if (this.inputs.year !== '' && this.inputs.ipNo !== '') {
      this.service.getPatientDetails(this.inputs.ipNo)
        .toPromise()
        .then(d => {
          this
          for (let obj in d)
            this.inputs[obj] = d[obj];
        });
    }
  }

  setSelectedRoom(id: number) {
    this.selectedRoom = id;
  }

  shiftWard(): void {
    if (this.inputs.year === '')
      this.toastr.error('Select thr Year');
    else if (this.inputs.ipNo === '')
      this.toastr.error('Select the IP No');
    else if (this.selectedRoom === 0)
      this.toastr.error('Select the Room to Shift');
    else {
      this.common.triggerSwal('Do you want to Shift Ward???')
        .then(swal => {
          if (swal.isConfirmed) {
            this.isShifting = true;
            this.service.shiftWard(this.inputs, this.selectedRoom)
              .toPromise()
              .then(d => {
                if (d.status === false) {
                  this.toastr.error(d.message);
                }
                else {
                  this.clearPage();
                  this.toastr.success(d.message);
                }
              })
              .finally(() => this.isShifting = false);
          }
        });
    }
  }

  clearPage(): void {
    this.selectedRoom = 0;
    this.isShifting = false;
    for (let obj in this.inputs)
      this.inputs[obj] = '';
    this.inputs.rent = 0;
    this.getAll();
  }
}
