import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateDilemaComponent } from './create-dilema/create-dilema.component';
import { MyindexComponent } from './myindex/myindex.component';
import { IndexAdminComponent } from './index-admin/index-admin.component';

const routes: Routes = [
  { path: 'dilemas', component: MyindexComponent },
  { path: 'dilemas/admin', component: IndexAdminComponent },

  { path: 'dilemas/create', component: CreateDilemaComponent },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DilemaRoutingModule { }
