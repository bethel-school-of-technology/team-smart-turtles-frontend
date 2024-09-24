import { Component, PLATFORM_ID, Inject, OnInit } from '@angular/core';
import { Inventory } from '../../models/inventory';
import { InventoryService } from '../../services/inventory.service';
import { ActivatedRoute, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
// import { User } from '../../models/user';
// import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  toolList: Inventory[] = [];
  // userId: number = 0;
  // currentUser: User = new User();
  username: string = '';
  email: string = '';

  constructor(
    private InventoryService: InventoryService, 
    private router: Router, 
    private route: ActivatedRoute, 
    // private userService: UserService,
    @Inject(PLATFORM_ID) private platformId: Object) {}

    ngOnInit(): void {
      if (isPlatformBrowser(this.platformId)) {
        this.username = localStorage.getItem('username') || '';
        this.email = localStorage.getItem('email') || '';  // Assuming email is stored similarly
  
        this.loadInventory();
      }
    }
  
    loadInventory(): void {
      this.InventoryService.getAllItems().subscribe(
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
  }
  
  // this.userService.getUserProfile().subscribe(
  //   (user: User) => {
  //     this.currentUser = user;
  //     this.loadUserItems();
  //     },
  //     (error: any) => {
  //       console.error('Error fetching user profile:', error);
  //       this.router.navigate(['/login']);  
  //     }
  //   );

  // loadUserItems(): void {
  //   if (this.currentUser.userId !== undefined) {
  //     this.InventoryService.getCheckedOutItems(this.currentUser.userId).subscribe(
  //       (items: Inventory[]) => {
  //         this.itemList = items;
  //       },
  //       (error) => {
  //         console.error('Error loading user posts:', error);
  //       }
  //     );
  //   } else {
  //     console.error('User ID is undefined, cannot load user items.');
  //   }
  // }

  // goToUserProfile(userId: number): void {
  //   this.router.navigate(['/profile', userId])
  // }

// }
