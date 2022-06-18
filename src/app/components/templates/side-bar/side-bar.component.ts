import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  // styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent implements OnInit {
  loginUserName: string;
  allowed: Allowed;
  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.loginUserName = localStorage.getItem('user') ?? '';
    const access = this.auth.getAccessDatas();
    this.allowed = {
      testMaster: access.includes("Test Master"),
      groupTestMaster: access.includes("Group Test Master"),
      profileMaster: access.includes("Profile Master"),
      doctorMaster: access.includes("Doctor Master"),
      doctorTiming: access.includes("Doctor Timing"),
      feesMaster: access.includes('Fees Master'),
      techMaster: access.includes("Technician Master"),
      roomMaster: access.includes("Room Master"),
      userMaster: access.includes("User Master"),
      userAccess: access.includes("User Access"),

      registration: access.includes("Patient Registration"),
      patientsList: access.includes("Patient List"),
      appointments: access.includes("Appointments"),

      opRegistration: access.includes("OP Registration"),
      prescription: access.includes("Prescription"),

      opBilling: access.includes("OP Billing"),
      ipAdvance: access.includes("IP Advance"),
      ipBilling: access.includes("IP Billing"),

      opLab:access.includes("OP Lab"),
      ipLab:access.includes("IP Lab"),

      ipAdmission:access.includes("Admission"),
      ipTreatment:access.includes("Treatment"),
      ipHistory:access.includes("History"),
      wardStatus:access.includes("Ward Status"),
      wardShifting:access.includes("Ward Shifting"),
      ipDischarge:access.includes("Discharge"),

      reports:access.includes("Reports")
    }
    this.auth = null;
  }

}

interface Allowed {
  testMaster: boolean;
  groupTestMaster: boolean,
  profileMaster: boolean,
  doctorMaster: boolean,
  doctorTiming: boolean,
  feesMaster: boolean,
  techMaster: boolean,
  roomMaster: boolean,
  userMaster: boolean,
  userAccess: boolean,

  registration: boolean,
  patientsList: boolean,
  appointments: boolean,

  opRegistration: boolean,
  prescription: boolean,

  opBilling: boolean,
  ipAdvance: boolean,
  ipBilling: boolean,

  opLab: boolean,
  ipLab:boolean,

  ipAdmission:boolean,
  ipTreatment:boolean,
  ipHistory:boolean,
  wardStatus:boolean,
  wardShifting:boolean,
  ipDischarge:boolean,

  reports:boolean
}
