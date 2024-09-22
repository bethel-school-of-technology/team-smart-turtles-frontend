import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrl: './material.component.css'
})
export class MaterialComponent {
  
  currentUserId: number = 0;
  isAuthenticated = false;
  private authSubscription!: Subscription;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInt(): void {
    // this.authSubscription = this.userService.getAuthState().subscribe(this.isAuthenticated => {
    //   this.isAuthenticated = this.isAuthenticated;
    //   if (isAuthenticated) {
    //     const currentUser = this.userService.getCurrentUser();
    //     if (currentUser) {
    //       this.currentUserId = currentUser.userId;
    //     }
    //   } else {
    //     this.currentUserId = null;
    //   }
    // });
  }

  logout(): void {
    this.userService.logout();
    this.router.navigateByUrl('/login');
    window.alert('You have successfully logged out');
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
