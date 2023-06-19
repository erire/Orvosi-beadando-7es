import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Patient } from '../models/patient';
import { Observable, lastValueFrom, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  // storage!: Product[];

  constructor(private http: HttpClient) { }

  // private async loadStorageIfEmpty(): Promise<void> {
  //   if (!this.storage || this.storage.length === 0) {
  //     this.storage = await lastValueFrom(this.http.get<Product[]>('assets/products.json'));
  //   }
  // }

  async loadPatients(): Promise<Patient[]> {
    // await this.loadStorageIfEmpty();
    // return this.storage;
    return await lastValueFrom(this.http.get<Patient[]>('api/patients'));
  }

  async getPatient(id: string) {
    return await lastValueFrom(this.http.get<Patient>('api/patients/'+ id));
  }

  async patientFilter(search: string) {
    return await lastValueFrom(this.http.get<Patient[]>('api/patients',
      {
        params: { search }
      })
    );
    // await this.loadStorageIfEmpty();
    //   return this.storage.filter((product) => {
    //     if(!product.title || product.title.length === 0){
    //       return false;
    //     }
    //     return product.title.toLowerCase().includes(query.toLowerCase());
    //   })
  }

  async addPatient(patient: Patient) {
    // await this.loadStorageIfEmpty();
    // this.storage.unshift(product);

    //api/products?search=wood
    return await lastValueFrom(this.http.post<Patient>('api/patients', patient));
  }

  async updatePatient(patient: Patient) {
    return await await lastValueFrom(this.http.put<Patient>('api/patients/', patient));
  }

  async deletePatient(patient:string){
    return await lastValueFrom(this.http.delete<Patient>('api/patients/' + patient));
  }


  // ezzel kezdtük, ez is egy jó megoldás
  // loadProducts(): Observable<Product[]> {
  //   return this.http.get<Product[]>('assets/products.json');
  // }

  // productFilter(query: string): Observable<Product[]> {
  //   
  //   return this.loadProducts().pipe(
  //     map((products: any[]) => {
  //       return products.filter(product => {
  //         if (!product.title || product.title.length === 0) {
  //           return false;
  //         }
  //         return product.title.includes(query);
  //       });
  //     })
  //   );
  // }

}
