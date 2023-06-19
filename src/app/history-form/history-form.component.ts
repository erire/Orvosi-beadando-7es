import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HistoryService } from '../services/history.service';

@Component({
  selector: 'app-history-form',
  templateUrl: './history-form.component.html',
  styleUrls: ['./history-form.component.scss']
})
export class HistoryFormComponent {
  historyForm: FormGroup = this.fb.group({
    id: [],
    procedure: [''],
    date: ['']
  })

  errorMessage: string = ''
  constructor(
    private fb: FormBuilder,
    private router: Router,

    private historyService: HistoryService,
    private activatedRoute: ActivatedRoute
  ) { }

  get id() {
    return this.historyForm.get('id');
  }

  get name() {
    return this.historyForm.get('procedure');
  }

  get dateofbirth() {
    return this.historyForm.get('date');
  }

  async ngOnInit() {

    const id = this.activatedRoute.snapshot.queryParams['id'];
    
    if(id){
      const patient = await this.historyService.getHistory(id);
      this.historyForm.setValue(patient);
    } 
  }

  async addHistory() {
    const history = this.historyForm.value
    if(history.id){
      this.historyService.updateHistory(history);
    }else{
      this.historyService.create(history);
    }
    
    this.router.navigateByUrl("/");

  }
}
