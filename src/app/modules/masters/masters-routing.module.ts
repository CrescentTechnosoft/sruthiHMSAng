import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DoctorMasterComponent } from '../../components/masters/doctor-master/doctor-master.component';
import { DoctorTimingsComponent } from '../../components/masters/doctor-timings/doctor-timings.component';
import { FeesMasterComponent } from '../../components/masters/fees-master/fees-master.component';
import { TestMasterComponent } from '../../components/masters/test-master/test-master.component';
import { GroupTestMasterComponent } from '../../components/masters/group-test-master/group-test-master.component';
import { ProfileMasterComponent } from '../../components/masters/profile-master/profile-master.component';
import { RoomMasterComponent } from '../../components/masters/room-master/room-master.component';
import { UserAccessComponent } from '../../components/masters/user-access/user-access.component';
import { UserMasterComponent } from '../../components/masters/user-master/user-master.component';

const routes: Routes = [
    {
        path: 'doctor-master',
        component: DoctorMasterComponent,
        data: { page: 'Doctor Master' }
    },
    {
        path: 'doctor-timing',
        component: DoctorTimingsComponent,
        data: { page: 'Doctor Timing' }
    },
    {
        path: 'fees-master',
        component: FeesMasterComponent,
        data: { page: 'Fees Master' }
    },
    {
        path: 'test-master',
        component: TestMasterComponent,
        data: { page: 'Test Master' }
    },
    {
        path: 'group-test-master',
        component: GroupTestMasterComponent,
        data: { page: 'Group Test Master' }
    },
    {
        path: 'profile-master',
        component: ProfileMasterComponent,
        data: { page: 'Profile Master' }
    },
    {
        path: 'room-master',
        component: RoomMasterComponent,
        data: { page: 'Room Master' }
    },
    {
        path: 'user-access',
        component: UserAccessComponent,
        data: { page: 'User Access' }
    },
    {
        path: 'user-master',
        component: UserMasterComponent,
        data: { page: 'User Master' }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MastersRoutingModule { }
