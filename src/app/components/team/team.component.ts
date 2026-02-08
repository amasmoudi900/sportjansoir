import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-team',
  imports: [],
  templateUrl: './team.component.html',
  styleUrl: './team.component.css'
})
export class TeamComponent {
  @Input() teamObj: any = {};
}
