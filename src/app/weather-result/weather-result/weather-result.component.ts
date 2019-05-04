import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { TabsComponent } from '../tabs/tabs.component';
import { log } from 'util';
import { Weather, DailyWeather } from '../../interface/weather.model';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-weather-result',
  templateUrl: './weather-result.component.html',
  styleUrls: ['./weather-result.component.scss']
})
export class WeatherResultComponent implements OnInit {
  weatherData: any = [];
  errorMessage;
  foreCastFiveDay: any = [];
  toggleOpen = false;
  dailyWeatherData: any = [];
  arr = [];


  foreCastData: any = [];
  forecastObj: Weather[];
  fullForecastObj: any = {};
  currentDate = new Date();

  expandedIndex;

  constructor(private apiService: ApiService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    this.apiService.currentWeather.subscribe(data => this.weatherData = data);

    this.apiService.currentforeCast.subscribe(data => this.foreCastFiveDay = data);
    // this.getWeather();
    this.getLocation();

    //some values
    this.expandedIndex = 0;
    this.spinner.hide();
    // setTimeout(() => {
    //   /** spinner ends after 5 seconds */
    //   this.spinner.hide();
    // }, 5000);
  }


  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: Position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        this.apiService.getWeatherForcast(latitude, longitude).subscribe(data => {

          // create today's weather data
          let todaysWeather;
          todaysWeather = new Weather();
          todaysWeather.cityName = data.name;
          todaysWeather.temparature = data.main.temp;
          todaysWeather.max_temp = data.main.temp_max;
          todaysWeather.min_temp = data.main.temp_min;
          todaysWeather.icon = data.weather[0].icon;
          todaysWeather.main = data.weather[0].main;
          this.foreCastData.push(todaysWeather);

          // update weather data throughout applicatin;
          this.apiService.updateWeather(this.foreCastData[0]);

        });
        this.apiService.getWeatherDataForChart(latitude, longitude).subscribe(data => {
          console.log(data);
          let currentDt;
          let prevDt;

          let currentDateData = data.list.filter((item, index) => {
            currentDt = item.dt_txt.split(' ')[0];
            const currentHr = new Date(item.dt_txt).getHours();


            let dailyWeather;
            dailyWeather = new DailyWeather();
            dailyWeather.date = currentDt;
            dailyWeather.data = [];
            dailyWeather.data.push(item);

            dailyWeather.max_temp = item.main.temp_max;
            dailyWeather.min_temp = item.main.temp_min;
            dailyWeather.humidity = item.main.humidity;
            dailyWeather.pressure = item.main.pressure;
            dailyWeather.sea_level = item.main.sea_level;
            dailyWeather.weather_desc = item.weather[0].description;
            dailyWeather.icon = item.weather[0].icon;

            if (currentDt !== prevDt) {
              this.dailyWeatherData.push(dailyWeather);

            } else {
              const currentLoopItem = this.dailyWeatherData[this.dailyWeatherData.length - 1];
              // Push other data
              currentLoopItem.data.push(item);
              // update max temp if it is greater than prev
              if (currentLoopItem.max_temp < item.main.temp_max) {
                currentLoopItem.max_temp = item.main.temp_max;
              }
              // update min temp if it is lower than prev
              if (currentLoopItem.min_temp > item.main.temp_min) {
                currentLoopItem.min_temp = item.main.temp_min;
              }
              // update humidity if it is greater than prev
              if (currentLoopItem.humidity < item.main.humidity) {
                currentLoopItem.humidity = item.main.humidity;
              }
              // update pressure if it is greater than prev
              if (currentLoopItem.pressure < item.main.pressure) {
                currentLoopItem.pressure = item.main.pressure;
              }
              // update sea_level if it is greater than prev
              if (currentLoopItem.sea_level < item.main.sea_level) {
                currentLoopItem.sea_level = item.main.sea_level;
              }
              if (currentHr === 12) {
                currentLoopItem.weather_desc = item.weather[0].description;
                currentLoopItem.icon = item.weather[0].icon;
              }
            }
            prevDt = currentDt;

          });
          console.log(this.dailyWeatherData);
          this.apiService.updateForeCast(this.dailyWeatherData);

        });
      });
    } else {
      alert('Geolocation is not supported by this browser. please search your location manually');
    }
  }


  toggleNext(index: number) {
    this.expandedIndex = index === this.expandedIndex ? -1 : index;
  }

}
