import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { CashCounterRoutingModule } from './cash-counter-routing.module';
import { OPBillingComponent } from '../../components/cash-counter/op-billing/op-billing.component';
import { IPBillingComponent } from '../../components/cash-counter/ip-billing/ip-billing.component';
// import { OpFeedbackComponent } from '../../Components/CashCounter/op-feedback/op-feedback.component';
import { IPAdvanceComponent } from '../../components/cash-counter/ip-advance/ip-advance.component';


@NgModule({
  declarations: [
    OPBillingComponent,
    IPBillingComponent,
    // OpFeedbackComponent,
    IPAdvanceComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatRadioModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    CashCounterRoutingModule
  ]
})
export class CashCounterModule { }
