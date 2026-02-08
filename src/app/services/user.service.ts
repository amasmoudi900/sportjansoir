import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userURL: string = "http://localhost:3000/users";
  constructor(private httpClient: HttpClient) { }

  // Search User By Email & PWD
  // LoginComponent
  // Response : Object/null OR true/false
  // user = {email: ...., pwd: ....}
  login(user: any) {
    return this.httpClient.post<{ msg: string, user: any }>(this.userURL + "/login", user);
  }

  // Add User
  // SignupComponent
  // Response : true/false OR "Added"/"Not Added" OR 0/1
  // user = {firstName:..., lastName:...., email: ..., pwd:...., role: ....}
  signup(user: any, img: File) {
    let fData = new FormData();
    fData.append("img", img);
    fData.append("firstName", user.firstName);
    fData.append("lastName", user.lastName);
    fData.append("email", user.email);
    fData.append("pwd", user.pwd);
    fData.append("role", user.role);
    return this.httpClient.post<{ msg: string }>(this.userURL + "/signup", fData);
  }

  // Edit User
  // user = {firstName: ..., lastName:..., pwd: ...., id:....}
  editProfile(user: any) {
    return this.httpClient.put(this.userURL, user);
  }
}
