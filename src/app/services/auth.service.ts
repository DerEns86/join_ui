import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { UserLoginInterface } from '../models/UserLogin.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  constructor() {}

  currentUserSignal = signal<UserLoginInterface | null | undefined>(null);

  login(username: string, password: string): Observable<UserLoginInterface> {
    return this.http.post<UserLoginInterface>(
      'http://localhost:8080/api/auth/public/signin',
      {
        username: username,
        password: password,
      }
    );
  }

  setCurrentUser(data: UserLoginInterface) {
    const newUser = {
      username: data.username,
      roles: data.roles,
      jwtToken: data.jwtToken,
    };
    this.currentUserSignal.set(newUser);
  }
}
