import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OPLabComponent } from '../../components/lab/op-lab/oplab.component';
import { IPLabComponent } from '../../components/lab/ip-lab/iplab.component';

const routes: Routes = [
  {
    path: 'op-lab',
    component: OPLabComponent,
    data:{page:'OP Lab'}
},
{
    path:'ip-lab',
    component:IPLabComponent,
    data:{page:'IP Lab'}
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LabRoutingModule { }
