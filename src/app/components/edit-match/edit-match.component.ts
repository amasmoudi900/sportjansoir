import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { editObject, getFromLS } from '../../shared/genericFunctions';
import { MatchService } from '../../services/match.service';

@Component({
  selector: 'app-edit-match',
  imports: [FormsModule],
  templateUrl: './edit-match.component.html',
  styleUrl: './edit-match.component.css'
})
export class EditMatchComponent {

  obj: any = {};
  matchesTab: any = [];
  id!: number;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private mService: MatchService) { }
  ngOnInit() {
    // Get Id from PATH
    this.id = this.activatedRoute.snapshot.params['id'];
    this.mService.getMatchById(this.id).subscribe(
      (response) => {
        console.log("Here is response from BE", response);
        this.obj = response.foundMatch;
      }
    );
  }
  editMatch() {
    console.log("Here is obj", this.obj);
    this.mService.editMatch(this.obj).subscribe(
      (response) => {
        console.log("Here is response after editing Match", response);
        if (response.isUpdated) {
          this.router.navigate(['admin']);
        }
      }
    );
  }
}
