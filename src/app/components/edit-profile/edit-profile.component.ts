import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-edit-profile',
  imports: [FormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent {


  user: any = {};
  constructor(private userService: UserService) { }
  editProfile() {
    // this.user : objet récupéré du form ( new object data)
    this.userService.editProfile(this.user).subscribe();
  }
}
