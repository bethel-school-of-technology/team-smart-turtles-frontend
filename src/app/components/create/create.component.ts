import { Component, OnInit } from '@angular/core';
import { Inventory } from '../../models/inventory';
import { InventoryService } from '../../services/inventory.service';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent implements OnInit {

  newItem: Inventory = new Inventory();

  constructor (private inventoryService: InventoryService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    
  }

  createItem() {
    this.inventoryService.createItem(this.newItem).subscribe({
      next: () => {
        window.alert("New item has been added!");
        this.router.navigate(['inventory']);
      },
      error: (error: any) => {
        console.error('Error: ', error);
        if (error.status === 401 || error.status === 403) {
          this.router.navigate(['login']);
        } else {
          window.alert("An error has occured");
        }
      }
    });
  }
}