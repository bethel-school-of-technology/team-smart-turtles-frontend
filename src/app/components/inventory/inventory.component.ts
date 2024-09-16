import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../services/inventory.service';
import { Inventory } from '../../models/inventory';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css'
})
export class InventoryComponent implements OnInit {
  
  inventory: Inventory[] = [];

  constructor (
    private router: Router, 
    private inventoryService: InventoryService, 
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.loadItems();
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
}
