import { Component } from '@angular/core';
import { InventoryService } from '../../services/inventory.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { Inventory } from '../../models/inventory';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
 
  currentUser: User | null = null;
  currentItem: Inventory = new Inventory();
  
  id: number = 0;

  constructor (
    private router: Router, private route: ActivatedRoute, private inventoryService: InventoryService, private userService: UserService) { }
 
  ngOnInIt(): void {
    const routeId = this.route.snapshot.paramMap.get("id") ?? " ";
    this.id = parseInt(routeId);
    this.inventoryService.getItem(this.id).subscribe(foundItem => { 
      console.log(foundItem);
      this.currentItem = foundItem;
    })
  }

  

  
}
