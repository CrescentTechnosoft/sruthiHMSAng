import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';

import { DayCareRoutingModule } from './ip-process-routing.module';

import { AdmissionComponent } from '../../components/ip-process/admission/admission.component';
import { TreatmentEntryComponent } from '../../components/ip-process/treatment-entry/treatment-entry.component';
import { HistoryComponent } from '../../components/ip-process/history/history.component';
import { WardStatusComponent } from '../../components/ip-process/ward-status/ward-status.component';
import { WardShiftingComponent } from '../../components/ip-process/ward-shifting/ward-shifting.component';
import { DischargeSummaryComponent } from '../../components/ip-process/discharge-summary/discharge-summary.component';
// import { XRayUploadComponent } from '../../Components/IPProcess/xray-upload/xray-upload.component';

import { WardStatusResolverService } from '../../services/resolvers/ward-status-resolvers.service';

@NgModule({
  declarations: [
    AdmissionComponent,
    TreatmentEntryComponent,
    HistoryComponent,
    WardStatusComponent,
    WardShiftingComponent,
    DischargeSummaryComponent,
    // XRayUploadComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatProgressBarModule,
    DayCareRoutingModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatTabsModule
  ],
  providers: [WardStatusResolverService]
})
export class DayCareModule { }
