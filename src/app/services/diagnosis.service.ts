import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Diagnosis } from '../models/diagnosis';

@Injectable({
  providedIn: 'root'
})
export class DiagnosisService {

  constructor(private http: HttpClient) { }

  async getAll() {
    return  await lastValueFrom(this.http.get<Diagnosis[]>('/api/diagnoses'));
  }

  async create(diagnosis: Diagnosis) {
    return  await lastValueFrom(this.http.post<Diagnosis>('/api/diagnoses', diagnosis));
  }

  async delete(id: number) {
    return  await lastValueFrom(this.http.delete('/api/diagnoses/' + id));
  }
}