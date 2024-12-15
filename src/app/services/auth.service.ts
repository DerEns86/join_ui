import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { UserLoginInterface } from '../models/UserLogin.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router: Router = inject(Router);

  currentUserSignal = signal<UserLoginInterface | null | undefined>(null);
  constructor() {}

  login(username: string, password: string): Observable<UserLoginInterface> {
    return this.http.post<UserLoginInterface>(
      'http://localhost:8080/api/auth/public/signin',
      {
        username: username,
        password: password,
      }
    );
  }

  fetchCurrentUser(): Observable<UserLoginInterface> {
    const token = window.localStorage.getItem('token');

    return this.http.get<UserLoginInterface>(
      'http://localhost:8080/api/auth/user',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  logout() {
    window.localStorage.removeItem('user');
    window.localStorage.removeItem('token');
    this.currentUserSignal.set(null);
    this.router.navigateByUrl('/login');
  }
}
