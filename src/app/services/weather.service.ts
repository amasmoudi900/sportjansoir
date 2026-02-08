import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  weatherURL: string = "http://localhost:3000/weather";
  constructor(private httpClient: HttpClient) { }

  searchWeather(obj: any) {
    return this.httpClient.post<{ obj: any }>(this.weatherURL, obj);
  }
}
