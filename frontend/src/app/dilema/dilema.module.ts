import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateDilemaComponent } from './create-dilema/create-dilema.component';
import { DilemaRoutingModule } from './dilema-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyindexComponent } from './myindex/myindex.component';
import { IndexAdminComponent } from './index-admin/index-admin.component';


@NgModule({
  declarations: [
    CreateDilemaComponent,
    MyindexComponent,
    IndexAdminComponent,
    
  ],
  imports: [
    CommonModule,
    DilemaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    CreateDilemaComponent,
  ]
})
export class DilemaModule { }
