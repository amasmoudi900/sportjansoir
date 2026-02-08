import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { generateId } from '../../shared/genericFunctions';
import { MatchService } from '../../services/match.service';

@Component({
  selector: 'app-add-match',
  imports: [FormsModule],
  templateUrl: './add-match.component.html',
  styleUrl: './add-match.component.css'
})
export class AddMatchComponent {
  obj: any = {};

  constructor(private mService: MatchService) { }
  addMatch() {
    console.log("Here is match object", this.obj);
    this.mService.addMatch(this.obj).subscribe(
      (expressResponse) => {
        console.log("Here is response from Express after adding match", expressResponse);
      }
    );
  }
}
