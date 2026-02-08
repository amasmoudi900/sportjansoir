import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  // Destination address (BE address)
  teamURL: string = "http://localhost:3000/teams";
  constructor(private httpClient: HttpClient) { }

  addTeam(teamObj: any) {
    return this.httpClient.post<{ msg: string }>(this.teamURL, teamObj);
  }

  editTeam(teamObj: any) {
    return this.httpClient.put(this.teamURL, teamObj);
  }

  getAllTeams() {
    return this.httpClient.get<{ teamsTab: any }>(this.teamURL);
  }

  getTeamById(id: any) {
    return this.httpClient.get(this.teamURL + "/" + id)
  }

  deleteTeamById(id: any) {
    return this.httpClient.delete(this.teamURL + "/" + id)
  }
}
