import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WeatherService } from './services/weather.service';
import { FormsModule } from '@angular/forms';
import { NgIf, TitleCasePipe } from '@angular/common';
import { Weather } from './models/weather.models';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, NgIf, TitleCasePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  weatherData: any;
  city: string = '';
  error: string = '';

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.getCurrentLocation();
  }

  getCurrentLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          this.getWeatherByCoordinates(lat, lon);
        },
        (error) => {
          this.error = 'Unable to retrieve your location';
          console.error(error);
        }
      );
    } else {
      this.error = 'Geolocation is not supported by this browser.';
    }
  }
getWeatherByCoordinates(lat: number, lon: number): void {
  this.weatherService.getForecastByCoordinates(lat, lon).subscribe({
    next: (data: Weather) => {
      this.city = data.city.name;
      this.weatherData = this.processWeatherData(data);
    },
    error: (error) => {
      this.error = 'Unable to retrieve weather data';
      console.error(error);
    },
    complete: () => {
      // Handle completion if necessary
    }
  });
}

  processWeatherData(data: Weather): any {
    const today = new Date().setHours(0, 0, 0, 0);
    const oneDay = 24 * 60 * 60 * 1000;

    const daysData = data.list.reduce((acc: any, item: any) => {
      const date = new Date(item.dt_txt).setHours(0, 0, 0, 0);
      if (!acc[date]) acc[date] = [];
      acc[date].push(item);
      return acc;
    }, {});

    const dates = Object.keys(daysData).map(date => parseInt(date, 10));
    dates.sort((a, b) => a - b);

    const todayIndex = dates.indexOf(today);
    const previousDay = todayIndex > 0 ? dates[todayIndex - 1] : dates[todayIndex];
    const nextDay = todayIndex < dates.length - 1 ? dates[todayIndex + 1] : dates[todayIndex];

    return {
      previousDay: this.calculateDayAverage(daysData[previousDay]),
      currentDay: this.calculateDayAverage(daysData[today]),
      nextDay: this.calculateDayAverage(daysData[nextDay])
    };
  }

  calculateDayAverage(dayData: any[]): any {
    const tempSum = dayData.reduce((sum, item) => sum + item.main.temp, 0);
    const humiditySum = dayData.reduce((sum, item) => sum + item.main.humidity, 0);
    const windSpeedSum = dayData.reduce((sum, item) => sum + item.wind.speed, 0);

    const averageTemp = tempSum / dayData.length;
    const averageHumidity = humiditySum / dayData.length;
    const averageWindSpeed = windSpeedSum / dayData.length;

    return {
      temp: averageTemp,
      humidity: averageHumidity,
      windSpeed: averageWindSpeed,
      description: dayData[0].weather[0].description,
      icon: dayData[0].weather[0].icon
    };
  }

  getWeatherIcon(icon: string): string {
    return `https://openweathermap.org/img/wn/${icon}@2x.png`;
  }

  onCityChange(city: string): void {
    this.city = city;
    this.weatherService.getForecastByCity(city).subscribe((data: Weather) => {
      this.weatherData = this.processWeatherData(data);
    }, error => {
      this.error = 'Unable to retrieve weather data';
      console.error(error);
    });
  }
}