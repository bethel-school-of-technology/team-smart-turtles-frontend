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
    this.toolService.getAllTools().subscribe(tools => {
      console.log(tools);
      this.toolList = tools;
    })
  }

  onDelete() {
    this.toolService.deleteTool(toolId.toString()).subscribe (
      () => {
        this.loadTools();
      }, error => {
        console.log('Error: ', error);
        this.router.navigateByUrl('/tools');
      }
    )
  }
}
