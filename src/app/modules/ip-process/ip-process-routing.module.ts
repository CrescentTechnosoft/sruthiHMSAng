import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdmissionComponent } from '../../components/ip-process/admission/admission.component';
import { TreatmentEntryComponent } from '../../components/ip-process/treatment-entry/treatment-entry.component';
import { HistoryComponent } from '../../components/ip-process/history/history.component';
import { WardShiftingComponent } from '../../components/ip-process/ward-shifting/ward-shifting.component';
import { WardStatusComponent } from '../../components/ip-process/ward-status/ward-status.component';
// import { XRayUploadComponent } from '../../Components/IPProcess/xray-upload/xray-upload.component';
import { DischargeSummaryComponent } from '../../components/ip-process/discharge-summary/discharge-summary.component';
import { WardStatusResolverService } from '../../services/resolvers/ward-status-resolvers.service';

const routes: Routes = [
  {
    path: 'admission',
    component: AdmissionComponent,
    data: { page: 'Admission' }
  },
  {
    path: 'treatment-entry',
    component: TreatmentEntryComponent,
    data: { page: 'Treatment' }
  },
  // {
  //   path: 'XRayUpload',
  //   component: XRayUploadComponent,
  //   data: { page: 'XRay Upload' }
  // },
  {
    path: 'history',
    component: HistoryComponent,
    data: { page: 'History' }
  },
  {
    path: 'ward-status',
    component: WardStatusComponent,
    data: { page: 'Ward Status' },
    resolve: {
      wardStatus: WardStatusResolverService
    }
  },
  {
    path: 'ward-shifting',
    component: WardShiftingComponent,
    data: { page: 'Ward Shifting' }
  },
  {
    path: 'discharge-summary',
    component: DischargeSummaryComponent,
    data: { page: 'Discharge' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DayCareRoutingModule { }
