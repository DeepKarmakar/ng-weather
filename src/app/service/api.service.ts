import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url;

  localUrl;

  private weatherSource = new BehaviorSubject('');
  currentWeather = this.weatherSource.asObservable();

  private foreCastSource = new BehaviorSubject('');
  currentforeCast = this.foreCastSource.asObservable();

  constructor(private http: HttpClient) { }

  getWeather(cityName, CountyCode): Observable<any> {
    this.url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName},${CountyCode}&APPID=622b65aef014482207a319afb417ffa6&units=metric`;
    return this.http.get(this.url);
  }


  getWeatherDataForChart(para1, para2?): Observable<any> {
    if (para2) {
      this.url = `http://api.openweathermap.org/data/2.5/forecast?lat=${para1}&lon=${para2}&APPID=622b65aef014482207a319afb417ffa6&units=metric`;
    } else {
      this.url = `http://api.openweathermap.org/data/2.5/forecast?q=${para1}&APPID=622b65aef014482207a319afb417ffa6&units=metric`;
    }
    return this.http.get(this.url);
  }


  getWeatherForcast(para1, para2?): Observable<any> {
    if (typeof (para1) === 'number') {
      this.url = `http://api.openweathermap.org/data/2.5/weather?lat=${para1}&lon=${para2}&APPID=622b65aef014482207a319afb417ffa6&units=metric`;
    } else {
      if (para2) {
        this.url = `http://api.openweathermap.org/data/2.5/forecast?q=${para1},${para2}&APPID=622b65aef014482207a319afb417ffa6&units=metric`;
      } else {
        this.url = `http://api.openweathermap.org/data/2.5/weather?q=${para1}&APPID=622b65aef014482207a319afb417ffa6&units=metric`;
      }
    }
    return this.http.get(this.url);
  }

  updateWeather(weatherData) {
    this.weatherSource.next(weatherData);
  }
  updateForeCast(foreCastData) {
    this.foreCastSource.next(foreCastData);
  }

  getCityData(): Observable<any> {
    this.localUrl = '../../assets/data/city.json';
    return this.http.get(this.localUrl);
  }
}
