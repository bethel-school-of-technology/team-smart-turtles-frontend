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
  
  currentUserId: number | null = null;
  isAuthenticated = false;
  private authSubscription!: Subscription;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.authSubscription = this.userService.getAuthState().subscribe((isAuthenticated: boolean) => {
      this.isAuthenticated = isAuthenticated;
      
      if (isAuthenticated) {
        this.userService.getUserProfile().subscribe((currentUser: any) => {
          if (currentUser) {
            this.currentUserId = currentUser.userId;
          }
        });
      } else {
        this.currentUserId = null;
      }
    });
  }

  logout(): void {
    this.userService.logout();
    this.router.navigateByUrl('/homepage');
    window.alert('You have successfully logged out');
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
