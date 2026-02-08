import { NgClass, NgIf, NgStyle } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatchService } from '../../services/match.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result',
  imports: [NgStyle, NgClass, NgIf],
  templateUrl: './result.component.html',
  styleUrl: './result.component.css'
})
export class ResultComponent {
  // obj : PARAM
  @Input() obj: any = {};

  @Output() matchesToSend: EventEmitter<any> = new EventEmitter();

  path!: string;
  constructor(
    private mService: MatchService,
    private router: Router) { }

  ngOnInit() {
    this.path = this.router.url;
  }
  scoreColor(a: number, b: number) {
    if (a > b) {
      return 'green';
    } else if (a < b) {
      return 'red';
    }
    return 'blue';
  }

  scoreResult(a: number, b: number) {
    if (a > b) {
      return 'Win';
    } else if (a < b) {
      return 'Loss';
    }
    return 'Draw';
  }

  deleteMatch() {
    this.mService.deleteMatchById(this.obj._id).subscribe(
      (response) => {
        console.log("Here is response after delete", response.isDeleted);
        if (response.isDeleted) {
          this.mService.getAllMatches().subscribe(
            (data) => {
              console.log("Here is new matches tab", data.matches);
              this.matchesToSend.emit(data.matches);
            }
          )
        }
      }
    )
  }
}
