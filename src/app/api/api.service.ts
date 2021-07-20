import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  constructor(private http: HttpClient) {}
  fetchCovidData(){
    return this.http.get('https://api.covid19india.org/v4/min/data.min.json');
  }
}
