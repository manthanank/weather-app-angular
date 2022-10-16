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
  timezone = [];
  wind = [];


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
      //console.log(data);
      this.data = data;
      console.log(this.data);
      this.temp = data.main.temp;
      console.log(this.temp);
      this.weather = data.weather[0].main;
      console.log(this.weather);
      this.wind = data.wind.speed;
      console.log(this.wind);
    });
    this.show = true;
  }
}
