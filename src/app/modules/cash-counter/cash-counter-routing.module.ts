import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OPBillingComponent } from '../../components/cash-counter/op-billing/op-billing.component';
// import { OpFeedbackComponent } from '../../Components/CashCounter/op-feedback/op-feedback.component';
import { IPBillingComponent } from '../../components/cash-counter/ip-billing/ip-billing.component';
import { IPAdvanceComponent } from '../../components/cash-counter/ip-advance/ip-advance.component';

const routes: Routes = [
  {
    path: 'op-billing',
    component: OPBillingComponent,
    data: { page: 'OP Billing' }
  },
  // {
  //   path: 'op-feedback',
  //   component: OpFeedbackComponent,
  //   data: { page: 'OP Feedback' }
  // },
  {
    path:'ip-advance',
    component:IPAdvanceComponent,
    data:{page:'IP Advance'}
  },
  {
    path: 'ip-billing',
    component: IPBillingComponent,
    data: { page: 'IP Billing' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CashCounterRoutingModule { }
