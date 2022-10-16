import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from './services/api.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  data = [];
  show = false;
  temp = [];
  weather = [];
  wind = [];
  desc = [];
  icon = ''


  form = new FormGroup({
    location: new FormControl('')
  });

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
  }

  onSubmit() {
    //console.log(this.form.get("location")?.value);
    this.apiService.getData(this.form.value?.location).subscribe(data => {
      console.log(data);
      this.data = data;
      console.log(this.data);
      this.temp = data.main.temp;
      console.log(this.temp);
      this.weather = data.weather[0].main;
      console.log(this.weather);
      this.wind = data.wind.speed;
      console.log(this.wind);
      this.desc = data.weather[0].description;
      console.log(this.desc);
      this.icon = data.weather[0].icon;
      console.log(this.icon);
      const iconUrl = `http://openweathermap.org/img/wn/${this.icon}@2x.png`;
      console.log(iconUrl);
    });
    this.show = true;
  }
}
