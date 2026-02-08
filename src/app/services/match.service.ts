import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  // Backend Address
  // 3000 : Default PORT
  matchURL: string = "http://localhost:3000/matches";
  // httpClient : Livreur
  constructor(private httpClient: HttpClient) { }

  // Req 1 : Get all matches
  // Res : array of matches
  // Component : matches-table, matches component
  getAllMatches() {
    return this.httpClient.get<{ matches: any }>(this.matchURL);
  }


  // Req 2 : Get match by ID (id=7, id=18 ...)
  // Res : One Object / null
  // Component : match-info , edit-match
  getMatchById(id: any) {
    // http://localhost:3000/23
    return this.httpClient.get<{ foundMatch: any, msg: string }>(this.matchURL + "/" + id);
  }

  // Req 3 : Delete match by ID (id=7, id=18 ...)
  // Res : "deleted"/"not deleted" OR true/false OR 0/1
  // Component : matches-table : Delete Button
  deleteMatchById(id: any) {
    return this.httpClient.delete<{ msg: string, isDeleted: boolean }>(this.matchURL + "/" + id);
  }

  // Req 4 : Add Match
  // Res : "added"/"not added" OR true/false OR 0/1
  // Component : Add Match component (obj: objet récupéré du form)
  addMatch(obj: any) {
    return this.httpClient.post<{ msg: string }>(this.matchURL, obj);
  }

  // Req 5 : Edit Match
  // Res : "Edited"/"not edited" OR true/false OR 0/1
  // Component : Edit Match component (obj: objet récupéré du form ayant un ID)
  editMatch(obj: any) {
    return this.httpClient.put<{ msg: string, isUpdated: boolean }>(this.matchURL, obj);
  }

}
