import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { OutPatientRoutingModule } from './out-patient-routing.module';
import { OPRegistrationComponent } from '../../components/out-patients/op-registration/op-registration.component';
import { PrescriptionComponent } from '../../components/out-patients/prescription/prescription.component';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    OPRegistrationComponent,
    PrescriptionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    OutPatientRoutingModule
  ]
})
export class OutPatientModule { }
