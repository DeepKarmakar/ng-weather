import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { log } from 'util';
import { Weather, DailyWeather } from '../../interface/weather.model';

@Component({
  selector: 'app-city-input',
  templateUrl: './city-input.component.html',
  styleUrls: ['./city-input.component.scss']
})
export class CityInputComponent implements OnInit {

  foreCastData = [];
  forecastObj: Weather[];
  fullForecastObj: any = {};
  cityList: any = [];
  dailyWeatherData: any = [];

  foreCastFiveDay: any = [];

  @ViewChild('jknoakrtaname') auto;

  constructor(private apiservice: ApiService) { }

  ngOnInit() {

    this.apiservice.getCityData().subscribe(cityData => this.cityList = cityData);

    this.apiservice.currentforeCast.subscribe(data => this.foreCastFiveDay = data);
  }

  getLocation(city) {
    this.foreCastData = [];
    this.dailyWeatherData = [];

    this.apiservice.getWeatherForcast(city).subscribe(data => {
      console.log(data);

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
      this.apiservice.updateWeather(this.foreCastData[0]);
      console.log(this.foreCastData[0]);
    });

    this.apiservice.getWeatherDataForChart(city).subscribe(data => {
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
      this.apiservice.updateForeCast(this.dailyWeatherData);
      console.log(this.dailyWeatherData);

    });



  }

  customCity(val, e) {
    this.getLocation(val);
    e.stopPropagation();
    this.auto.close();
  }

  keyword = 'name';

  selectEvent(item) {
    console.log(item);
    this.getLocation(item.name);
    // this.closePanel(e);

  }

  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.\

  }

  onFocused(e) {
    // do something when input is focused
  }
}
