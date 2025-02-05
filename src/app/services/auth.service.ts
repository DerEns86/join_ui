import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { UserLoginInterface } from '../models/UserLogin.interface';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router: Router = inject(Router);

  readonly BASE_URL = environment.API_URL;

  currentUserSignal = signal<UserLoginInterface | null | undefined>(null);
  constructor() {}

  resgister(
    username: string,
    email: string,
    password: string
  ): Observable<string> {
    return this.http.post<string>(`${this.BASE_URL}api/auth/public/signup`, {
      username: username,
      email: email,
      password: password,
      role: ['user'],
    });
  }

  login(username: string, password: string): Observable<UserLoginInterface> {
    return this.http.post<UserLoginInterface>(
      `${this.BASE_URL}api/auth/public/signin`,
      {
        username: username,
        password: password,
      }
    );
  }

  fetchCurrentUser(): Observable<UserLoginInterface> {
    const token = window.localStorage.getItem('token');

    return this.http.get<UserLoginInterface>(`${this.BASE_URL}api/auth/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  logout() {
    window.localStorage.removeItem('user');
    window.localStorage.removeItem('token');
    this.currentUserSignal.set(null);
    this.router.navigateByUrl('/login');
  }
}
