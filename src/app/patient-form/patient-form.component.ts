import { lastValueFrom } from 'rxjs';
import { History } from '../models/history';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatientService } from '../services/patient.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HistoryService } from '../services/history.service';
import { Patient } from '../models/patient';

@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.scss']
})
export class PatientFormComponent {
  patientForm: FormGroup = this.fb.group({
    id: [],
    name: ['', Validators.required],
    dateofbirth: ['', Validators.pattern(/^\d{4}\.\d{2}\.\d{2}\.$/)],
    socialsecuritynumber: ['', Validators.pattern(/^\d{9}$/)],
    gender: ['', Validators.required],
    histories: [[]]
  })

  historyForm: FormGroup = this.fb.group({
    id: [null],
    procedure: ['', Validators.required],
    date: ['', [Validators.required, Validators.pattern(/^\d{4}\.\d{2}\.\d{2}\.$/)]]
  })

  errorMessage: string = ''
  histories!: History[];
  patient!: Patient;
  patients!: Patient[];
  changeForm  = false;
  showChange  = false;
  constructor(
    private patientService: PatientService,
    private fb: FormBuilder,
    private router: Router,

    private historyService: HistoryService,
    private activatedRoute: ActivatedRoute
    
  ) { this.router.routeReuseStrategy.shouldReuseRoute = () => false; }

  get id() {
    return this.patientForm.get('id');
  }

  get name() {
    return this.patientForm.get('name');
  }

  get dateofbirth() {
    return this.patientForm.get('dateofbirth');
  }

  get socialsecuritynumber() {
    return this.patientForm.get('socialsecuritynumber');
  }

  get gender() {
    return this.patientForm.get('gender');
  }

  get procedure() {
    return this.historyForm.get('procedure');
  }

  get date() {
    return this.historyForm.get('date');
  }

  async ngOnInit() {
    this.histories = await this.historyService.getAll();

    const id = this.activatedRoute.snapshot.queryParams['id'];
    this.patient = await this.patientService.getPatient(id);

    const fromAdd = this.activatedRoute.snapshot.queryParams['fromAdd'];
    if (fromAdd) {
      this.changeView();
    }
    console.log(this.showChange)
    if(id){
      this.showChange = !this.showChange;
      const patient = await this.patientService.getPatient(id);   
      this.patientForm.setValue(patient);
    }
  }

  async addPatient() {
    const patient = this.patientForm.value
    if(patient.id){
      const törölni = this.patient.histories.filter(a => !patient.histories.map((b: { id: any; })=>b.id).includes(a.id))
      for (var history in törölni) {
        await this.historyService.delete(törölni[history].id);
      }
      this.patientService.updatePatient(patient);
      this.router.navigateByUrl("/");
    }else{
      this.patientForm.patchValue({histories: {id: 15, procedure: 'mnb',
      date: '2005.03.06.'}})
      await this.patientService.addPatient(patient);
      this.patients = await this.patientService.loadPatients();
      const lenght = Object.keys(this.patients).length;
      const newPatientId = this.patients[lenght-1].id;
      this.router.navigate(['/patient-form'], {
        queryParams: {
          id: newPatientId,
          fromAdd: true
        }
      });
    }
  }

  async addHistory() {
    const newHistory = this.historyForm.value;
    await this.historyService.create(newHistory);
    this.histories = await this.historyService.getAll();
    const lenght = Object.keys(this.histories).length;
    const lastHistory = this.histories[lenght - 1];
    this.patient.histories.push(lastHistory);
  }

  changeView(){
    this.changeForm = !this.changeForm;
 }
}
