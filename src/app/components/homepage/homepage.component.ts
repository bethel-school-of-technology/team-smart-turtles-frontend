import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  currentUserId: number | null = null;
  isAuthenticated = false;
  private authSubscription!: Subscription;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.authSubscription = this.userService.getAuthState().subscribe((isAuthenticated: boolean) => {
      this.isAuthenticated = isAuthenticated;
    });
  }
}
