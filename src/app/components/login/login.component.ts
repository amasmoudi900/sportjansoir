import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  // FORM ID
  loginForm!: FormGroup;
  errorMsg!: string;
  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: [""],
      pwd: [""]
    })
  }

  login() {
    console.log("Here is user credentials", this.loginForm.value);
    this.userService.login(this.loginForm.value).subscribe(
      (response) => {
        // 1 : Check Your Email
        // 2 : Check Your PWD
        // 3 : Welcome + token
        console.log("Here is response after login", response);
        if (response.msg != "3") {
          this.errorMsg = "Please check your email/pwd";
        } else {
          sessionStorage.setItem("token", response.user);
          let decoded: any = jwtDecode(response.user);
          console.log("Here is decoded token", decoded);
          (decoded.role == "admin") ? this.router.navigate(["admin"]) : this.router.navigate([""]);
        }
      }
    );
  }
}
