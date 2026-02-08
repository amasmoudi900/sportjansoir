import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { getFromLS } from '../../shared/genericFunctions';
import { TeamService } from '../../services/team.service';

@Component({
  selector: 'app-teams-table',
  imports: [NgFor],
  templateUrl: './teams-table.component.html',
  styleUrl: './teams-table.component.css'
})
export class TeamsTableComponent {

  teamsTab: any = [];

  constructor(private router: Router, private tService: TeamService) { }


  ngOnInit() {
    this.tService.getAllTeams().subscribe(
      (data) => {
        console.log("Here is teams tab from Express", data.teamsTab);
        this.teamsTab = data.teamsTab;
      }
    )
  }


  goToInfo(id: any) {
    this.router.navigate(["teamInfo/" + id]);
  }

  goToEdit(teamId: number) {
    this.router.navigate(["editTeam/" + teamId]);
  }

  searchPlayerById(pId: any) {
    let players = getFromLS('players');
    return players.find((elt: any) => elt.id == pId);
  }
}
