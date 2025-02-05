import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, catchError, of } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (window.localStorage.getItem('user')) {
    console.log('User is logged in');

    return authService.fetchCurrentUser().pipe(
      map((user) => {
        authService.currentUserSignal.set(user);
        return true;
      }),
      catchError(() => {
        router.navigateByUrl('/login');
        return of(false);
      })
    );
  } else {
    router.navigateByUrl('/login');
    return false;
  }
};
