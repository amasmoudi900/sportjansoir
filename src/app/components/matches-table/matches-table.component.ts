import { NgClass, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { deleteObject, getFromLS } from '../../shared/genericFunctions';
import { FormsModule } from '@angular/forms';
import { TeamFilterPipe } from '../../pipes/team-filter.pipe';
import { MatchService } from '../../services/match.service';

@Component({
  selector: 'app-matches-table',
  imports: [NgFor, NgClass, FormsModule, TeamFilterPipe],
  templateUrl: './matches-table.component.html',
  styleUrl: './matches-table.component.css'
})
export class MatchesTableComponent {

  // DB simulation
  matchesTab: any = [];
  term!: string;

  // router : instance de type Router (type prédéfini)
  constructor(private router: Router, private mService: MatchService) { }

  ngOnInit() {
    this.mService.getAllMatches().subscribe(
      (expressResponse) => {
        console.log("Here is response from Express APP to get All matches", expressResponse);
        this.matchesTab = expressResponse.matches;
      }
    );
  }

  goToInfo(matchId: any) {
    // location.replace("page.html");
    this.router.navigate(["matchInfo/" + matchId]);
  }

  goToEdit(matchId: any) {
    this.router.navigate(["editMatch/" + matchId]);
  }

  scoreMessage(obj: any) {
    if (obj.scoreOne > obj.scoreTwo) {
      return obj.teamOne + " is the winner";
    } else if (obj.scoreOne < obj.scoreTwo) {
      return obj.teamOne + " is the loser";
    }
    return "Match between " + obj.teamOne + " & " + obj.teamTwo + " : Draw"
  }

  deleteMatch(matchId: number) {
    this.mService.deleteMatchById(matchId).subscribe(
      (deleteResponse) => {
        console.log("Here is response after deleting match", deleteResponse);
        if (deleteResponse.isDeleted) {
          this.mService.getAllMatches().subscribe(
            (expressResponse) => {
              this.matchesTab = expressResponse.matches;
            }
          );
        }
      }
    );
  }
}
