import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private jwtHelper: JwtHelperService = new JwtHelperService();
  private authState = new BehaviorSubject<boolean>(this.hasToken());

  baseUrl: string = "http://localhost:3000/api/user";

  constructor(private http: HttpClient) { }

  signUp(newUser: User) {
    return this.http.post(`${this.baseUrl}/register`, newUser);
  }

  logIn(username: string, password: string): Observable<any> {
    let request = { username, password };

    return this.http.post(`${this.baseUrl}/login`, request)
      .pipe(tap((response: any) => {
        localStorage.setItem('signUserToken', response.token);
        this.authState.next(true);
      }));
  }

  logout(): void {
    localStorage.removeItem('signUserToken');
    this.authState.next(false);
  }

  getUserProfile() {
    const token = localStorage.getItem('signUserToken');
    return this.http.get(`${this.baseUrl}/currentUser`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  getUserById(userId: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/profile/${userId}`)
  }

  private hasToken(): boolean {
    const token = localStorage.getItem('signUserToken');
    return !!token && !this.jwtHelper.isTokenExpired(token);
  }

  getAuthState(): Observable<boolean> {
    return this.authState.asObservable();
  }
}
