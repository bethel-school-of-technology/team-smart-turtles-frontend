import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css'
})
export class InventoryComponent implements OnInit {
  
  constructor (private router: Router) { }

  ngOnInit(): void {
    this.loadTools();
  }

  loadTools() {
    
  }

  onDelete() {
    
  }
}
