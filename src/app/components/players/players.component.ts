import { Component } from '@angular/core';
import { PlayerComponent } from '../player/player.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-players',
  imports: [PlayerComponent, NgFor],
  templateUrl: './players.component.html',
  styleUrl: './players.component.css'
})
export class PlayersComponent {

  playersTab: any = [
    { id: 1, name: "Messi", position: "ATK", nbr: 10, age: 40 },
    { id: 2, name: "CR7", position: "GK", nbr: 7, age: 30 },
    { id: 3, name: "Xavi", position: "MID", nbr: 6, age: 40 }
  ]
}
