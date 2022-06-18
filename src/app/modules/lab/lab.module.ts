import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';

import { LabRoutingModule } from './lab-routing.module';
import { OPLabComponent } from '../../components/lab/op-lab/oplab.component';
import { IPLabComponent } from '../../components/lab/ip-lab/iplab.component';


@NgModule({
  declarations: [
    OPLabComponent,
    IPLabComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    LabRoutingModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatDialogModule
  ]
})
export class LabModule { }
