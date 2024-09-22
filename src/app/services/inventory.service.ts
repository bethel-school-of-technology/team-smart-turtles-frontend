import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Inventory } from '../models/inventory';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  baseURL: string = "http://localhost:3000/api/items";

  constructor(private http: HttpClient, private router: Router) { }

  getAllItems(): Observable<Inventory[]> {
    return this.http.get<Inventory[]>(this.baseURL);
  }

  deleteItem(itemId: number): Observable<any> {
    return this.http.delete(`${this.baseURL}`)
  }

  createItem(newItem: Inventory): Observable<any> {
    return this.http.post(`${this.baseURL}/create`, newItem);
  }

  getItem(itemId: number): Observable<Inventory> {
    return this.http.get<Inventory>(`${this.baseURL}/${itemId}`);
  }

  editItem(itemId: number, editedItem: Inventory): Observable<any> {
    return this.http.put(`${this.baseURL}/${editedItem.itemId}`, editedItem);
  }

  getCheckedOutItems(userId: number): Observable<Inventory[]> {
    return this.http.get<Inventory[]>(`${this.baseURL}/user/${userId}`);
  }
}
