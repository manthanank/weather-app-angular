import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { Weather } from '../models/weather.models';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiKey = environment.apiKey;
  private apiUrl = `https://api.openweathermap.org/data/2.5/forecast?appid=${this.apiKey}&units=metric`;

  constructor(private http: HttpClient) {}

  getForecastByCity(city: string): Observable<Weather> {
    const url = `${this.apiUrl}&q=${city}`;
    return this.http.get<Weather>(url);
  }

  getForecastByCoordinates(lat: number, lon: number): Observable<Weather> {
    const url = `${this.apiUrl}&lat=${lat}&lon=${lon}`;
    return this.http.get<Weather>(url);
  }
}
