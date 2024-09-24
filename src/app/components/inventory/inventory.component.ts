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

  checkOutItem(itemId: number): void {
    if (this.currentUser && this.currentUser.userId) {
      this.inventoryService.checkOutItem(itemId, this.currentUser.userId).subscribe(() => {
        this.loadItems();
      }, error => {
        console.log('Error during checkout:', error);
      });
    }
  }

  returnItem(itemId: number): void {
    this.inventoryService.returnItem(itemId).subscribe(() => {
      this.loadItems();
    }, error => {
      console.log('Error during return:', error);
    });
  }
}
