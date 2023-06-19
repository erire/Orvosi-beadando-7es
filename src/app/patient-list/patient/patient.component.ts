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
      const lastTudSzuroIndex = this.patient.histories.findIndex(history =>
        history.procedure === 'tüdőszűrő vizsgálat'
      );
  
      if (lastTudSzuroIndex === -1) {
        checkupList.push('tüdőszűrő vizsgálat');
      } else {
        const lastTudSzuroDate = new Date(this.patient.histories[lastTudSzuroIndex].date);
        const nextTudSzuroDate = new Date(lastTudSzuroDate.getFullYear() + 1, lastTudSzuroDate.getMonth(), lastTudSzuroDate.getDate());
  
        if (nextTudSzuroDate <= currentDate) {
          checkupList.push('tüdőszűrő vizsgálat');
        }
      }
    }
    if (ageInYears >= 35 && this.patient.gender === 'férfi') {
      const lastProsztataVizsgalatIndex = this.patient.histories.findIndex(history =>
        history.procedure === 'prosztata vizsgálat'
      );
  
      if (lastProsztataVizsgalatIndex === -1) {
        checkupList.push('prosztata vizsgálat');
      } else {
        const lastProsztataVizsgalatDate = new Date(this.patient.histories[lastProsztataVizsgalatIndex].date);
        const nextProsztataVizsgalatDate = new Date(lastProsztataVizsgalatDate.getFullYear() + 2, lastProsztataVizsgalatDate.getMonth(), lastProsztataVizsgalatDate.getDate());
  
        if (nextProsztataVizsgalatDate <= currentDate) {
          checkupList.push('prosztata vizsgálat');
        }
      }
    }
  
    if (ageInYears >= 45 && this.patient.gender === 'nő') {
      const lastMammografiaIndex = this.patient.histories.findIndex(history =>
        history.procedure === 'mammográfiai vizsgálat'
      );
  
      if (lastMammografiaIndex === -1) {
        checkupList.push('mammográfiai vizsgálat');
      } else {
        const lastMammografiaDate = new Date(this.patient.histories[lastMammografiaIndex].date);
        const nextMammografiaDate = new Date(lastMammografiaDate.getFullYear() + 3, lastMammografiaDate.getMonth(), lastMammografiaDate.getDate());
  
        if (nextMammografiaDate <= currentDate) {
          checkupList.push('mammográfiai vizsgálat');
        }
      }
    }
    const lastGeneralCheckupIndex = this.patient.histories.findIndex(history =>
      history.procedure === 'általános vizsgálat'
    );
    
    if (lastGeneralCheckupIndex === -1) {
      checkupList.push('általános vizsgálat');
    } else {
      const lastGeneralCheckupDate = new Date(this.patient.histories[lastGeneralCheckupIndex].date);
      const nextGeneralCheckupDate = new Date(lastGeneralCheckupDate.getFullYear() + 5, lastGeneralCheckupDate.getMonth(), lastGeneralCheckupDate.getDate());
    
      if (nextGeneralCheckupDate <= currentDate) {
        checkupList.push('általános vizsgálat');
      }
    }    
    return checkupList;
  }
}

