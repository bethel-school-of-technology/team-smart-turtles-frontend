import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username: string = " ";
  password: string = " ";

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    
  }

  logIn(){ 
    this.userService.logIn(this.username, this.password).subscribe((response:any) => {
      this.router.navigateByUrl('/profile') //Path to profile or material list.
    }, error => {
      console.log('Error: ', error);
      window.alert('Unsuccessful Login');
      this.router.navigateByUrl('/signup')
    });
  }

}
