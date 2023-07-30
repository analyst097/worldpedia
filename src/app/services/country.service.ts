import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Country } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http: HttpClient) { }

  getAllCountries(){
    return this.http.get<Country[]>('api/all');
  }

  searchByName(name: string){
    return this.http.get<Country[]>('api/name/' + name);
  }
}
