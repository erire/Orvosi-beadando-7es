import { Component, Input } from '@angular/core';
import { Patient } from '../models/patient';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent {

    patients!: Patient[];
    searchQuery: string = ''

    constructor(
      private patientService: PatientService
    ) { }

    async ngOnInit(){
      this.patients = await this.patientService.patientFilter(this.searchQuery);
    }
    
    async search(){
      this.patients = await this.patientService.patientFilter(this.searchQuery);
    }

}
