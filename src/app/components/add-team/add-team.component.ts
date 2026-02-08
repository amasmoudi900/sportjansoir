import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TeamService } from '../../services/team.service';

@Component({
  selector: 'app-add-team',
  imports: [FormsModule],
  templateUrl: './add-team.component.html',
  styleUrl: './add-team.component.css'
})
export class AddTeamComponent {

  teamObj: any = {};


  constructor(private tService: TeamService) { }
  addTeam() {
    console.log("Here is match object", this.teamObj);
    this.tService.addTeam(this.teamObj).subscribe(
      (expressResponse) => {
        console.log("Here is response from Express after adding team", expressResponse);
      }
    );
  }
}
