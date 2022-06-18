import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OverAllReportComponent } from '../../../components/reports/collections/collection-report/overall.component';
// import { DeptwiseComponent } from '../../../Components/Reports/collections/deptwise/deptwise.component';
import { MonthlyCollectionsComponent } from '../../../components/reports/collections/monthly-collections/monthly-collections.component';

const routes: Routes = [
  {
    path: 'overall',
    component: OverAllReportComponent
  },
  {
    path: 'monthly',
    component: MonthlyCollectionsComponent
  }
  // {
  //   path: 'deptwise',
  //   component: DeptwiseComponent
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollectionsRoutingModule { }
