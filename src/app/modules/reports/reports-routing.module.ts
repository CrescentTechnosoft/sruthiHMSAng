import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrationsComponent } from '../../components/reports/registrations/registrations.component';
import { IpReportsComponent } from '../../components/reports/ip-reports/ip-reports.component';
// import { DailyCollectionsComponent } from '../../Components/Reports/daily-collections/daily-collections.component';
// import { FeedbackComponent } from '../../Components/Reports/feedback/feedback.component';

const routes: Routes = [
  {
    path: 'registrations',
    component: RegistrationsComponent
  },
  {
    path:'ip-report',
    component:IpReportsComponent
  },
  {
    path: 'collections',
    loadChildren: () => import('./collections/collections.module').then(m => m.CollectionsModule)
  },
  // {
  //   path: 'daily-collections',
  //   component: DailyCollectionsComponent
  // },
  // {
  //   path: 'feedback',
  //   component: FeedbackComponent
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
