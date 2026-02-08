import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { getFromLS } from '../../shared/genericFunctions';
import { Router } from '@angular/router';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'app-players-table',
  imports: [NgFor],
  templateUrl: './players-table.component.html',
  styleUrl: './players-table.component.css'
})
export class PlayersTableComponent {

  playersTab: any = []

  constructor(private router: Router, private pService: PlayerService) { }


  ngOnInit() {
    this.pService.getAllPlayers().subscribe(
      (data) => {
        console.log("Here is players table from Express", data.tab);
        this.playersTab = data.tab;
      }
    )
  }

  goToInfo(playerId: any) {
    this.router.navigate(["playerInfo/" + playerId]);
  }

  goToEdit(playerId: any) {
    this.router.navigate(["editPlayer/" + playerId]);
  }

  searchPlayerTeam(tId: any) {
    let teams = getFromLS("teams");
    return teams.find((elt: any) => elt.id == tId);
  }
}
