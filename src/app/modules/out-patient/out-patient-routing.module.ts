import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OPRegistrationComponent } from '../../components/out-patients/op-registration/op-registration.component';
import { PrescriptionComponent } from '../../components/out-patients/prescription/prescription.component';

const routes: Routes = [
  {
    path: 'op-registration',
    component: OPRegistrationComponent,
    data: { page: 'OP Registration' }
  },
  {
    path: 'prescription',
    component: PrescriptionComponent,
    data: { page: 'Prescription' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OutPatientRoutingModule { }
