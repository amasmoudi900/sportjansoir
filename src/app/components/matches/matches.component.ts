import { Component } from '@angular/core';
import { ResultComponent } from '../result/result.component';
import { NgFor } from '@angular/common';
import { MatchService } from '../../services/match.service';

@Component({
  selector: 'app-matches',
  imports: [ResultComponent, NgFor],
  templateUrl: './matches.component.html',
  styleUrl: './matches.component.css'
})
export class MatchesComponent {

  T: any = [];

  constructor(private matchService: MatchService) { }
  ngOnInit() {
    this.matchService.getAllMatches().subscribe(
      (data) => {
        this.T = data.matches;
      }
    );
  }

  updateMatches(tab: any) {
    this.T = tab;
  }

}
