import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { OverAllReportComponent } from '../../../components/reports/collections/collection-report/overall.component';
// import { DeptwiseComponent } from '../../../Components/Reports/collections/deptwise/deptwise.component';
import { CollectionsRoutingModule } from './collections-routing.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MonthlyCollectionsComponent } from '../../../components/reports/collections/monthly-collections/monthly-collections.component';

@NgModule({
  declarations: [
    OverAllReportComponent,
    // DeptwiseComponent,
    MonthlyCollectionsComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CollectionsRoutingModule,
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
export class CollectionsModule { }
