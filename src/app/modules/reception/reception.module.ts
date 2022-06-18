import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';

import { ReceptionRoutingModule } from './reception-routing.module';
import { UpdatePatientResolverService } from '../../services/resolvers/update-patient-resolver.service';

import { RegistrationComponent } from '../../components/reception/registration/registration.component';
import { PatientsListComponent } from '../../components/reception/patients-list/patients-list.component';
import { UpdatePatientComponent } from '../../components/reception/update-patient/update-patient.component';
import { AppointmentFixingComponent } from '../../components/reception/appointment-fixing/appointment-fixing.component';

@NgModule({
  declarations: [
    RegistrationComponent,
    PatientsListComponent,
    UpdatePatientComponent,
    AppointmentFixingComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ReceptionRoutingModule,
    NgxMaterialTimepickerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule
  ],
  providers:[
    {provide:MAT_DATE_LOCALE,useValue:'en-GB'},
    UpdatePatientResolverService
  ]
})
export class ReceptionModule { }
