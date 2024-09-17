import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

  newUser: User = new User();

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {

  }

  signUp() {
    this.userService.signUp(this.newUser).subscribe(() => {
      window.alert("User Registered Successfully");
      this.router.navigate(['login']);
    }, error => {
      window.alert("User Registration Error");
      console.log('Error: ', error)
    });
  }

}
