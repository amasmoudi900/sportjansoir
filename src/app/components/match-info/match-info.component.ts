import { Component } from '@angular/core';
import { ResultComponent } from '../result/result.component';
import { ActivatedRoute } from '@angular/router';
import { getFromLS } from '../../shared/genericFunctions';
import { MatchService } from '../../services/match.service';

@Component({
  selector: 'app-match-info',
  imports: [ResultComponent],
  templateUrl: './match-info.component.html',
  styleUrl: './match-info.component.css'
})
export class MatchInfoComponent {

  // DB simulation
  matchesTab: any = [];
  foundMatch: any;

  constructor(private activatedRoute: ActivatedRoute, private mService: MatchService) { }

  ngOnInit() {
    // Get Id from PATH
    let matchId = this.activatedRoute.snapshot.params["id"];
    this.mService.getMatchById(matchId).subscribe(
      (response) => {
        console.log("Here is response from Express App", response);
        this.foundMatch = response.foundMatch;
      }
    );
  }
}
