import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  // Destination address (BE address)
  playerURL: string = "http://localhost:3000/players";
  constructor(private httpClient: HttpClient) { }

  addPlayer(playerObj: any) {
    return this.httpClient.post(this.playerURL, playerObj);
  }

  editPlayer(playerObj: any) {
    return this.httpClient.put(this.playerURL, playerObj);
  }

  getAllPlayers() {
    return this.httpClient.get<{ tab: any }>(this.playerURL);
  }

  getPlayerById(id: any) {
    return this.httpClient.get(this.playerURL + "/" + id)
  }

  deletePlayerById(id: any) {
    return this.httpClient.delete(this.playerURL + "/" + id)
  }
}
