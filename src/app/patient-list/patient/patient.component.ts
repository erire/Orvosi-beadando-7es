import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Patient } from 'src/app/models/patient';
import { History } from 'src/app/models/history';
import { PatientService } from 'src/app/services/patient.service';
import { HistoryService } from 'src/app/services/history.service';
import { Diagnosis } from 'src/app/models/diagnosis';
import { DiagnosisService } from 'src/app/services/diagnosis.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent {
  @Input() patient!: Patient;
  histories!: History[];
  checkupList: string[] = [];
  diagnoses!: Diagnosis[];

  newDiagnosisTitle: string = '';

  

  constructor(private router: Router,
    private patientService: PatientService,
    private historyService: HistoryService,
    private diagnosisService: DiagnosisService) { }

  async ngOnInit() {
    this.diagnoses =  await this.diagnosisService.getAll();
    this.checkupList = this.generateCheckupList();
  }

  navigateToPatientForm(id: string) {
    this.router.navigate([ '/patient-form' ], {
      queryParams: {
        id: id
      }
    });
  }

  navigateToHistoryForm(id: number) {
    this.router.navigate([ '/history-form' ], {
      queryParams: {
        id: id
      }
    });
  }

  async deletePatient(patient: string) {
    await this.patientService.deletePatient(patient);
    location.reload();
  }

  async deleteHistory(id: number) {
    await this.historyService.delete(id);
    location.reload();
  }

  async createDiagnosis() {
    let diagnoses = await this.diagnosisService.getAll();
    let foundDiagnosis = false;
  
    for (const diagnosis of diagnoses) {
      if (diagnosis.title === this.newDiagnosisTitle) {
        this.patient.diagnoses.push(diagnosis);
        this.patientService.updatePatient(this.patient);
        foundDiagnosis = true;
        break;
      }
    }
  
    if (!foundDiagnosis) {
      await this.diagnosisService.create({
        id: 0,
        title: this.newDiagnosisTitle
      });
      diagnoses = await this.diagnosisService.getAll();
      const newDiagnosis = diagnoses[diagnoses.length - 1];
      this.patient.diagnoses.push(newDiagnosis);
      this.patientService.updatePatient(this.patient);
    }
  }
  

  async deleteDiagnosis(id: number) {
    await this.diagnosisService.delete(id);
    this.diagnoses = await this.diagnosisService.getAll();
  }

  generateCheckupList() {
    const checkupList = [];
    const currentDate = new Date();
    const birthDate = new Date(this.patient.dateofbirth);
    const ageInYears = currentDate.getFullYear() - birthDate.getFullYear();
    if (ageInYears >= 18) {
      const tudSzuroVizsgalatok = this.patient.histories.filter(history =>
        history.procedure === 'tüdőszűrő vizsgálat'
      );
      const oneYearAgo = new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), currentDate.getDate());
  
      const tudSzuroVizsgalatElozoEvben = tudSzuroVizsgalatok.some(history => {
        const vizsgalatDate = new Date(history.date);
        return vizsgalatDate > oneYearAgo;
      });
      
      if (tudSzuroVizsgalatok.length === 0 || !tudSzuroVizsgalatElozoEvben) {
        checkupList.push('tüdőszűrő vizsgálat');
      }
      
    }
    if (ageInYears >= 35 && this.patient.gender === 'férfi') {
      const prosztataVizsgalatok = this.patient.histories.filter(history =>
        history.procedure === 'prosztata vizsgálat'
      );
      
      const twoYearsAgo = new Date(currentDate.getFullYear() - 2, currentDate.getMonth(), currentDate.getDate());
      
      const prosztataVizsgalatElozoKetEvben = prosztataVizsgalatok.some(history => {
        const vizsgalatDate = new Date(history.date);
        return vizsgalatDate > twoYearsAgo;
      });
      
      if (prosztataVizsgalatok.length === 0 || !prosztataVizsgalatElozoKetEvben) {
        checkupList.push('prosztata vizsgálat');
      }
      
    }
  
    if (ageInYears >= 45 && this.patient.gender === 'nő') {
      const mammografiaVizsgalatok = this.patient.histories.filter(history =>
        history.procedure === 'mammográfiai vizsgálat'
      );
      
      const threeYearsAgo = new Date(currentDate.getFullYear() - 3, currentDate.getMonth(), currentDate.getDate());
      
      const mammografiaVizsgalatElozoHaromEvben = mammografiaVizsgalatok.some(history => {
        const vizsgalatDate = new Date(history.date);
        return vizsgalatDate > threeYearsAgo;
      });
      
      if (mammografiaVizsgalatok.length === 0 || !mammografiaVizsgalatElozoHaromEvben) {
        checkupList.push('mammográfiai vizsgálat');
      }
      
    }
    const altalanosVizsgalatok = this.patient.histories.filter(history =>
      history.procedure === 'általános vizsgálat'
    );
    
    const fiveYearsAgo = new Date(currentDate.getFullYear() - 5, currentDate.getMonth(), currentDate.getDate());
    
    const altalanosVizsgalatElozoOtEvben = altalanosVizsgalatok.some(history => {
      const vizsgalatDate = new Date(history.date);
      return vizsgalatDate > fiveYearsAgo;
    });
    
    if (altalanosVizsgalatok.length === 0 || !altalanosVizsgalatElozoOtEvben) {
      checkupList.push('általános vizsgálat');
    }        
    return checkupList;
  }
}

