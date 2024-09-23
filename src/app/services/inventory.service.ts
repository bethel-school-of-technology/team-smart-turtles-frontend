import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Inventory } from '../models/inventory';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  baseURL: string = "http://localhost:3000/api/items";
  tokenKey: string = "signUserToken";

  constructor(private http: HttpClient, private router: Router) { }

  getAllItems(): Observable<Inventory[]> {
    return this.http.get<Inventory[]>(this.baseURL);
  }

  deleteItem(itemId: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete(`${this.baseURL}/admin_delete/${itemId}`, { headers });
  }

  createItem(newItem: Inventory): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(`${this.baseURL}/create`, newItem, { headers });
  }

  getItem(itemId: number): Observable<Inventory> {
    return this.http.get<Inventory>(`${this.baseURL}/${itemId}`);
  }

  editItem(itemId: number, editedItem: Inventory): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put(`${this.baseURL}/update/${editedItem.itemId}`, editedItem, { headers });
  }

  getCheckedOutItems(userId: number): Observable<Inventory[]> {
    return this.http.get<Inventory[]>(`${this.baseURL}/user/${userId}`);
  }

  checkOutItem(itemId: number, userId: number): Observable<any> {
    return this.http.put(`${this.baseURL}/${itemId}/checkout`, { userId });
  }

  returnItem(itemId: number): Observable<any> {
    return this.http.put(`${this.baseURL}/${itemId}/return`, {});
  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem(this.tokenKey);
    if (token) {
      return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    } else {
      this.router.navigate(['login']);
      return new HttpHeaders();
    }
  }
}
