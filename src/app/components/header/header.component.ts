import { Component, inject } from '@angular/core';
import { BreakpointService } from '../../services/breakpoint.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { UserLoginInterface } from '../../models/UserLogin.interface';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, NgbDropdownModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  breakpointService: BreakpointService = inject(BreakpointService);
  authService: AuthService = inject(AuthService);

  setUserInitials() {
    if (window.localStorage.getItem('user')) {
      const currentUser: UserLoginInterface = JSON.parse(
        window.localStorage.getItem('user') || '{}'
      );
      return currentUser.username.charAt(0).toUpperCase();
    } else {
      return '';
    }
  }

  onLogout() {
    this.authService.logout();
  }
}
