import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  getData(location: any): Observable<any> {
    return this.http.get<any>(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${environment.api}&units=metric`);
  }
}
