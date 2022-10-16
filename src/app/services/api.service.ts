import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  api = '26213e3c835aecd490b3f93827d0ad55'

  constructor(private http: HttpClient) {
  }

  getData(location: any): Observable<any> {
    return this.http.get<any>(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${this.api}&units=metric`);
  }
}
