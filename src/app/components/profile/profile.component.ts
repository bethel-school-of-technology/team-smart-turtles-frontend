import { Component, PLATFORM_ID, Inject, OnInit } from '@angular/core';
import { Inventory } from '../../models/inventory';
import { InventoryService } from '../../services/inventory.service';
import { ActivatedRoute, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs';
import { User } from '../../models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})

export class ProfileComponent implements OnInit {
  
  toolList: Inventory[] = [];
  itemList: Inventory[] = [];
  currentUser: User = new User(); 
  username: string = '';
  email: string = '';
  userId: number = 0;
  isAuthenticated = false;
  private authSubscription!: Subscription;

  constructor(
    private inventoryService: InventoryService, 
    private router: Router, 
    private route: ActivatedRoute, 
    private userService: UserService, 
    @Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.username = localStorage.getItem('username') || '';
      this.email = localStorage.getItem('email') || '';
        this.authSubscription = this.userService.getAuthState().subscribe(isAuthenticated => {
          this.isAuthenticated = isAuthenticated;
        });

        this.userService.getUserProfile().subscribe(
          (user: User) => {
            this.currentUser = user;
            },
            (error: any) => {
              console.error('Error fetching user profile:', error);
              this.router.navigate(['/login']);  
            }
          );

      this.loadInventory();
    }
  }

  loadInventory(): void {
    this.inventoryService.getAllItems().subscribe(
      (items: Inventory[]) => {
        this.toolList = items;
      },
      (error: any) => {
        console.error('Failed to load items:', error);
        if (error.status === 404) {
          console.error('Endpoint not found');
        }
      }
    );
  }

  goToUserProfile(userId: number): void {
    this.router.navigate(['/profile', userId])
  }

  onDelete(itemId: number) {
    this.inventoryService.deleteItem(itemId).subscribe (
      () => {
        this.loadInventory();
      }, error => {
        console.log('Error: ', error);
        this.router.navigateByUrl('/');
      }
    )
  }
}