import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { formatDate } from '@angular/common';
import { CommonService } from 'src/app/services/common.service';
import { AppointmentService } from './shared/appointment.service';
import { Inputs, Appointments, Timings, Consultant, Patients } from './shared/appointments.model';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-appointment-fixing',
  templateUrl: './appointment-fixing.component.html',
  styleUrls: ['./appointment-fixing.component.scss'],
  providers: [AppointmentService]
})
export class AppointmentFixingComponent implements OnInit {
  public consultants: Array<Consultant>;
  public inputs: Inputs;
  public ids: Array<number>;
  public appointments: Array<Appointments>;
  public timings: Array<Timings>;
  public today: string;
  public patients: Array<Patients>;
  @ViewChild('patientsTemplate') patientsTemplate: TemplateRef<ViewChild>;

  constructor(private common: CommonService, private service: AppointmentService, private toastr: ToastrService, private dialog: MatDialog) { }

  public ngOnInit(): void {
    this.common.mainData.next({ header: 'Appointments', treeView: 'liReception', subTreeView: '', menu: 'liAppointments' });
    this.consultants = []; this.ids = [];
    this.appointments = []; this.timings = [];
    this.patients = [];
    this.today = formatDate(new Date, 'y-MM-dd', 'en-IN');
    this.inputs = { search: '', type: 'Old', txtID: '0', id: '', name: '', contact: '', consultant: '', date: '', time: '' }

    this.service.getStart()
      .toPromise()
      .then(d => {
        this.consultants = d.consultants;
        this.ids = d.ids;
      });
  }

  public searchPatients(event: KeyboardEvent, value: string): void {
    if (event.key === 'Enter' && value !== '') {
      this.service.searchPatients(value)
        .toPromise()
        .then(d => {
          if (d.length > 0) {
            this.patients.length = 0;
            d.forEach(elem => this.patients.push(elem));
            this.dialog.open(this.patientsTemplate);
          }
          else {
            this.toastr.info('No Patients found!!!');
          }
        });
    }
  }

  public closeDialog() {
    this.dialog.closeAll();
  }

  public setPatientID(id: string) {
    if (this.ids.includes(parseInt(id)) === false)
      this.ids.push(parseInt(id));
    this.inputs.id = id;
    this.getPatientDetails();
    this.dialog.closeAll();
    this.inputs.search = '';
  }

  public getPatientDetails(): void {
    if (this.inputs.id !== '') {
      this.service.getPatientDetails(this.inputs.id)
        .toPromise()
        .then(d => {
          this.inputs.name = d.name;
          this.inputs.contact = d.contact;
        });
    }
  }

  public getDoctorAppointments(): void {
    if (this.inputs.consultant !== '') {
      this.service.getDoctorAppointments(this.inputs.consultant)
        .toPromise()
        .then(d => {
          this.timings = d.timings;
          this.appointments = d.appointments;
        });
    }
    else {
      this.timings.length = 0;
      this.appointments.length = 0;
    }
  }

  private getSelectedDay(): string {
    const dayNames: Array<string> = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayIndex: number = (new Date(this.inputs.date)).getDay();
    return dayNames[dayIndex];
  }

  private isDateExists(): boolean {
    const dayName = this.getSelectedDay();
    return this.timings.findIndex(elem => elem.day === dayName) > -1;
  }


  private isTimeExists(): boolean {
    const dayName = this.getSelectedDay();
    const times: Array<Timings> = this.timings.filter(elem => elem.day === dayName);

    let isSuccess = false;
    const selectedTime = this.service.getNumberFromTimeString(this.inputs.time);
    times.forEach(elem => {
      const start = this.service.getNumberFromTimeString(elem.start);
      const end = this.service.getNumberFromTimeString(elem.end);
      if (selectedTime >= start && selectedTime <= end)
        isSuccess = true;
    });

    return isSuccess;
  }

  private isAppointmentTimeEnded(): boolean {
    return (new Date) > (new Date(this.inputs.date + ' ' + this.inputs.time));
  }

  private isAppointmentExists(): boolean {
    const date = new Date(this.inputs.date + ' ' + this.inputs.time);
    const formattedDate = formatDate(date, 'y-MM-dd HH:mm:ss', 'en-IN');
    return this.appointments.findIndex(elem => elem.date === formattedDate) > -1;

  }

  private validateAppointment(): boolean {
    let isValidated = false;

    if (this.inputs.type === 'Old' && this.inputs.id === '')
      this.toastr.error('Select the Patient ID');
    else if (this.inputs.name === '')
      this.toastr.error('Enter the Patient Name');
    else if (this.inputs.contact === '')
      this.toastr.error('Enter the Contact No');
    else if (this.inputs.consultant === '') {
      this.toastr.error('Select the Doctor\'s Name');
    } else if (this.inputs.date === '') {
      this.toastr.error('Select the Appointment Date');
    } else if (this.inputs.time === '') {
      this.toastr.error('Select the Appointment Time');
    } else if (this.isDateExists() === false) {
      this.toastr.error('Doctor is not available on the Selected Day');
    } else if (this.isTimeExists() === false) {
      this.toastr.error('Doctor is not Available on the Selected Time');
    } else if (this.isAppointmentTimeEnded()) {
      this.toastr.error('Appointment Time is Ended');
    } else if (this.isAppointmentExists()) {
      this.toastr.error('An appointment is already Exists for the Select date and time');
    } else {
      isValidated = true;
    }


    return isValidated;
  }

  public addAppointment(): void {
    if (this.validateAppointment()) {
      this.service.addAppointment(this.inputs)
        .toPromise()
        .then(d => {
          this.clearPage();
          this.toastr.success(d.message);
        });
    }
  }

  public cancelAppointment(id: number, index: number) {
    this.common.triggerSwal('Do you want to Cancel this Appointment?', 'yes, Cancel it')
      .then(swal => {
        if (swal.isConfirmed) {
          this.service.cancelAppointment(id)
            .toPromise()
            .then(d => {
              this.appointments.splice(index, 1);
              this.toastr.success(d);
            });
        }
      });
  }

  private clearPage(): void {
    for (let obj in this.inputs) {
      this.inputs[obj] = '';
    }

    this.inputs.type = 'Old';
    this.inputs.txtID = '0';
    this.appointments.length = 0;
    this.timings.length = 0;

  }
}
