import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../services/inventory.service';
import { Inventory } from '../../models/inventory';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs';
import { User } from '../../models/user';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css'
})
export class InventoryComponent implements OnInit {
  
  inventory: Inventory[] = [];
  isAuthenticated = false;
  private authSubscription!: Subscription;
  currentUser: User | null = null;
  availability: string = '';

  constructor (
    private router: Router, 
    private inventoryService: InventoryService, 
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.loadItems();
    this.loadCurrentUser();

    this.authSubscription = this.userService.getAuthState().subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    });
  }

  loadItems() {
    this.inventoryService.getAllItems().subscribe(item => {
      console.log(item);
      this.inventory = item;
    })
  }

  onDelete(itemId: number) {
    this.inventoryService.deleteItem(itemId).subscribe (
      () => {
        this.loadItems();
      }, error => {
        console.log('Error: ', error);
        this.router.navigateByUrl('/');
      }
    )
  }

  loadCurrentUser(): void {
    this.userService.getUserProfile().subscribe((user: User) => {
      this.currentUser = user;
    });
  }

  toggleAvailability(itemId: number | undefined): void {
    if (!itemId || isNaN(Number(itemId))) {
      console.warn('Invalid item ID');
      return;
    }
    const itemIndex = this.inventory.findIndex(i => i.itemId === itemId);
    
    if (itemIndex !== -1) {
      this.inventory[itemIndex].available = !this.inventory[itemIndex].available;
      
      console.log(this.currentUser);
      if (this.inventory[itemIndex].available) {
        this.inventory[itemIndex].checkedOutBy = null;
      } else {
        this.inventory[itemIndex].checkedOutBy = this.currentUser?.userId;
      }
      
      this.inventoryService.editItem(itemId, this.inventory[itemIndex])
        .subscribe(
          () => {
            console.log(`Updated availability for item ${itemId}`);
            this.loadItems();
          },
          error => {
            console.error('Failed to update item status:', error);
          }
        );
    } else {
      console.warn(`Item with ID ${itemId} not found`);
    }
  }
}