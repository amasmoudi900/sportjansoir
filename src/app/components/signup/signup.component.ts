import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { generateId } from '../../shared/genericFunctions';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  // Form ID
  signupForm!: FormGroup;
  errorMsg: string = "";
  path!: string;
  file: any;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService) { }

  ngOnInit() {
    this.path = this.router.url;
    console.log("Here is actual path", this.path);
    this.signupForm = this.formBuilder.group({
      firstName: ["", [Validators.required, Validators.minLength(3)]],
      lastName: ["", [Validators.required, Validators.minLength(5)]],
      email: ["", [Validators.required, Validators.email]],
      pwd: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
    });
  }
  signup() {
    let user = this.signupForm.value;
    user.role = (this.path == "/signup") ? "client" : "admin";
    this.userService.signup(user, this.file).subscribe(
      (response) => {
        // 1 : User Added with Success
        // 2 : User Already Exists
        // 3 : User Not saved
        console.log("Here is response after signup", response);
        if (response.msg == "2") {
          this.errorMsg = "User Already Exists";
        } else if (response.msg == "3") {
          this.errorMsg = "User Not saved";
        } else {
          this.router.navigate(["signin"]);
        }
      }
    );
  }

  onImageSelected(evt: Event) {
    const inputElement = evt.target as HTMLInputElement;
    if (inputElement && inputElement.files && inputElement.files.length > 0) {
      this.file = inputElement.files[0];
    }
  }


}
