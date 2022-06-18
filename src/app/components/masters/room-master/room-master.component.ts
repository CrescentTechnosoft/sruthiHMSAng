import { Component, OnInit } from '@angular/core';
import { RoomService } from './shared/room.service';
import { Inputs } from './shared/room.model';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-room-master',
  templateUrl: './room-master.component.html',
  styleUrls: ['./room-master.component.scss'],
  providers: [RoomService]
})
export class RoomMasterComponent implements OnInit {
  editMode: boolean;
  isSaving: boolean;
  isUpdating: boolean;
  selectedRow: number;
  rooms: Array<Inputs>;
  inputs: Inputs;

  constructor(private service: RoomService, private toastr: ToastrService, private common: CommonService) { }

  ngOnInit(): void {
    this.common.mainData.next({ header: 'Room Master', treeView: 'liMasters', subTreeView: '', menu: 'liRoomMaster' });
    this.editMode = this.isSaving = this.isUpdating = false;
    this.selectedRow = -1;
    this.rooms = [];
    this.inputs = this.service.getInputs();
    this.service.getRooms()
      .toPromise()
      .then(d => {
        this.rooms.push(...d);
      });
  }

  private validateInputs(): boolean {
    let result = false;
    if (this.inputs.floor === '')
      this.toastr.error('Enter the Floor Name');
    else if (this.inputs.ward === '')
      this.toastr.error('Enter the Ward Name');
    else if (this.inputs.room === '')
      this.toastr.error('Enter the Room Name');
    else if (this.inputs.bedNo === '')
      this.toastr.error('Enter the Bed No');
    else if (Number(this.inputs.rent) < 0)
      this.toastr.error('Enter the Rent');
    else result = true;

    return result;
  }

  save(): void {
    if (this.validateInputs()) {
      this.isSaving = true;
      this.service.save(this.inputs)
        .toPromise()
        .then(d => {
          this.rooms.push({ id: d.id, floor: this.inputs.floor, ward: this.inputs.ward, room: this.inputs.room, bedNo: this.inputs.bedNo, rent: this.inputs.rent, occupied: false });
          this.clearPage();
          this.toastr.success(d.message);
        })
        .finally(() => this.isSaving = false);
    }
  }

  getUpdateValues(index: number): void {
    this.editMode = true;
    this.selectedRow = index;
    const row = this.rooms[index];
    this.inputs.id = Number(row.id);
    this.inputs.floor = row.floor;
    this.inputs.ward = row.ward;
    this.inputs.room = row.room;
    this.inputs.bedNo = row.bedNo;
    this.inputs.rent = Number(row.rent);
  }

  update(): void {
    if (this.validateInputs()) {
      this.isUpdating = true;
      this.service.update(this.inputs)
        .toPromise()
        .then(d => {
          const row = this.rooms[this.selectedRow];
          row.floor = this.inputs.floor;
          row.ward = this.inputs.ward;
          row.room = this.inputs.room;
          row.bedNo = this.inputs.bedNo;
          row.rent = this.inputs.rent;
          this.clearPage();
          this.toastr.success(d);
        })
        .finally(() => this.isUpdating = false);
    }
  }

  deleteRoom(id: number, index: number): void {
    this.common.triggerSwal('Do you want to Delete this Room???')
      .then(swal => {
        if (swal.isConfirmed) {
          this.service.deleteRoom(id)
            .toPromise()
            .then(d => {
              this.rooms.splice(index, 1);
              this.clearPage();
              this.toastr.success(d);
            });
        }
      });
  }

  clearPage(): void {
    for (let obj in this.inputs) {
      this.inputs[obj] = (typeof this.inputs[obj]) === 'number' ? 0 : '';
    }
    this.editMode = this.isSaving = this.isUpdating = false;
    this.selectedRow = -1;
  }
}
