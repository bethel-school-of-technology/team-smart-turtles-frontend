import { Component, PLATFORM_ID, Inject, OnInit } from '@angular/core';
import { Inventory } from '../../models/inventory';
import { InventoryService } from '../../services/inventory.service';
import { ActivatedRoute, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  toolList: Inventory[] = [];
  username: string = '';
  email: string = '';
  isAuthenticated = false;
  private authSubscription!: Subscription;

  constructor(
    private InventoryService: InventoryService,
    private router: Router,
    private route: ActivatedRoute,
    private UserService: UserService,
    @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.username = localStorage.getItem('username') || '';
      this.email = localStorage.getItem('email') || '';

      this.authSubscription = this.UserService.getAuthState().subscribe(isAuthenticated => {
        this.isAuthenticated = isAuthenticated;
      });

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

  onDelete(itemId: number) {
    this.InventoryService.deleteItem(itemId).subscribe(
      () => {
        this.loadInventory();
      }, error => {
        console.log('Error: ', error);
        this.router.navigateByUrl('/');
      }
    )
  }
}