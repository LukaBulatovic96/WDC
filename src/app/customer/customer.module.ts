import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    CustomerComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule
  ]
})
export class CustomerModule { }
