import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { editObject, getFromLS } from '../../shared/genericFunctions';

@Component({
  selector: 'app-edit-team',
  imports: [FormsModule],
  templateUrl: './edit-team.component.html',
  styleUrl: './edit-team.component.css'
})
export class EditTeamComponent {

  teamObj: any = {};
  teamsTab: any = [];
  teamId!: number;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router) { }
  ngOnInit() {
    this.teamId = this.activatedRoute.snapshot.params['id'];
    this.teamsTab = getFromLS("teams");
    this.teamObj = this.teamsTab.find((elt: any) => elt.id == this.teamId);
  }
  editTeam() {
    editObject("teams", this.teamsTab, this.teamObj);
    this.router.navigate(["admin"])
  }
}
