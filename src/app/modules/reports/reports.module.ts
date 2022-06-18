import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';

import { RegistrationsComponent } from '../../components/reports/registrations/registrations.component';

import { ReactiveFormsModule } from '@angular/forms';
// import { DailyCollectionsComponent } from '../../Components/Reports/daily-collections/daily-collections.component';
// import { UserwiseCollectionsComponent } from '../../Components/Reports/userwise-collections/userwise-collections.component';
// import { FeedbackComponent } from '../../Components/Reports/feedback/feedback.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { IpReportsComponent } from '../../components/reports/ip-reports/ip-reports.component';

@NgModule({
  declarations: [
    RegistrationsComponent,
    IpReportsComponent,
    // DailyCollectionsComponent,
    // UserwiseCollectionsComponent,
    // FeedbackComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ReportsRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule
  ],
  providers:[
    {provide:MAT_DATE_LOCALE,useValue:'en-GB'}
  ]
})
export class ReportsModule { }
