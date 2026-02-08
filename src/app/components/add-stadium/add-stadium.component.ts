import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StadiumService } from '../../services/stadium.service';
import { TeamService } from '../../services/team.service';

@Component({
  selector: 'app-add-stadium',
  imports: [ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './add-stadium.component.html',
  styleUrl: './add-stadium.component.css'
})
export class AddStadiumComponent {

  addStadiumForm!: FormGroup;
  teams: any = [];
  constructor(
    private formBuilder: FormBuilder,
    private stadiumService: StadiumService,
    private teamService: TeamService) { }
  ngOnInit() {
    this.teamService.getAllTeams().subscribe(
      (data) => {
        console.log("Here is data from Express", data);
        this.teams = data.teamsTab;
      }
    )
    this.addStadiumForm = this.formBuilder.group({
      name: ['', Validators.required],
      country: ['', Validators.required],
      capacity: ['', Validators.required],
      teamId: ['']
    })
  }
  addStadium() {
    console.log("Here is stadium object", this.addStadiumForm.value);
    this.stadiumService.addStadium(this.addStadiumForm.value).subscribe(
      (response) => {
        console.log("Here is response after adding stadium", response.msg);
      }
    );
  }
}
