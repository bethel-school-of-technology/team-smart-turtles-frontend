import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../services/inventory.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Inventory } from '../../models/inventory';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit {

  itemId: number = 0;

  currentItem: Inventory = new Inventory();

  constructor(private inventoryService: InventoryService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const routeId = this.route.snapshot.paramMap.get("itemId") ?? "";
    this.inventoryService.getItem(this.itemId).subscribe(foundItem => {
      console.log(foundItem);
      this.currentItem = foundItem;
    });
  }

  onSubmit() {
    this.inventoryService.editItem(this.itemId, this.currentItem).subscribe(editedItem => {
      window.alert('Item edited successfully');
      this.router.navigateByUrl('/inventory');
    }, error => {
      console.log('Error: ', error);
      window.alert('Only admins can edit items');
      this.router.navigateByUrl('/inventory');
    })
  }
}