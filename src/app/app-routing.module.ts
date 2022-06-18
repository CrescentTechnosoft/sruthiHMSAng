import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { ChildGuard } from './guards/child.guard';

import { HeaderComponent } from './components/templates/header/header.component';
import { UnAuthorizedComponent } from './components/templates/un-authorized/un-authorized.component';
import { Error404Component } from './components/templates/error404/error404.component';
import { LoginComponent } from './components/auth/login/login.component';
import { DashboardComponent } from './components/templates/dashboard/dashboard.component';
import { DashboardResolveService } from './services/resolvers/dashboard-resolve.service';

const routes: Routes = [
  {
    path: '',
    component:LoginComponent
  },
  {
    path: 'unauthorized',
    component: UnAuthorizedComponent
  },
  {
    path: 'dashboard',
    component: HeaderComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
        canActivate: [AuthGuard],
        data: { page: 'Dashboard' },
        resolve: {
          dashboard: DashboardResolveService
        }
      }
    ]
  },
  {
    path: 'masters',
    component: HeaderComponent,
    canActivateChild: [ChildGuard],
    loadChildren: () => import('./modules/masters/masters.module').then(m => m.MastersModule)
  },
  {
    path: 'reception',
    component: HeaderComponent,
    canActivateChild: [ChildGuard],
    loadChildren: () => import('./modules/reception/reception.module').then(m => m.ReceptionModule)
  },
  {
    path: 'out-patients',
    component: HeaderComponent,
    canActivateChild: [ChildGuard],
    loadChildren: () => import('./modules/out-patient/out-patient.module').then(m => m.OutPatientModule)
  },
  {
    path: 'cash-counter',
    component: HeaderComponent,
    canActivateChild: [ChildGuard],
    loadChildren: () => import('./modules/cash-counter/cash-counter.module').then(m => m.CashCounterModule)
  },
  {
    path: 'lab',
    component: HeaderComponent,
    canActivateChild: [ChildGuard],
    loadChildren: () => import('./modules/lab/lab.module').then(m => m.LabModule)
  },
  {
    path: 'ip-process',
    component: HeaderComponent,
    canActivateChild: [ChildGuard],
    loadChildren: () => import('./modules/ip-process/ip-process.module').then(m => m.DayCareModule)
  },
  {
    path: 'reports',
    component: HeaderComponent,
    canActivate: [AuthGuard],
    data: { page: 'Reports' },
    loadChildren: () => import('./modules/reports/reports.module').then(m => m.ReportsModule)
  },
  {
    path: '**',
    component: Error404Component
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
