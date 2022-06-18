import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MastersRoutingModule } from './masters-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
// import { SelectDropDownModule } from 'ngx-select-dropdown';
import { NgSelectModule } from '@ng-select/ng-select';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';

// import { ButtonsDirective } from '../../Directives/buttons.directive';

import { DoctorMasterComponent } from '../../components/masters/doctor-master/doctor-master.component';
import { FeesMasterComponent } from '../../components/masters/fees-master/fees-master.component';
import { TestMasterComponent } from '../../components/masters/test-master/test-master.component';
import { GroupTestMasterComponent } from '../../components/masters/group-test-master/group-test-master.component';
import { ProfileMasterComponent } from '../../components/masters/profile-master/profile-master.component';
import { RoomMasterComponent } from '../../components/masters/room-master/room-master.component';
import { UserAccessComponent } from '../../components/masters/user-access/user-access.component';
import { UserMasterComponent } from '../../components/masters/user-master/user-master.component';
import { DoctorTimingsComponent } from '../../components/masters/doctor-timings/doctor-timings.component';

@NgModule({
  declarations: [
    DoctorMasterComponent,
    FeesMasterComponent,
    TestMasterComponent,
    GroupTestMasterComponent,
    ProfileMasterComponent,
    RoomMasterComponent,
    UserAccessComponent,
    UserMasterComponent,
    DoctorTimingsComponent
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MastersRoutingModule,
    NgxMaterialTimepickerModule,
    NgSelectModule,
    DragDropModule,
    MatTooltipModule,
    MatIconModule
    // SelectDropDownModule
  ]
})
export class MastersModule { }
