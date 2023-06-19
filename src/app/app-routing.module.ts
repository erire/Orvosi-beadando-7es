import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientListComponent } from './patient-list/patient-list.component';
import { PatientFormComponent } from './patient-form/patient-form.component';
import { HistoryFormComponent } from './history-form/history-form.component';

const routes: Routes = [
  { 
    path: '',
    component: PatientListComponent
  },
  {
    path: 'patient-form',
    component: PatientFormComponent
  },
  {
    path: 'history-form',
    component: HistoryFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
