import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StadiumService {

  stadiumURL: string = "http://localhost:3000/stadiums";
  constructor(private httpClient: HttpClient) { }

  addStadium(obj: any) {
    return this.httpClient.post<{ msg: string }>(this.stadiumURL, obj);
  }
}
