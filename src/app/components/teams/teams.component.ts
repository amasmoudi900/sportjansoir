import { Component } from '@angular/core';
import { TeamComponent } from '../team/team.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-teams',
  imports: [TeamComponent, NgFor],
  templateUrl: './teams.component.html',
  styleUrl: './teams.component.css'
})
export class TeamsComponent {
  teamsTab: any = [
    { id: 1, name: "FCB", owner: "ALI", foundation: 1899, image: "images/img_1.jpg" },
    { id: 2, name: "RMD", owner: "Salah", foundation: 1902, image: "images/img_2.jpg" },
    { id: 3, name: "EST", owner: "Med", foundation: 1920, image: "images/img_3.jpg" },
  ]
}
