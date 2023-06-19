import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { History } from '../models/history';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor(private http: HttpClient) { }

  async getAll() {
    return  await lastValueFrom(this.http.get<History[]>('/api/histories'));
  }

  async create(history: History) {
    return  await lastValueFrom(this.http.post<History>('/api/histories', history));
  }

  async delete(id: number) {
    return  await lastValueFrom(this.http.delete('/api/histories/' + id));
  }

  async updateHistory(history: History) {
    return await await lastValueFrom(this.http.put<History>('api/histories/', history));
  }

  async getHistory(id: string) {
    return await lastValueFrom(this.http.get<History>('api/histories/'+ id));
  }
}
