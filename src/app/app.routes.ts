import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AddMatchComponent } from './components/add-match/add-match.component';
import { AddPlayerComponent } from './components/add-player/add-player.component';
import { AddTeamComponent } from './components/add-team/add-team.component';
import { MatchesComponent } from './components/matches/matches.component';
import { AdminComponent } from './components/admin/admin.component';
import { MatchInfoComponent } from './components/match-info/match-info.component';
import { EditMatchComponent } from './components/edit-match/edit-match.component';
import { PlayersComponent } from './components/players/players.component';
import { TeamsComponent } from './components/teams/teams.component';
import { TeamInfoComponent } from './components/team-info/team-info.component';
import { EditTeamComponent } from './components/edit-team/edit-team.component';
import { AddStadiumComponent } from './components/add-stadium/add-stadium.component';
import { WeatherComponent } from './components/weather/weather.component';

export const routes: Routes = [
    // http://localhost:4200 => Home Component
    { path: "", component: HomeComponent },
    // http://localhost:4200/signin => Login Component
    { path: "signin", component: LoginComponent },
    // http://localhost:4200/signup => Signup Component
    { path: "signup", component: SignupComponent },
    { path: "signupAdmin", component: SignupComponent },
    { path: "addMatch", component: AddMatchComponent },
    { path: "addPlayer", component: AddPlayerComponent },
    { path: "addTeam", component: AddTeamComponent },
    { path: "addStadium", component: AddStadiumComponent },
    { path: "matches", component: MatchesComponent },
    { path: "admin", component: AdminComponent },
    // http://localhost:4200/matchInfo => Match Info component
    // :id => Param dans le path
    { path: "matchInfo/:id", component: MatchInfoComponent },
    { path: "editMatch/:id", component: EditMatchComponent },
    { path: "allPlayers", component: PlayersComponent },
    { path: "teams", component: TeamsComponent },
    { path: "teamInfo/:id", component: TeamInfoComponent },
    { path: "editTeam/:id", component: EditTeamComponent },
    { path: "weather", component: WeatherComponent },
];
