import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Inventory } from '../models/inventory';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  baseURL: string = "http://localhost:3000/api";

  constructor(private http: HttpClient, private router: Router) { }

  getAllItems(): Observable<Inventory[]> {
    return this.http.get<Inventory[]>(this.baseURL);
  }

  deleteItem(itemId: number): Observable<any> {
    return this.http.delete(`${this.baseURL}`)
  }

  
}
