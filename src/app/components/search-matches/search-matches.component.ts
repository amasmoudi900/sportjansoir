import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatchService } from '../../services/match.service';
import { ResultComponent } from '../result/result.component';

@Component({
  selector: 'app-search-matches',
  imports: [ReactiveFormsModule, NgIf, NgFor, ResultComponent],
  templateUrl: './search-matches.component.html',
  styleUrl: './search-matches.component.css'
})
export class SearchMatchesComponent {

  searchForm!: FormGroup;
  result: any = [];
  msg!: string;
  constructor(
    private formBuilder: FormBuilder,
    private matchService: MatchService) { }
  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      teamName: ['', Validators.required]
    })
  }
  search() {
    console.log("Here is search form", this.searchForm.value);
    this.matchService.searchMatchesByTeamName(this.searchForm.value.teamName).subscribe(
      (data) => {
        console.log("Here is search result from Express", data);
        if (data.msg) {
          this.result = [];
          this.msg = data.msg;
        } else {
          this.result = data.matches;
          this.msg = "";
        }

      }
    )
  }
}
