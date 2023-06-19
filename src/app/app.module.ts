import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import { PatientComponent } from './patient-list/patient/patient.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatientFormComponent } from './patient-form/patient-form.component';
import { HistoryFormComponent } from './history-form/history-form.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    PatientListComponent,
    PatientComponent,
    PatientFormComponent,
    HistoryFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
