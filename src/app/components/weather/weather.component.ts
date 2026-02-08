import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { WeatherService } from '../../services/weather.service';
import { response } from 'express';

@Component({
  selector: 'app-weather',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css'
})
export class WeatherComponent {

  searchForm!: FormGroup;
  result: any;
  constructor(
    private formBuilder: FormBuilder,
    private weatherService: WeatherService) { }
  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      city: ['', Validators.required]
    })
  }
  search() {
    console.log("Here is weather object", this.searchForm.value);
    this.weatherService.searchWeather(this.searchForm.value).subscribe(
      (response) => {
        console.log("Here is response from Express (API)", response.obj);
        this.result = response.obj;
      }
    );
  }
}
