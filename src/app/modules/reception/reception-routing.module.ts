import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrationComponent } from '../../components/reception/registration/registration.component';
import { PatientsListComponent } from '../../components/reception/patients-list/patients-list.component';
import { UpdatePatientComponent } from '../../components/reception/update-patient/update-patient.component';
import { AppointmentFixingComponent } from '../../components/reception/appointment-fixing/appointment-fixing.component';

import { UpdatePatientResolverService } from '../../services/resolvers/update-patient-resolver.service';

const routes: Routes = [
  {
    path: 'registration',
    component: RegistrationComponent,
    data: { page: 'Patient Registration' },
  },
  {
    path: 'patients-list',
    component: PatientsListComponent,
    data: { page: 'Patient List' }
  },
  {
    path: 'update-patient/:uuid',
    component: UpdatePatientComponent,
    data: { page: 'Patient Update' },
    resolve: { patientDetails: UpdatePatientResolverService }
  },
  {
    path: 'appointments',
    component: AppointmentFixingComponent,
    data: { page: 'Appointments' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReceptionRoutingModule { }
