import { Component } from '@angular/core';
import { generateId, getFromLS } from '../../shared/genericFunctions';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { PlayerService } from '../../services/player.service';
import { TeamService } from '../../services/team.service';

@Component({
  selector: 'app-add-player',
  imports: [FormsModule, NgFor],
  templateUrl: './add-player.component.html',
  styleUrl: './add-player.component.css'
})
export class AddPlayerComponent {

  playerObj: any = {};
  teams: any = [];
  constructor(
    private pService: PlayerService,
    private tService: TeamService) { }

  ngOnInit() {
    this.tService.getAllTeams().subscribe(
      (data) => {
        console.log("Here is teams data from Express", data);
        this.teams = data.teamsTab;
      }
    )
  }
  addPlayer() {
    console.log("Here is player object", this.playerObj);
    this.pService.addPlayer(this.playerObj).subscribe(
      (expressResponse) => {
        console.log("Here is response from Express after adding player", expressResponse);
      }
    );
  }
}
