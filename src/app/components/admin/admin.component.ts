import { Component } from '@angular/core';
import { MatchesTableComponent } from '../matches-table/matches-table.component';
import { TeamsTableComponent } from '../teams-table/teams-table.component';
import { PlayersTableComponent } from '../players-table/players-table.component';
import { DatePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { ReversePipe } from '../../pipes/reverse.pipe';
import { VoyellesPipe } from '../../pipes/voyelles.pipe';

@Component({
  selector: 'app-admin',
  imports: [MatchesTableComponent, TeamsTableComponent, PlayersTableComponent, UpperCasePipe, VoyellesPipe, DatePipe, ReversePipe],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  // attributs
  title: string = 'admin dashboard';
  nbr!: number;
  actualDate: any = new Date();
  calcul(a: number, b: number) {

    if (a > b) {
      return a - b;
    }
    return a + b;
  }

  display(ch: string) {
    alert(ch);
  }
}
